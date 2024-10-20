import axios from 'axios';
export async function getTrendingPools() {
    try {
        const response = await axios.get('https://api.geckoterminal.com/api/v2/networks/trending_pools');
        const trendingPools = response.data.data.map((pool) => pool.attributes.name);
        return trendingPools.slice(0, 5); // Return top 5 trending pools
    }
    catch (error) {
        console.error('Error in getTrendingPools:', error);
        throw new Error('Failed to fetch trending pools');
    }
}
