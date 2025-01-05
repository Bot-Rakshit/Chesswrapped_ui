// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Chess.com API Types
export interface ChessComPlayer {
  username: string;
  name?: string;
  avatar?: string;
  country?: string;
}

export interface ChessComStats {
  chess_rapid?: {
    last: {
      rating: number;
    };
  };
  chess_blitz?: {
    last: {
      rating: number;
    };
  };
  chess_bullet?: {
    last: {
      rating: number;
    };
  };
}

export interface UserProfile {
  username: string;
  name: string | null;
  avatar: string | null;
  country: {
    name: string | null;
    code: string | null;
  };
  ratings: {
    rapid: number | null;
    blitz: number | null;
    bullet: number | null;
  };
}

export interface CountryInfo {
  name: string;
}

export interface PlayerStats {
  rating: number;
  date: number;
}

export interface GameArchive {
  games: Array<{
    url: string;
    pgn: string;
    time_control: string;
    end_time: number;
    rated: boolean;
    accuracies?: {
      white: number;
      black: number;
    };
  }>;
}

export interface FormatStats {
  gamesPlayed: number;
  winRate: number;
  ratingProgress: Array<{ date: string; rating: number }>;
  results: {
    wins: { total: number; byResignation: number; onTime: number; byCheckmate: number };
    draws: { total: number; byAgreement: number; byRepetition: number; byStalemate: number; byInsufficientMaterial: number };
    losses: { total: number; byResignation: number; onTime: number; byCheckmate: number };
  };
  averageGameDuration: number;
  bestWin: {
    opponent: string;
    opponentRating: number;
    date: string;
    url: string;
  } | null;
  worstLoss: {
    opponent: string;
    opponentRating: number;
    date: string;
    url: string;
  } | null;
}

export interface MiscStats {
  ohNoMyQueen: {
    count: number;
    games: Array<{
      url: string;
      date: string;
      opponent: string;
    }>;
  };
  queenPromotions: {
    count: number;
    games: Array<{
      url: string;
      date: string;
      opponent: string;
    }>;
  };
  flaggedOpponents: {
    count: number;
    games: Array<{
      url: string;
      date: string;
      opponent: string;
      opponentRating: number;
    }>;
  };
  smotheredMates: {
    count: number;
    games: Array<{
      url: string;
      date: string;
      opponent: string;
    }>;
  };
  dirtyFlags: {
    count: number;
    games: Array<{
      url: string;
      date: string;
      opponent: string;
      type: 'mateInOne' | 'insufficientMaterial' | 'clutchPawn';
    }>;
  };
}

