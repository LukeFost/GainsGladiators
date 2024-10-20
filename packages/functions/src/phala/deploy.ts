import { Resource } from "sst";
import { upload } from "thirdweb/storage";

export async function handler(event: any) {
  try {
    const body = JSON.parse(event.body || "{}");
    const { agentCode, secrets } = body;

    // Publish agent
    const uri = await upload({
      client: {
        clientId: Resource.THIRDWEB_PUB_API_KEY.value,
      },
      files: [
        {
          name: "index.js",
          data: agentCode,
        },
      ],
    });

    const cid = uri.replace("ipfs://", "");

    // Set secrets
    const gatewayUrl = 'https://wapo-testnet.phala.network';
    const secretsResponse = await fetch(`${gatewayUrl}/vaults`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: cid,
        data: secrets,
      }),
    });

    const secretsData = await secretsResponse.json();
    const { token, key } = secretsData;

    return {
      statusCode: 200,
      body: JSON.stringify({
        cid,
        url: `${gatewayUrl}/ipfs/${cid}?key=${key}`,
        token,
        key,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to publish agent and set secrets' }),
    };
  }
});