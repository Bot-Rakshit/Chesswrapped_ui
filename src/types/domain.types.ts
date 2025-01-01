// Player Types
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

// State Types
export interface VerificationState {
  isLoading: boolean;
  playerData: PlayerData | null;
}

// UI Types
export interface NavigationItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

// Component Props Types
export interface CountryFlagProps {
  countryCode: string;
  variant?: 'emoji' | 'cdn' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export interface PlayerCardProps {
  player: PlayerData | null;
  platformLogo: string;
  onConfirm: () => void;
  onReject: () => void;
  searchedUsername?: string;
} 