export interface ChessWrapped {
  intro: {
    totalGames: number;
    formatBreakdown: {
      rapid: { count: number; percentage: number };
      blitz: { count: number; percentage: number };
      bullet: { count: number; percentage: number };
    };
    mostGamesInDay: {
      date: string;
      count: number;
    };
    activeMonths: {
      most: Array<{
        month: string;
        gamesPlayed: number;
      }>;
      least: Array<{
        month: string;
        gamesPlayed: number;
      }>;
    };
    favoriteFormat: {
      format: 'rapid' | 'blitz' | 'bullet';
      gamesPlayed: number;
      winRate: number;
    };
    longestStreak: {
      startDate: string;
      endDate: string;
      days: number;
      gamesPlayed: number;
    };
    longestBreak: {
      startDate: string;
      endDate: string;
      days: number;
    };
  };
  monthlyGames: {
    mostActive: {
      month: string;
      games: number;
    };
    leastActive: {
      month: string;
      games: number;
    };
    distribution: Array<{
      month: string;
      rapid: number;
      blitz: number;
      bullet: number;
      total: number;
    }>;
  };
  ratings: {
    currentRatings: {
      rapid: number | null;
      blitz: number | null;
      bullet: number | null;
    };
    ratingProgress: {
      rapid: Array<{ date: string; rating: number }>;
      blitz: Array<{ date: string; rating: number }>;
      bullet: Array<{ date: string; rating: number }>;
    };
    bestRatingGains: {
      rapid: { date: string; gain: number } | null;
      blitz: { date: string; gain: number } | null;
      bullet: { date: string; gain: number } | null;
    };
    worstRatingLosses: {
      rapid: { date: string; loss: number } | null;
      blitz: { date: string; loss: number } | null;
      bullet: { date: string; loss: number } | null;
    };
    bestRatingDay: {
      date: string;
      format: 'rapid' | 'blitz' | 'bullet';
      gain: number;
    };
    peakRatings: {
      rapid: { rating: number; date: string } | null;
      blitz: { rating: number; date: string } | null;
      bullet: { rating: number; date: string } | null;
    };
    metadata: {
      firstGameDate: string | null;
      lastGameDate: string | null;
      totalGamesAnalyzed: number;
    };
  };
  formatSpecific: {
    [key in 'rapid' | 'blitz' | 'bullet']?: FormatStats;
  };
  playingPatterns: {
    timeOfDay: {
      morning: { games: number; winRate: number };
      afternoon: { games: number; winRate: number };
      evening: { games: number; winRate: number };
      night: { games: number; winRate: number };
      bestTimeToPlay: 'morning' | 'afternoon' | 'evening' | 'night';
    };
    dayOfWeek: {
      monday: { games: number; winRate: number };
      tuesday: { games: number; winRate: number };
      wednesday: { games: number; winRate: number };
      thursday: { games: number; winRate: number };
      friday: { games: number; winRate: number };
      saturday: { games: number; winRate: number };
      sunday: { games: number; winRate: number };
      bestDayToPlay: string;
    };
    averageGamesPerDay: number;
    totalPlayingTime: number;
    averageGameDuration: number;
    longestGame: {
      opponent: string;
      date: string;
      format: string;
      result: string;
      duration: number;
      url: string;
    };
  };
  openings: {
    byColor: {
      asWhite: {
        topOpenings: Array<{
          name: string;
          count: number;
          winRate: number;
          percentage: number;
          eco: string;
          fen: string | null;
          moves: string | null;
        }>;
        worstOpenings: Array<{
          name: string;
          count: number;
          winRate: number;
          percentage: number;
          eco: string;
          fen: string | null;
          moves: string | null;
        }>;
      };
      asBlack: {
        topOpenings: Array<{
          name: string;
          count: number;
          winRate: number;
          percentage: number;
          eco: string;
          fen: string | null;
          moves: string | null;
        }>;
        worstOpenings: Array<{
          name: string;
          count: number;
          winRate: number;
          percentage: number;
          eco: string;
          fen: string | null;
          moves: string | null;
        }>;
      };
    };
  };
  opponents: {
    overall: {
      mostPlayed: Array<{
        username: string;
        games: number;
        winRate: number;
        lossRate: number;
        opponentRating: number;
        percentage: number;
      }>;
      bestPerformance: Array<{
        username: string;
        games: number;
        winRate: number;
        lossRate: number;
        opponentRating: number;
        minGames: number;
      }>;
      worstPerformance: Array<{
        username: string;
        games: number;
        winRate: number;
        lossRate: number;
        opponentRating: number;
        minGames: number;
      }>;
    };
  };
  performance: {
    accuracy: {
      overall: number | null;
      byFormat: {
        rapid: number | null;
        blitz: number | null;
        bullet: number | null;
      };
    };
  };
  miscStats: MiscStats;
}

export interface ChessWrappedResponse extends ChessWrapped {
  quirkyComments?: {
    comments: {
      intro?: string;
      monthlyGames?: string;
      ratings?: string;
      playingPatterns?: string;
      openings?: string;
      miscStats?: string;
    };
    tokensUsed: number;
  };
}

export type ChessUserResponse = ApiResponse<UserProfile>; 