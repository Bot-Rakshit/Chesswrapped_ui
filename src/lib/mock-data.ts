/** Represents a chess player's data from a platform */
interface MockPlayerData {
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

/** Supported chess platforms */
const PLATFORMS = ['chess.com', 'lichess'] as const;
type Platform = typeof PLATFORMS[number];

/** Simulates API call delay */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/** Mock player database */
const mockPlayers: Record<string, MockPlayerData> = {
  'hikaru': {
    username: 'Hikaru',
    name: 'Hikaru Nakamura',
    countryCode: 'US',
    ratings: {
      rapid: 2850,
      blitz: 3200,
      bullet: 3350
    },
    platformId: 'chess.com'
  },
  'magnuscarlsen': {
    username: 'MagnusCarlsen',
    name: 'Magnus Carlsen',
    countryCode: 'NO',
    ratings: {
      rapid: 2880,
      blitz: 3240,
      bullet: 3360
    },
    platformId: 'chess.com'
  },
  'drdrunkenstein': {
    username: 'DrDrunkenstein',
    name: 'Magnus Carlsen',
    countryCode: 'NO',
    ratings: {
      rapid: 2876,
      blitz: 3186,
      bullet: 3342
    },
    platformId: 'lichess'
  }
};

/**
 * Fetches mock player data for a given username and platform
 * @param username - The username to search for
 * @param platform - The chess platform to search on
 * @returns Promise resolving to player data or null if not found
 * @throws Error if username is empty or platform is invalid
 */
export const fetchPlayerData = async (username: string, platform: Platform): Promise<MockPlayerData | null> => {
  // Input validation
  if (!username.trim()) {
    throw new Error('Username cannot be empty');
  }
  
  if (!PLATFORMS.includes(platform)) {
    throw new Error(`Invalid platform. Must be one of: ${PLATFORMS.join(', ')}`);
  }

  await delay(800); // Simulate network delay

  // Convert username to lowercase for case-insensitive comparison
  const normalizedUsername = username.toLowerCase();
  
  // Find a mock player that matches the username (case-insensitive)
  const player = Object.values(mockPlayers).find(
    p => p.username.toLowerCase() === normalizedUsername && p.platformId === platform
  );

  return player || null;
}; 