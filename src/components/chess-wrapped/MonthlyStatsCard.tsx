import { motion } from 'framer-motion';
import React from 'react';

export interface MonthlyStatsCardProps {
  username: string;
  monthlyDistribution: Array<{
    month: number;
    rapid: number;
    blitz: number;
    bullet: number;
  }>;
  longestStreak: {
    start: string;
    end: string;
    days: number;
  };
  longestBreak: {
    start: string;
    end: string;
    days: number;
  };
}

export const MonthlyStatsCard: React.FC<MonthlyStatsCardProps> = ({
  username,
  monthlyDistribution,
  longestStreak,
  longestBreak
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Get first 6 months only
  const firstHalf = monthlyDistribution.slice(0, 6);

  const MonthCard = ({ month, index }: { month: MonthlyStatsCardProps['monthlyDistribution'][0], index: number }) => {
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
          First Half of Your Journey
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
            {/* Longest Streak */}
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-white mb-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                {longestStreak.days}
              </div>
              <div className="text-base font-bold text-white/90">
                Day Streak
              </div>
              <div className="text-xs text-white/80">
                {formatDate(longestStreak.start)} - {formatDate(longestStreak.end)}
              </div>
            </div>
            {/* Longest Break */}
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-white mb-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                {longestBreak.days}
              </div>
              <div className="text-base font-bold text-white/90">
                Day Break
              </div>
              <div className="text-xs text-white/80">
                {formatDate(longestBreak.start)} - {formatDate(longestBreak.end)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* First Half of the Year */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-orange-300/70 uppercase tracking-wider text-center">January - June</div>
        <div className="grid grid-cols-2 gap-2">
          {firstHalf.map((month, index) => (
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