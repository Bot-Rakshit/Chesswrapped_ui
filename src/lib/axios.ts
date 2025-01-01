import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_KEY = import.meta.env.VITE_API_KEY || '3hbKuNdWmw5qYX6rE3NxPzPC6SithGMJTEnXXFB3PQ';

interface ErrorResponse {
  message?: string;
}

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add any request transformations here
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const message = error.response.data?.message || error.response.statusText;
      
      switch (status) {
        case 401:
          throw new APIError(message, status, 'UNAUTHORIZED');
        case 404:
          throw new APIError(message, status, 'NOT_FOUND');
        default:
          throw new APIError(message, status, 'API_ERROR');
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new APIError('Network error', 0, 'NETWORK_ERROR');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new APIError('Request configuration error', 0, 'CONFIG_ERROR');
    }
  }
);

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message);
    this.name = 'APIError';
  }
} 