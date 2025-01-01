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

export interface ChessUserResponse {
  success: boolean;
  data?: ChessUserData;
  error?: string;
} 