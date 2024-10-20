import { writeFileSync, existsSync, mkdirSync, appendFileSync, readFileSync, readdirSync } from 'fs';
import { upload } from "thirdweb/storage";
import dotenv from 'dotenv';
import { Resource } from 'sst';
import path from 'path';
import * as fs from 'fs';

dotenv.config();

function log(message: string) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
  appendFileSync('./publish.log', `[${timestamp}] ${message}\n`);
}

function ensureLogsFolderExists() {
  const logsFolder = './logs';
  if (!existsSync(logsFolder)) {
    mkdirSync(logsFolder);
    log('Logs folder created.');
  }
}

function updateDeploymentLog(cid: string) {
  ensureLogsFolderExists();

  const gatewayUrl = 'https://wapo-testnet.phala.network';
  const deploymentInfo = {
    date: new Date().toISOString(),
    cid: cid,
    url: `${gatewayUrl}/ipfs/${cid}`
  };

  writeFileSync('./logs/latestDeployment.json', JSON.stringify(deploymentInfo, null, 2), 'utf-8');
  log('Deployment information updated in ./logs/latestDeployment.json');
}

export async function publish(): Promise<{ cid: string, log: string[] }> {
  const publishLog: string[] = [];
  const logAndStore = (message: string) => {
    log(message);
    publishLog.push(message);
  };

  try {
    logAndStore(`Current working directory: ${process.cwd()}`);
    logAndStore(`__dirname: ${__dirname}`);
    logAndStore(`__filename: ${__filename}`);
    logAndStore('Starting publish process');
    const gatewayUrl = 'https://wapo-testnet.phala.network';

    // Try different possible paths for the built file
    const possiblePaths = [
      'dist/Deploy/src/index.js',
      '../dist/Deploy/src/index.js',
      '../../dist/Deploy/src/index.js',
      '../../../dist/Deploy/src/index.js',
      '../../../../dist/Deploy/src/index.js',
      '../../../../../dist/Deploy/src/index.js'
    ];

    let fileContent: string | null = null;
    let usedPath: string | null = null;

    for (const filePath of possiblePaths) {
      const fullPath = path.resolve(process.cwd(), filePath);
      logAndStore(`Checking for file at: ${fullPath}`);
      try {
        if (existsSync(fullPath)) {
          fileContent = readFileSync(fullPath, 'utf-8');
          usedPath = filePath;
          logAndStore(`File found and read successfully: ${fullPath}`);
          break;
        } else {
          logAndStore(`File does not exist at: ${fullPath}`);
        }
      } catch (error) {
        logAndStore(`Error checking/reading file at ${fullPath}: ${error.message}`);
      }
    }

    logAndStore(`Current directory contents: ${readdirSync(process.cwd()).join(', ')}`);

    if (!fileContent || !usedPath) {
      logAndStore('All possible paths checked, file not found.');
      throw new Error('Built file not found. Make sure to run the build process before deployment.');
    }

    logAndStore(`Using file at: ${usedPath}`);

    logAndStore('Uploading file to IPFS via thirdweb...');
    const uri = await upload({
      client: {
        apiKey: Resource.THIRDWEB_PUB_API_KEY.value,
      },
      files: [
        {
          name: "index.js",
          data: fileContent,
        },
      ],
    });

    const ipfsCid = uri.replace('ipfs://', '');
    logAndStore(`Agent Contract deployed at: ${gatewayUrl}/ipfs/${ipfsCid}`);
    logAndStore(`\nIf your agent requires secrets, ensure to do the following:\n1) Edit the ./secrets/default.json file or create a new JSON file in the ./secrets folder and add your secrets to it.\n2) Run command: 'npm run set-secrets' or 'npm run set-secrets [path-to-json-file]'`);

    // Update the deployment log
    updateDeploymentLog(ipfsCid);
    return { cid: ipfsCid, log: publishLog };
  } catch (error) {
    log(`Error: ${error.message}`);
    console.error('Error:', error);
    throw error;
  }
}

// If this script is run directly (not imported as a module)
if (import.meta.url === `file://${process.argv[1]}`) {
  publish().then(({ cid }) => {
    console.log(`Published successfully. CID: ${cid}`);
  }).catch((error) => {
    console.error('Publication failed:', error);
    process.exit(1);
  });
}
