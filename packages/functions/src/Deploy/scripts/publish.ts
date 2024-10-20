import { writeFileSync, existsSync, mkdirSync, appendFileSync, readFileSync } from 'fs';
import { upload } from "thirdweb/storage";
import dotenv from 'dotenv';
import { Resource } from 'sst';

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
    logAndStore('Starting publish process');
    const gatewayUrl = 'https://wapo-testnet.phala.network';

    // Read the content of dist/index.js
    const fileContent = readFileSync('dist/index.js', 'utf-8');

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
