import { writeFileSync, existsSync, mkdirSync, appendFileSync, readFileSync } from 'fs';
import { upload } from "thirdweb/storage";
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
function log(message) {
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
function updateDeploymentLog(cid) {
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
async function publish() {
    try {
        const gatewayUrl = 'https://wapo-testnet.phala.network';
        // Use __dirname to build the absolute path
        const filePath = path.join(__dirname, '../../dist/index.js');
        log(`Reading file: ${filePath}`);
        if (!existsSync(filePath)) {
            const errorMsg = `File not found: ${filePath}`;
            log(errorMsg);
            throw new Error(errorMsg);
        }
        // Read the file content
        const fileContent = readFileSync(filePath, 'utf-8');
        // Initialize Thirdweb client
        const apiKey = process.env.THIRDWEB_API_KEY;
        if (!apiKey) {
            throw new Error('THIRDWEB_API_KEY environment variable is not set.');
        }
        const client = {
            apiKey: apiKey,
        };
        log(`Uploading file to IPFS via Thirdweb...`);
        // Upload the file using Thirdweb SDK
        const uri = await upload({
            client,
            files: [
                {
                    name: 'index.js',
                    data: fileContent,
                },
            ],
        });
        // Extract CID from URI
        const ipfsCid = uri.replace('ipfs://', '');
        log(`\nAgent Contract deployed at: ${gatewayUrl}/ipfs/${ipfsCid}`);
        log(`\nIf your agent requires secrets, ensure to do the following:
1) Edit the ./secrets/default.json file or create a new JSON file in the ./secrets folder and add your secrets to it.
2) Run command: 'npm run set-secrets' or 'npm run set-secrets [path-to-json-file]'`);
        // Update the deployment log
        updateDeploymentLog(ipfsCid);
        // Return the CID for further processing
        return { cid: ipfsCid };
    }
    catch (error) {
        log(`Error: ${error.message}`);
        console.error('Error:', error);
        process.exit(1);
    }
}
import { fileURLToPath } from 'url';
// Export the publish function for use in deploy.ts
export { publish };
// If this script is run directly, execute publish()
const isRunDirectly = process.argv[1] === fileURLToPath(import.meta.url);
if (isRunDirectly) {
    publish();
}
