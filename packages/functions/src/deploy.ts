import * as fs from 'fs';
import { publish } from './Deploy/scripts/publish';
import { setSecrets } from './Deploy/scripts/setSecrets';

function log(message: string) {
  const logMessage = `[${new Date().toISOString()}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync('./deploy.log', `${logMessage}\n`);
}

export async function handler(event: any) {
  log('Deployment process started');
  try {
    // Log environment information
    log(`Current working directory: ${process.cwd()}`);
    log(`Node version: ${process.version}`);
    log(`PATH: ${process.env.PATH}`);

    const body = JSON.parse(event.body || '{}');
    const { secret, ...params } = body;

    if (!secret) {
      log('Error: Secret is missing in the request body');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Secret is required' }),
      };
    }

    log('Setting secret as environment variable');
    process.env.SECRET_KEY = secret;

    log('Starting publish process');
    const publishResult = await publish();
    log(`Publish completed. CID: ${publishResult.cid}`);
    publishResult.log.forEach(logEntry => log(logEntry));

    log('Starting setSecrets process');
    const secretsResult = await setSecrets();
    log(`SetSecrets completed. Agent URL: ${secretsResult.url}`);
    secretsResult.log.forEach(logEntry => log(logEntry));

    log('Deployment process completed successfully');
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        cid: publishResult.cid,
        agentUrl: secretsResult.url,
        publishLog: publishResult.log,
        secretsLog: secretsResult.log
      }),
    };
  } catch (error) {
    log(`Error: ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
}
