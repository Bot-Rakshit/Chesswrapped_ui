import { type FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';
import { Avatar } from './avatar';
import { verifyChessUser } from '@/lib/api';
import type { PlayerData } from '@/types';

interface CountryFlagProps {
  countryCode: string;
  variant?: 'emoji' | 'cdn' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

const CountryFlag: FC<CountryFlagProps> = ({ countryCode, variant = 'cdn', size = 'sm' }) => {
  const sizeMap = {
    sm: 'h-4',
    md: 'h-5',
    lg: 'h-6'
  };

  if (!countryCode) return null;

  const getFlagUrl = (code: string) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

  switch (variant) {
    case 'emoji':
      return (
        <span className="text-lg">
          {countryCode.toUpperCase().replace(/./g, char => 
            String.fromCodePoint(char.charCodeAt(0) + 127397)
          )}
        </span>
      );
    case 'cdn':
    default:
      return (
        <img
          src={getFlagUrl(countryCode)}
          alt={`Flag of ${countryCode}`}
          className={cn(
            sizeMap[size],
            "w-auto flex-shrink-0 shadow-sm rounded-sm"
          )}
        />
      );
  }
};

interface PlayerCardProps {
  player: PlayerData | null;
  platformLogo: string;
  onConfirm: () => void;
  onReject: () => void;
  searchedUsername?: string;
}

const PlayerCard: FC<PlayerCardProps> = ({
  player,
  platformLogo,
  onConfirm,
  onReject,
  searchedUsername,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!searchedUsername) return;
      
      console.log('Fetching data for username:', searchedUsername);
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Making API call...');
        const response = await verifyChessUser(searchedUsername);
        console.log('Raw API Response:', response);
        
        if (response.success && response.data) {
          console.log('Setting player data:', response.data);
          setError(null);
        } else {
          console.log('API returned error:', response.error);
          setError(response.error || 'Failed to fetch player data');
        }
      } catch (err) {
        console.error('API call failed:', err);
        setError('Failed to fetch player data');
      } finally {
        setIsLoading(false);
      }
    };

    if (searchedUsername) {
      fetchPlayerData();
    }
  }, [searchedUsername]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-32 rounded-xl bg-[#0a101f]/95 border-2 border-blue-400/40 flex items-center justify-center"
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </motion.div>
    );
  }

  if (error && !player) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-xl overflow-hidden border-2 border-red-500/30 bg-gradient-to-br from-red-500/10 to-[#0a101f]/30 backdrop-blur-sm"
      >
        <div className="p-5 flex items-center gap-4">
          <div className="h-16 w-16 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Player Not Found</h3>
            <p className="text-sm text-neutral-400">
              {error || `No player found with username ${searchedUsername}`}
            </p>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center justify-end bg-gradient-to-r from-red-500/5 to-[#0a101f]/20 border-t border-red-500/20">
          <button
            onClick={onReject}
            className="px-4 py-2 rounded-md text-sm font-medium bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:text-red-200 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  if (!player) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-xl overflow-hidden border-2 border-blue-400/40 bg-gradient-to-br from-blue-500/10 to-[#0a101f]/30 backdrop-blur-sm"
    >
      <div className="p-5">
        <div className="flex items-start gap-5">
          <div className="relative">
            <Avatar
              src={player.avatar}
              alt={player.username}
              size="lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0a101f] border border-blue-400/40 flex items-center justify-center">
              <img 
                src={platformLogo} 
                alt="Platform Logo"
                className="w-4 h-4 object-contain"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-white/90">
                    {player.username}
                  </h3>
                  {player.name && (
                    <p className="text-sm text-white/70">
                      {player.name}
                    </p>
                  )}
                </div>
                {player.countryCode && (
                  <CountryFlag 
                    countryCode={player.countryCode} 
                    variant="cdn"
                    size="md"
                  />
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5">
              {player.ratings.rapid !== null && (
                <div className="px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center gap-2">
                  <span className="text-blue-300/80 text-xs font-medium">Rapid</span>
                  <span className="text-blue-400 font-semibold text-sm">{player.ratings.rapid}</span>
                </div>
              )}
              {player.ratings.blitz !== null && (
                <div className="px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center gap-2">
                  <span className="text-blue-300/80 text-xs font-medium">Blitz</span>
                  <span className="text-blue-400 font-semibold text-sm">{player.ratings.blitz}</span>
                </div>
              )}
              {player.ratings.bullet !== null && (
                <div className="px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center gap-2">
                  <span className="text-blue-300/80 text-xs font-medium">Bullet</span>
                  <span className="text-blue-400 font-semibold text-sm">{player.ratings.bullet}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-4 flex items-center justify-end gap-3 bg-gradient-to-r from-blue-500/5 to-[#0a101f]/20 border-t border-blue-400/20">
        <button
          onClick={onReject}
          className="px-4 py-2 rounded-md text-sm font-medium bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:text-red-200 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-md text-sm font-medium bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 transition-all duration-200"
        >
          Confirm
        </button>
      </div>
    </motion.div>
  );
};

export default PlayerCard; 