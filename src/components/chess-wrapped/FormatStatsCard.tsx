import { motion } from 'framer-motion';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/utils';

interface FormatStatsCardProps {
  username: string;
  format: 'rapid' | 'blitz' | 'bullet';
  currentRating: number;
  ratingHistory: Array<{
    date: string;
    rating: number;
  }>;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const FormatStatsCard: React.FC<FormatStatsCardProps> = ({
  username,
  format,
  currentRating,
  ratingHistory,
}) => {
  // Calculate rating trends
  const ratingChange = ratingHistory.length >= 2 
    ? currentRating - ratingHistory[0].rating
    : 0;
  
  const highestRating = Math.max(...ratingHistory.map(h => h.rating));
  const lowestRating = Math.min(...ratingHistory.map(h => h.rating));
  const ratingRange = highestRating - lowestRating;

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
          {format.charAt(0).toUpperCase() + format.slice(1)} Rating
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl font-bold text-orange-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
        >
          Current: {currentRating}
        </motion.p>
      </div>

      {/* Rating History Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6 bg-black/40 rounded-xl p-4 border border-orange-400/30"
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ratingHistory}>
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                domain={[lowestRating - 50, highestRating + 50]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(249,115,22,0.3)',
                  borderRadius: '0.5rem',
                }}
                labelFormatter={formatDate}
              />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke="#F97316"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#F97316' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Rating Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {/* Rating Change */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-black/40 rounded-xl p-4 border border-orange-400/30"
        >
          <div className="text-center">
            <div className="text-sm font-medium text-orange-300 mb-1">Rating Change</div>
            <div className={cn(
              "text-xl font-black",
              ratingChange > 0 ? "text-emerald-400" : ratingChange < 0 ? "text-red-400" : "text-white"
            )}>
              {ratingChange > 0 ? "+" : ""}{ratingChange}
            </div>
          </div>
        </motion.div>

        {/* Peak Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-black/40 rounded-xl p-4 border border-orange-400/30"
        >
          <div className="text-center">
            <div className="text-sm font-medium text-orange-300 mb-1">Peak Rating</div>
            <div className="text-xl font-black text-white">
              {highestRating}
            </div>
          </div>
        </motion.div>

        {/* Rating Range */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="col-span-2 sm:col-span-1 bg-black/40 rounded-xl p-4 border border-orange-400/30"
        >
          <div className="text-center">
            <div className="text-sm font-medium text-orange-300 mb-1">Rating Range</div>
            <div className="text-xl font-black text-white">
              {ratingRange}
            </div>
          </div>
        </motion.div>
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