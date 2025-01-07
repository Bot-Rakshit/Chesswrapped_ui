import { ReactNode } from 'react';

export interface PlayerData {
  username: string;
  name: string | null;
  avatar?: string;
  countryCode: string | null;
  ratings: {
    rapid: number | null;
    blitz: number | null;
    bullet: number | null;
  };
  data?: {
    ratings: {
      ratingProgress: {
        rapid: Array<{
          date: string;
          rating: number;
        }>;
        blitz: Array<{
          date: string;
          rating: number;
        }>;
        bullet: Array<{
          date: string;
          rating: number;
        }>;
      };
    };
  };
}

export interface VerificationState {
  isLoading: boolean;
  playerData: PlayerData | null;
}

export interface NavigationItem {
  title: string;
  icon: ReactNode;
  href: string;
} 