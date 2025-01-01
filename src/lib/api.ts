import { ChessUserResponse } from '@/types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_KEY = import.meta.env.VITE_API_KEY || '3hbKuNdWmw5qYX6rE3NxPzPC6SithGMJTEnXXFB3PQ';

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function verifyChessUser(username: string): Promise<ChessUserResponse> {
  console.log('API Call to:', `${API_URL}/api/user/verify/${encodeURIComponent(username)}`);
  
  try {
    const response = await fetch(`${API_URL}/api/user/verify/${encodeURIComponent(username)}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new APIError(
        response.statusText || 'API request failed',
        response.status,
        response.status === 401 ? 'UNAUTHORIZED' : 'API_ERROR'
      );
    }

    const data = await response.json();
    console.log('API Response data:', data);
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
} 