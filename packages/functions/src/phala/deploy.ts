// import 'dotenv/config'
import { Sandbox } from '@e2b/code-interpreter'

async function deployPhalaNetwork(secrets: Record<string, string>) {
  const sandbox = await Sandbox.create({ timeoutMs: 600000 }) // 10 minutes timeout

  try {
    // Step 1: Clone the Phala Network repository
    await clonePhalaNetwork(sandbox)

    // Step 2: Install dependencies
    await runCommand(sandbox, 'cd ai-agent-contract-viem && npm install')

    // Step 3: Build the project
    await runCommand(sandbox, 'cd ai-agent-contract-viem && npm run build')

    // Step 4: Set secrets
    await setSecrets(sandbox, secrets)

    // Step 5: Publish the agent
    await runCommand(sandbox, 'cd ai-agent-contract-viem && npm run publish-agent')

    // Step 6: Retrieve and return deployment info
    return await getDeploymentInfo(sandbox)
  } finally {
    await sandbox.kill()
  }
}

async function clonePhalaNetwork(sandbox: Sandbox) {
  const repoUrl = 'https://github.com/Phala-Network/ai-agent-contract-viem.git'
  await runCommand(sandbox, `git clone ${repoUrl}`)
}

async function runCommand(sandbox: Sandbox, command: string) {
  console.log(`Running command: ${command}`)
  const result = await sandbox.commands.run(command)
  console.log(result.stdout)
  if (result.exitCode !== 0) {
    throw new Error(`Command failed: ${command}\n${result.stderr}`)
  }
}

async function setSecrets(sandbox: Sandbox, secrets: Record<string, string>) {
  const secretsContent = JSON.stringify(secrets)
  await sandbox.files.write('/home/user/ai-agent-contract-viem/secrets/default.json', secretsContent)
  await runCommand(sandbox, 'cd ai-agent-contract-viem && npm run set-secrets secrets/default.json')
}

async function getDeploymentInfo(sandbox: Sandbox) {
  const logPath = '/home/user/ai-agent-contract-viem/logs/latestDeployment.json'
  const logContent = await sandbox.files.read(logPath)
  return JSON.parse(logContent)
}

export async function deploy(event: any, context: any) {
  try {
    // Extract secrets from the event or environment variables
    const secrets = {
      secretSalt: event.secretSalt || process.env.SECRET_SALT || "SALTY_BAE",
      thirdwebApiKey: event.thirdwebApiKey || process.env.THIRDWEB_API_KEY,
      // Add any other secrets you want to pass
    }

    const deploymentInfo = await deployPhalaNetwork(secrets)
    console.log('Deployment successful:', deploymentInfo)
    return {
      statusCode: 200,
      body: JSON.stringify(deploymentInfo)
    }
  } catch (error) {
    console.error('Deployment failed:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
