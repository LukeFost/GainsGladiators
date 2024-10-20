import axios from 'axios';
import { Resource } from 'sst';

export async function exaSearch(query: string, params: any): Promise<string> {
    try {
        const response = await axios.post('https://api.exa.ai/search', {
            query,
            ...params
        }, {
            headers: {
                'x-api-key': Resource.EXAAI_API_KEY.value
            }
        });
        return JSON.stringify(response.data);
    } catch (error) {
        console.error('Error in exaSearch:', error);
        throw new Error('Failed to perform exaSearch');
    }
}
