// This is a deployer for the phalanetwork. 
// When called it deploys the index.ts to the thirdweb deployer. 
// What variables does the user send to create their nework
// What and How do I implement this?
import { spawn } from 'child_process';

export async function handler(event: any) {
  try {
    const body = JSON.parse(event.body || '{}');
    const { secret, ...params } = body;

    // Set the secret as an environment variable
    process.env.SECRET_KEY = secret;

    // Spawn child processes for publish and setSecrets scripts
    const publish = spawn('node', ['scripts/publish.js'], { env: process.env });
    const setSecrets = spawn('node', ['scripts/setSecrets.js'], { env: process.env });

    let publishOutput = '';
    let setSecretsOutput = '';

    publish.stdout.on('data', (data) => (publishOutput += data));
    publish.stderr.on('data', (data) => console.error(data.toString()));

    setSecrets.stdout.on('data', (data) => (setSecretsOutput += data));
    setSecrets.stderr.on('data', (data) => console.error(data.toString()));

    // Wait for both processes to complete
    await Promise.all([
      new Promise<void>((resolve) => publish.on('close', resolve)),
      new Promise<void>((resolve) => setSecrets.on('close', resolve)),
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ publish: publishOutput, setSecrets: setSecretsOutput }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};