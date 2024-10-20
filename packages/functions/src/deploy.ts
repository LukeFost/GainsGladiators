import { spawn } from 'child_process';
import { writeFileSync, appendFileSync, existsSync } from 'fs';
import { join } from 'path';

function log(message: string) {
  const logMessage = `[${new Date().toISOString()}] ${message}`;
  console.log(logMessage);
  appendFileSync('./deploy.log', `${logMessage}\n`);
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

    // Check if scripts exist
    const publishScriptPath = join(process.cwd(), 'scripts', 'publish.js');
    const setSecretsScriptPath = join(process.cwd(), 'scripts', 'setSecrets.js');
    
    log(`Checking if publish script exists: ${existsSync(publishScriptPath)}`);
    log(`Checking if setSecrets script exists: ${existsSync(setSecretsScriptPath)}`);

    log('Attempting to spawn publish process');
    const publish = spawn('node', [publishScriptPath], { env: process.env, shell: true });
    log('Publish process spawned successfully');
    
    log('Attempting to spawn setSecrets process');
    const setSecrets = spawn('node', [setSecretsScriptPath], { env: process.env, shell: true });
    log('SetSecrets process spawned successfully');

    let publishOutput = '';
    let setSecretsOutput = '';
    let cid = '';

    publish.stdout.on('data', (data) => {
      const output = data.toString();
      publishOutput += output;
      log(`Publish stdout: ${output.trim()}`);
      const cidMatch = output.match(/ipfs:\/\/([a-zA-Z0-9]+)/);
      if (cidMatch) {
        cid = cidMatch[1];
        log(`CID found: ${cid}`);
      }
    });
    publish.stderr.on('data', (data) => {
      const error = data.toString();
      publishOutput += error;
      log(`Publish stderr: ${error.trim()}`);
    });

    setSecrets.stdout.on('data', (data) => {
      const output = data.toString();
      setSecretsOutput += output;
      log(`SetSecrets stdout: ${output.trim()}`);
    });
    setSecrets.stderr.on('data', (data) => {
      const error = data.toString();
      setSecretsOutput += error;
      log(`SetSecrets stderr: ${error.trim()}`);
    });

    log('Waiting for both processes to complete');
    const timeout = 60000; // 60 seconds timeout
    try {
      await Promise.race([
        Promise.all([
          new Promise<void>((resolve, reject) => {
            publish.on('close', (code) => {
              log(`Publish process exited with code ${code}`);
              code === 0 ? resolve() : reject(new Error(`Publish process failed with code ${code}`));
            });
          }),
          new Promise<void>((resolve, reject) => {
            setSecrets.on('close', (code) => {
              log(`SetSecrets process exited with code ${code}`);
              code === 0 ? resolve() : reject(new Error(`SetSecrets process failed with code ${code}`));
            });
          }),
        ]),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Deployment timed out after 60 seconds')), timeout))
      ]);
    } catch (error) {
      log(`Error during deployment: ${error.message}`);
      publish.kill();
      setSecrets.kill();
      throw error;
    }

    log('Deployment process completed successfully');
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        publish: publishOutput, 
        setSecrets: setSecretsOutput,
        cid: cid
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
