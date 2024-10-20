import { spawn } from 'child_process'
import { writeFileSync, existsSync, mkdirSync, appendFileSync } from 'fs';
import * as dotenv from 'dotenv'
import { Resource } from 'sst';

dotenv.config()

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
  return new Promise((resolve, reject) => {
    try {
      const publishLog: string[] = [];
      const logAndStore = (message: string) => {
        log(message);
        publishLog.push(message);
      };

      logAndStore('Starting publish process');
      const gatewayUrl = 'https://wapo-testnet.phala.network'
      const command = `npx thirdweb upload dist/index.js -k ${Resource.THIRDWEB_PUB_API_KEY.value}`
      logAndStore(`Running command: npx thirdweb upload dist/index.js`);
      logAndStore(`This may require you to log into thirdweb and will take some time to publish to IPFS...`);
      
      const childProcess = spawn(command, { shell: true })
      
      childProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
        logAndStore(`stdout: ${data}`);
      })

      let stderr = ''
      childProcess.stderr.on('data', (data) => {
        process.stderr.write(data);
        stderr += data;
        logAndStore(`stderr: ${data}`);
      })

      childProcess.on('close', (code) => {
        if (code === 0) {
          logAndStore('Command completed successfully');
          const regex = /ipfs:\/\/([a-zA-Z0-9]+)/;
          const match = stderr.match(regex);

          if (match) {
            const ipfsCid = match[1];
            logAndStore(`Agent Contract deployed at: ${gatewayUrl}/ipfs/${ipfsCid}`);
            logAndStore(`\nIf your agent requires secrets, ensure to do the following:\n1) Edit the ./secrets/default.json file or create a new JSON file in the ./secrets folder and add your secrets to it.\n2) Run command: 'npm run set-secrets' or 'npm run set-secrets [path-to-json-file]'`);

            // Update the deployment log
            updateDeploymentLog(ipfsCid);
            resolve({ cid: ipfsCid, log: publishLog });
          } else {
            const error = 'Error: IPFS CID not found';
            logAndStore(error);
            reject(new Error(error));
          }
        } else {
          const error = `Error: Command exited with code ${code}`;
          logAndStore(error);
          reject(new Error(error));
        }
      });
    } catch (error) {
      log(`Error: ${error.message}`);
      console.error('Error:', error);
      reject(error);
    }
  });
}

// If this script is run directly (not imported as a module)
if (require.main === module) {
  publish().then((cid) => {
    console.log(`Published successfully. CID: ${cid}`);
  }).catch((error) => {
    console.error('Publication failed:', error);
    process.exit(1);
  });
}
