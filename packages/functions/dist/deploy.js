import { promises as fs } from 'fs';
import path from 'path';
import { publish } from './Deploy/scripts/publish';
import { setSecrets } from './Deploy/scripts/setSecrets';
async function log(message) {
    const logMessage = `[${new Date().toISOString()}] ${message}`;
    console.log(logMessage);
    await fs.appendFile(path.join(process.cwd(), 'deploy.log'), `${logMessage}\n`);
}
export async function handler(event) {
    await log('Deployment process started');
    try {
        // Log environment information
        await log(`Current working directory: ${process.cwd()}`);
        await log(`Node version: ${process.version}`);
        await log(`PATH: ${process.env.PATH}`);
        const body = JSON.parse(event.body || '{}');
        const { secret, ...params } = body;
        if (!secret) {
            await log('Error: Secret is missing in the request body');
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Secret is required' }),
            };
        }
        await log('Setting secret as environment variable');
        process.env.SECRET_KEY = secret;
        await log('Starting publish process');
        const publishResult = await publish();
        await log(`Publish completed. CID: ${publishResult.cid}`);
        for (const logEntry of publishResult.log) {
            await log(logEntry);
        }
        await log('Starting setSecrets process');
        const secretsResult = await setSecrets();
        await log(`SetSecrets completed. Agent URL: ${secretsResult.url}`);
        for (const logEntry of secretsResult.log) {
            await log(logEntry);
        }
        await log('Deployment process completed successfully');
        return {
            statusCode: 200,
            body: JSON.stringify({
                cid: publishResult.cid,
                agentUrl: secretsResult.url,
                publishLog: publishResult.log,
                secretsLog: secretsResult.log
            }),
        };
    }
    catch (error) {
        await log(`Error: ${error.message}`);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error', details: error.message }),
        };
    }
}
