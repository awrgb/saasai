import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const replicateApiKey = process.env.REPLICATE_API_KEY;
    if (!replicateApiKey) {
      throw new Error('Replicate API key is not provided.');
    }

    const replicateEndpoint = "https://api.replicate.com/v1/predictions";

    const { data } = await axios.post(replicateEndpoint, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${replicateApiKey}`
      }
    });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
