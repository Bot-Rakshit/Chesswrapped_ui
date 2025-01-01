// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Chess.com API Types
export interface ChessUserData {
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

// Explicitly define the response type for better type safety
export interface ChessUserResponse {
  success: boolean;
  data?: ChessUserData;
  error?: string;
} 