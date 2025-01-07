import { motion } from 'framer-motion';
import React from 'react';

interface MonthlyStatsCardPart2Props {
  username: string;
  monthlyDistribution: Array<{
    month: number;
    rapid: number;
    blitz: number;
    bullet: number;
  }>;
  mostGamesInDay: {
    date: string;
    count: number;
  };
  favoriteFormat: {
    type: 'rapid' | 'blitz' | 'bullet';
    count: number;
  };
}

type MonthlyData = MonthlyStatsCardPart2Props['monthlyDistribution'][0];

export const MonthlyStatsCardPart2: React.FC<MonthlyStatsCardPart2Props> = ({
  username,
  monthlyDistribution,
  mostGamesInDay,
  favoriteFormat,
}) => {
  // Get second 6 months only
  const secondHalf = monthlyDistribution.slice(6, 12);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const MonthCard = ({ month, index }: { month: MonthlyData, index: number }) => {
    // Calculate total games for the month
    const total = month.rapid + month.blitz + month.bullet;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-black/40 rounded-xl p-4 border border-orange-400/30"
      >
        <div className="text-center mb-3">
          <div className="text-sm font-medium text-orange-300">
            {new Date(2024, month.month - 1).toLocaleString('default', { month: 'long' })}
          </div>
          <div className="text-2xl font-black text-white">
            {total}
          </div>
          <div className="text-xs text-white/60">Games</div>
        </div>

        {/* Format distribution */}
        <div className="space-y-2">
          {month.rapid > 0 && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/80">Rapid</span>
                <span className="text-white/60">{((month.rapid / total) * 100).toFixed(1)}%</span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(month.rapid / total) * 100}%` }}
                />
              </div>
            </div>
          )}
          {month.blitz > 0 && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/80">Blitz</span>
                <span className="text-white/60">{((month.blitz / total) * 100).toFixed(1)}%</span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${(month.blitz / total) * 100}%` }}
                />
              </div>
            </div>
          )}
          {month.bullet > 0 && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/80">Bullet</span>
                <span className="text-white/60">{((month.bullet / total) * 100).toFixed(1)}%</span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: `${(month.bullet / total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto relative z-50 pt-8 sm:pt-0">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6 relative z-50">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
        >
          Monthly Activity
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl font-bold text-orange-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
        >
          Second Half of Your Journey
        </motion.p>
      </div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mb-4 sm:mb-6 relative z-50"
      >
        <div className="inline-block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 border-2 border-orange-400 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-2 gap-3">
            {/* Most Games in a Day */}
            {mostGamesInDay && (
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-white mb-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                  {mostGamesInDay.count}
                </div>
                <div className="text-base font-bold text-white/90">
                  Most Games
                </div>
                <div className="text-xs text-white/80">
                  {formatDate(mostGamesInDay.date)}
                </div>
              </div>
            )}
            {/* Favorite Format */}
            {favoriteFormat && favoriteFormat.type && (
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-white mb-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                  {favoriteFormat.count}
                </div>
                <div className="text-base font-bold text-white/90">
                  {favoriteFormat.type.charAt(0).toUpperCase() + favoriteFormat.type.slice(1)}
                </div>
                <div className="text-xs text-white/80">
                  {favoriteFormat.count} games
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Second Half of the Year */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-orange-300/70 uppercase tracking-wider text-center">July - December</div>
        <div className="grid grid-cols-2 gap-2">
          {secondHalf.map((month, index) => (
            <MonthCard key={month.month} month={month} index={index} />
          ))}
        </div>
      </div>

      {/* Username signature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="mt-6 text-center relative z-50"
      >
        <div className="inline-flex flex-col items-center">
          <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent mb-2" />
          <span className="text-base font-medium text-orange-300/90 tracking-wider">
            {username}
          </span>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-orange-400 to-transparent mt-2" />
        </div>
      </motion.div>
    </div>
  );
}; 