import { spawn } from 'child_process'
import { readFileSync, appendFileSync, existsSync, mkdirSync } from 'fs'
import 'dotenv/config'

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
    process.exit(1)
  }
}

// Function to log the details to a file
function logToFile(cid: string, token: string, key: string, url: string) {
  ensureLogsFolderExists();
  const logEntry = `${new Date().toISOString()}, CID: [${cid}], Token: [${token}], Key: [${key}], URL: [${url}]\n`;
  appendFileSync('./logs/secrets.log', logEntry, 'utf-8');
  log('Log entry added to secrets.log');
}

let jsonFilePath = './secrets/default.json';

// Get the command-line arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  log('Using default secrets...')
} else {
  jsonFilePath = args[0];
  log(`Using custom secrets file: ${jsonFilePath}`);
}

// Read and parse the JSON file for secrets and latest deployment info
const secrets = readJsonFile(jsonFilePath);
const latestDeployment = readJsonFile('./logs/latestDeployment.json');

try {
  log('Starting setSecrets process');
  const gatewayUrl = 'https://wapo-testnet.phala.network';
  const cid = latestDeployment.cid;
  const command = `curl ${gatewayUrl}/vaults -H 'Content-Type: application/json' -d '{"cid": "${cid}", "data": ${JSON.stringify(secrets)}}'`;
  log(`Storing secrets for CID: ${cid}`);
  const childProcess = spawn(command, { shell: true })
  
  let stdout = ''
  childProcess.stdout.on('data', (data) => {
    process.stdout.write(data)
    stdout += data
    log(`stdout: ${data}`);
  })

  let stderr = ''
  childProcess.stderr.on('data', (data) => {
    process.stderr.write(data)
    stderr += data
    log(`stderr: ${data}`);
  })

  childProcess.on('close', (code) => {
    if (code === 0) {
      log('Command completed successfully');
      const regex = /"token":\s*"([a-zA-Z0-9]+)","key":\s*"([a-zA-Z0-9]+)"/;
      const match = stdout.match(regex);

      if (match) {
        const token = match[1];
        const key = match[2];
        const url = `${gatewayUrl}/ipfs/${cid}?key=${key}`;
        log(`Secrets set successfully. Agent URL: ${url}`);
        console.log(`\n\nSecrets set successfully. Go to the URL below to interact with your agent:`);
        console.log(`${url}`);
        // Log the details to a file
        logToFile(cid, token, key, url);
      } else {
        log('Error: Secrets failed to set. Token and key not found in response.');
        console.log('Secrets failed to set');
      }
    } else {
      log(`Error: Command exited with code ${code}`);
      console.log(`Command exited with code ${code}`)
    }
  });

} catch (error) {
  log(`Error: ${error.message}`);
  console.error('Error:', error)
}
