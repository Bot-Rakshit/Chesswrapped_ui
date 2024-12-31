import { ReactNode } from 'react';

export interface PlayerData {
  username: string;
  name: string | null;
  countryCode: string;
  ratings: {
    rapid: number | null;
    blitz: number | null;
    bullet: number | null;
  };
  platformId: 'chess.com' | 'lichess';
  avatar?: string;
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