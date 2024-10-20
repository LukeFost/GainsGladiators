import { readFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

function log(message: string) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
  appendFileSync('./setSecrets.log', `[${timestamp}] ${message}\n`);
}

function ensureLogsFolderExists() {
  const logsFolder = './logs';
  if (!existsSync(logsFolder)) {
    mkdirSync(logsFolder);
    log('Logs folder created.');
  }
}

// Function to read and parse JSON file
function readJsonFile(filePath: string): any {
  try {
    log(`Reading JSON file: ${filePath}`);
    const fileContents = readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContents);
  } catch (error) {
    log(`Error reading or parsing JSON file: ${error.message}`);
    throw error;
  }
}

// Function to log the details to a file
function logToFile(cid: string, token: string, key: string, url: string) {
  ensureLogsFolderExists();
  const logEntry = `${new Date().toISOString()}, CID: [${cid}], Token: [${token}], Key: [${key}], URL: [${url}]\n`;
  appendFileSync('./logs/secrets.log', logEntry, 'utf-8');
  log('Log entry added to secrets.log');
}

export async function setSecrets(jsonFilePath: string = './secrets/default.json'): Promise<{ url: string, log: string[] }> {
  const secretsLog: string[] = [];
  const logAndStore = (message: string) => {
    log(message);
    secretsLog.push(message);
  };

  try {
    logAndStore(`Using secrets file: ${jsonFilePath}`);

    // Read and parse the JSON file for secrets and latest deployment info
    const secrets = readJsonFile(jsonFilePath);
    const latestDeployment = readJsonFile('./logs/latestDeployment.json');

    logAndStore('Starting setSecrets process');
    const gatewayUrl = 'https://wapo-testnet.phala.network';
    const cid = latestDeployment.cid;
    
    logAndStore(`Storing secrets for CID: ${cid}`);
    const response = await axios.post(`${gatewayUrl}/vaults`, {
      cid: cid,
      data: secrets
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const { token, key } = response.data;
      const url = `${gatewayUrl}/ipfs/${cid}?key=${key}`;
      logAndStore(`Secrets set successfully. Agent URL: ${url}`);
      console.log(`\n\nSecrets set successfully. Go to the URL below to interact with your agent:`);
      console.log(`${url}`);
      // Log the details to a file
      logToFile(cid, token, key, url);
      return { url, log: secretsLog };
    } else {
      const error = 'Error: Secrets failed to set. Unexpected response from server.';
      logAndStore(error);
      console.log('Secrets failed to set');
      throw new Error(error);
    }
  } catch (error) {
    log(`Error: ${error.message}`);
    console.error('Error:', error);
    throw error;
  }
}

// If this script is run directly (not imported as a module)
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const jsonFilePath = args.length === 1 ? args[0] : './secrets/default.json';

  setSecrets(jsonFilePath).then(({ url }) => {
    console.log(`Secrets set successfully. Agent URL: ${url}`);
  }).catch((error) => {
    console.error('Setting secrets failed:', error);
    process.exit(1);
  });
}
