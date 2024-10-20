import axios from 'axios';

export async function exaSearch(query: string, params: any): Promise<string> {
    try {
        const response = await axios.post('https://api.exa.ai/search', {
            query,
            ...params
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.EXAAI_API_KEY}`
            }
        });
        return JSON.stringify(response.data);
    } catch (error) {
        console.error('Error in exaSearch:', error);
        throw new Error('Failed to perform exaSearch');
    }
}
