import { axiosInstance } from '@/lib/axios';
import type { ChessUserResponse } from '@/types/api.types';
import type { PlayerData } from '@/types/domain.types';

export class ChessService {
  static async verifyUser(username: string): Promise<PlayerData> {
    // Normalize username: remove spaces and convert to lowercase
    const normalizedUsername = username.replace(/\s+/g, '').toLowerCase();
    
    const response = await axiosInstance.get<never, ChessUserResponse>(
      `/api/user/verify/${encodeURIComponent(normalizedUsername)}`
    );

    // Transform API response to domain model
    if (response.success && response.data) {
      const userData = response.data;
      return {
        username: userData.username,
        name: userData.name,
        countryCode: userData.country?.code || '',
        ratings: userData.ratings,
        platformId: 'chess.com',
        avatar: userData.avatar || undefined
      };
    }

    throw new Error(response.error || 'Failed to verify user');
  }

  static async getUserCount(): Promise<number> {
    const response = await axiosInstance.get<never, { success: boolean; data: { count: number } }>('/api/user/count');
    if (response.success && response.data) {
      return response.data.count;
    }
    return 730; // Fallback counts
  }

  // Add more chess-related API methods here
}

