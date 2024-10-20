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

interface Protocol {
  id: string;
  name: string;
  slug: string;
}

async function getAllProtocols(): Promise<Protocol[]> {
  try {
    const response = await axios.get('https://api.llama.fi/protocols');
    return response.data;
  } catch (error) {
    console.error('Error fetching all protocols:', error);
    return [];
  }
}

function fuzzySearch(query: string, protocols: Protocol[]): Protocol | null {
  const lowerQuery = query.toLowerCase();
  return protocols.find(protocol => 
    protocol.name.toLowerCase().includes(lowerQuery) || 
    protocol.slug.toLowerCase().includes(lowerQuery)
  ) || null;
}

export async function findProtocol(query: string): Promise<Protocol | null> {
  const allProtocols = await getAllProtocols();
  return fuzzySearch(query, allProtocols);
}

export async function getProtocolData(protocol: string): Promise<ProtocolData | null> {
  try {
    const matchedProtocol = await findProtocol(protocol);
    if (!matchedProtocol) {
      console.log(`No matching protocol found for: ${protocol}`);
      return null;
    }

    const response = await axios.get(`https://api.llama.fi/protocol/${matchedProtocol.slug}`);
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
    const matchedProtocol = await findProtocol(protocol);
    if (!matchedProtocol) {
      console.log(`No matching protocol found for: ${protocol}`);
      return null;
    }

    const response = await axios.get(`https://api.llama.fi/summary/fees/${matchedProtocol.slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching fees for protocol ${protocol}:`, error);
    return null;
  }
}
