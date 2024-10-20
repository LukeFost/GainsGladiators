import axios from 'axios';

interface ProtocolData {
  id: string;
  name: string;
  url: string;
  description: string;
  chains: string[];
  gecko_id: string;
  twitter: string;
  github: string[];
  currentChainTvls: Record<string, number>;
}

export async function getProtocolData(protocol: string): Promise<ProtocolData | null> {
  try {
    const response = await axios.get(`https://api.llama.fi/protocol/${protocol}`);
    const data = response.data;

    // Extract only the required fields
    const protocolData: ProtocolData = {
      id: data.id,
      name: data.name,
      url: data.url,
      description: data.description,
      chains: data.chains,
      gecko_id: data.gecko_id,
      twitter: data.twitter,
      github: data.github,
      currentChainTvls: data.currentChainTvls
    };

    return protocolData;
  } catch (error) {
    console.error(`Error fetching data for protocol ${protocol}:`, error);
    return null;
  }
}

export async function getProtocolFees(protocol: string): Promise<any> {
  try {
    const response = await axios.get(`https://api.llama.fi/summary/fees/${protocol}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching fees for protocol ${protocol}:`, error);
    return null;
  }
}
