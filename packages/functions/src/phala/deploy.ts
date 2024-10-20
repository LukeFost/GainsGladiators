import { execSync } from 'child_process';
import { writeFileSync, existsSync, rmSync, createReadStream } from 'fs';
import { createUnzip } from 'zlib';
import { Extract } from 'unzipper';

export async function handler(event: any, context: any) {
  const tempDir = '/tmp/phala-agent';
  try {
    // Remove the directory if it already exists
    if (existsSync(tempDir)) {
      rmSync(tempDir, { recursive: true, force: true });
    }
    // Clone the repository
    execSync(`git clone https://github.com/LukeFost/the_real_new_phala_agent.git ${tempDir}`);

    // Change to the project directory
    process.chdir(tempDir);

    // Unzip node_modules.zip
    await new Promise((resolve, reject) => {
      createReadStream('node_modules.zip')
        .pipe(createUnzip())
        .pipe(Extract({ path: '.' }))
        .on('close', resolve)
        .on('error', reject);
    });

    // Build the project (assuming the build script is in package.json)
    execSync('npm run build');

    // Set secrets
    const secrets = {
      secretSalt: event.secretSalt || process.env.SECRET_SALT || "SALTY_BAE",
      thirdwebApiKey: event.thirdwebApiKey || process.env.THIRDWEB_API_KEY,
    };
    writeFileSync('secrets/default.json', JSON.stringify(secrets));

    // Assuming the set-secrets script is available and works with bun
    execSync('npm run set-secrets secrets/default.json');

    // Publish the agent
    execSync('npm run publish-agent');

    // Read deployment info
    const deploymentInfo = execSync('cat logs/latestDeployment.json').toString();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Deployment successful", info: JSON.parse(deploymentInfo) })
    };
  } catch (error) {
    console.error('Deployment failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}