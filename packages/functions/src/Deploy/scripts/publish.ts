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

export async function publish(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      log('Starting publish process');
      const gatewayUrl = 'https://wapo-testnet.phala.network'
      const command = `npx thirdweb upload dist/index.js -k ${Resource.THIRDWEB_PUB_API_KEY.value}`
      log(`Running command: npx thirdweb upload dist/index.js`);
      log(`This may require you to log into thirdweb and will take some time to publish to IPFS...`);
      
      const childProcess = spawn(command, { shell: true })
      
      childProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
        log(`stdout: ${data}`);
      })

      let stderr = ''
      childProcess.stderr.on('data', (data) => {
        process.stderr.write(data);
        stderr += data;
        log(`stderr: ${data}`);
      })

      childProcess.on('close', (code) => {
        if (code === 0) {
          log('Command completed successfully');
          const regex = /ipfs:\/\/([a-zA-Z0-9]+)/;
          const match = stderr.match(regex);

          if (match) {
            const ipfsCid = match[1];
            log(`Agent Contract deployed at: ${gatewayUrl}/ipfs/${ipfsCid}`);
            log(`\nIf your agent requires secrets, ensure to do the following:\n1) Edit the ./secrets/default.json file or create a new JSON file in the ./secrets folder and add your secrets to it.\n2) Run command: 'npm run set-secrets' or 'npm run set-secrets [path-to-json-file]'`);

            // Update the deployment log
            updateDeploymentLog(ipfsCid);
            resolve(ipfsCid);
          } else {
            const error = 'Error: IPFS CID not found';
            log(error);
            reject(new Error(error));
          }
        } else {
          const error = `Error: Command exited with code ${code}`;
          log(error);
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
