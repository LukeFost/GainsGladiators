import axios from 'axios';
async function getAllProtocols() {
    try {
        const response = await axios.get('https://api.llama.fi/protocols');
        return response.data.map((protocol) => protocol.name);
    }
    catch (error) {
        console.error('Error fetching all protocols:', error);
        return [];
    }
}
function fuzzySearch(query, protocols) {
    const lowerQuery = query.toLowerCase();
    return protocols.find(protocol => protocol.toLowerCase().includes(lowerQuery)) || null;
}
export async function findProtocol(query) {
    const allProtocols = await getAllProtocols();
    return fuzzySearch(query, allProtocols);
}
export async function getProtocolData(protocol) {
    try {
        const response = await axios.get(`https://api.llama.fi/protocol/${protocol}`);
        const data = response.data;
        // Extract only the required fields
        const protocolData = {
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
    }
    catch (error) {
        console.error(`Error fetching data for protocol ${protocol}:`, error);
        return null;
    }
}
export async function getProtocolFees(protocol) {
    try {
        const response = await axios.get(`https://api.llama.fi/summary/fees/${protocol}`);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching fees for protocol ${protocol}:`, error);
        return null;
    }
}
