import axios from 'axios';
export async function getTrendingPoolsForNetwork(network) {
    try {
        const response = await axios.get(`https://api.geckoterminal.com/api/v2/networks/${network}/trending_pools`);
        const trendingPools = response.data.data.map((pool) => pool.attributes.name);
        return trendingPools.slice(0, 5); // Return top 5 trending pools for the specific network
    }
    catch (error) {
        console.error(`Error in getTrendingPoolsForNetwork for ${network}:`, error);
        throw new Error(`Failed to fetch trending pools for network ${network}`);
    }
}
