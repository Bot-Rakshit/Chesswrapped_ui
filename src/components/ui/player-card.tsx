import { type FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';
import { Avatar } from './avatar';

interface PlayerInfo {
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

interface PlayerCardProps {
  player?: PlayerInfo | null;
  onConfirm: () => void;
  onReject: () => void;
  platformLogo: string;
  searchedUsername?: string;
}

export const PlayerCard: FC<PlayerCardProps> = ({
  player,
  onConfirm,
  onReject,
  platformLogo,
  searchedUsername
}) => {
  if (!player) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn(
          "w-full rounded-xl overflow-hidden",
          "border-2 border-red-500/30",
          "bg-gradient-to-br from-red-500/10 to-[#0a101f]/30",
          "backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        )}
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
              {searchedUsername ? (
                <>No player found with username <span className="text-red-400">{searchedUsername}</span></>
              ) : (
                'Please check the username and try again'
              )}
            </p>
          </div>
        </div>
        <div className={cn(
          "px-5 py-4 flex items-center justify-end",
          "bg-gradient-to-r from-red-500/5 to-[#0a101f]/20",
          "border-t border-red-500/20"
        )}>
          <button
            onClick={onReject}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium",
              "bg-red-500/20 text-red-300",
              "hover:bg-red-500/30 hover:text-red-200",
              "transition-all duration-200 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
            )}
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "w-full rounded-xl overflow-hidden",
        "border-2 border-green-500/30",
        "bg-gradient-to-br from-green-500/10 to-[#0a101f]/30",
        "backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.1)]"
      )}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-5">
          {/* Avatar and Platform */}
          <div className="relative">
            <Avatar
              src={player.avatar}
              alt={player.username}
              size="lg"
            />
            <div 
              className={cn(
                "absolute -bottom-1 -right-1",
                "w-6 h-6 rounded-full",
                "bg-[#0a101f]",
                "border border-[#1e2d44]",
                "flex items-center justify-center",
                "shadow-lg",
                "ring-2 ring-[#4361ee]/20"
              )}
            >
              <img 
                src={platformLogo} 
                alt={player.platformId}
                className="w-4 h-4 object-contain"
              />
            </div>
          </div>

          {/* Player Info */}
          <div className="flex-1 min-w-0">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2 mb-0.5">
                <span className="truncate">{player.username}</span>
                {player.countryCode && (
                  <img
                    src={`https://flagcdn.com/w20/${player.countryCode.toLowerCase()}.png`}
                    alt={player.countryCode}
                    className="h-5 w-auto flex-shrink-0 shadow-sm"
                  />
                )}
              </h3>
              {player.name && (
                <p className="text-sm text-white/70 truncate">{player.name}</p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              {player.ratings.rapid && (
                <div className={cn(
                  "px-3 py-1.5 rounded-md",
                  "bg-emerald-500/10 border border-emerald-500/30",
                  "flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                )}>
                  <span className="text-emerald-300/80 text-xs font-medium">Rapid</span>
                  <span className="text-emerald-400 font-semibold text-sm tabular-nums">{player.ratings.rapid}</span>
                </div>
              )}
              {player.ratings.blitz && (
                <div className={cn(
                  "px-3 py-1.5 rounded-md",
                  "bg-blue-500/10 border border-blue-500/30",
                  "flex items-center gap-2 shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                )}>
                  <span className="text-blue-300/80 text-xs font-medium">Blitz</span>
                  <span className="text-blue-400 font-semibold text-sm tabular-nums">{player.ratings.blitz}</span>
                </div>
              )}
              {player.ratings.bullet && (
                <div className={cn(
                  "px-3 py-1.5 rounded-md",
                  "bg-purple-500/10 border border-purple-500/30",
                  "flex items-center gap-2 shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                )}>
                  <span className="text-purple-300/80 text-xs font-medium">Bullet</span>
                  <span className="text-purple-400 font-semibold text-sm tabular-nums">{player.ratings.bullet}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Section */}
      <div className={cn(
        "px-5 py-4 flex items-center gap-3",
        "bg-gradient-to-r from-green-500/20 to-[#0a101f]/40",
        "border-t-2 border-green-500/30"
      )}>
        <p className="text-sm text-white/70 mr-auto">Is this you?</p>
        <button
          onClick={onReject}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium",
            "bg-red-500/10 border border-red-500/30 text-red-300",
            "hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-200",
            "transition-all duration-200 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
          )}
        >
          Not me
        </button>
        <button
          onClick={onConfirm}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium",
            "bg-green-500 text-white/90",
            "hover:bg-green-600 hover:text-white",
            "transition-all duration-200",
            "shadow-[0_2px_10px_rgba(34,197,94,0.3)]",
            "hover:shadow-[0_2px_20px_rgba(34,197,94,0.4)]"
          )}
        >
          Yes, that's me
        </button>
      </div>
    </motion.div>
  );
}; 