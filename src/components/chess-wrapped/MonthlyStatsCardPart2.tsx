import { motion } from 'framer-motion';
import React from 'react';
import { MonthlyStatsCardProps } from './MonthlyStatsCard';

type MonthlyData = MonthlyStatsCardProps['monthlyDistribution'][0];

export const MonthlyStatsCardPart2: React.FC<MonthlyStatsCardProps> = ({
  username,
  monthlyDistribution,
  mostGamesInDay,
  favoriteFormat
}) => {
  // Get second 6 months only
  const secondHalf = monthlyDistribution.slice(6, 12);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const MonthCard = ({ month, index }: { month: MonthlyData; index: number }) => (
    month.total > 0 && (
      <motion.div
        key={month.month}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
        className="relative bg-black/40 rounded-lg p-2 border border-orange-400/30"
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-base font-bold text-orange-300">{month.month}</span>
          <span className="text-sm font-black text-white">{month.total}</span>
        </div>
        <div className="space-y-1.5">
          {/* Rapid */}
          {month.rapid > 0 && (
            <div className="relative">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-emerald-300">Rapid</span>
                <span className="text-xs font-bold text-emerald-300 ml-auto">{month.rapid}</span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(month.rapid / month.total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                />
              </div>
            </div>
          )}
          {/* Blitz */}
          {month.blitz > 0 && (
            <div className="relative">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-xs font-medium text-purple-300">Blitz</span>
                <span className="text-xs font-bold text-purple-300 ml-auto">{month.blitz}</span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(month.blitz / month.total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                />
              </div>
            </div>
          )}
          {/* Bullet */}
          {month.bullet > 0 && (
            <div className="relative">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                <span className="text-xs font-medium text-pink-300">Bullet</span>
                <span className="text-xs font-bold text-pink-300 ml-auto">{month.bullet}</span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(month.bullet / month.total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-pink-600 to-pink-400"
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    )
  );

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
            {favoriteFormat && (
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-white mb-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                  {favoriteFormat.winRate}%
                </div>
                <div className="text-base font-bold text-white/90">
                  {favoriteFormat.format.charAt(0).toUpperCase() + favoriteFormat.format.slice(1)} Win Rate
                </div>
                <div className="text-xs text-white/80">
                  {favoriteFormat.gamesPlayed} games
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