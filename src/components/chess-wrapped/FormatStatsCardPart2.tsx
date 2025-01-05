import { motion } from 'framer-motion';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface FormatStatsCardPart2Props {
  username: string;
  format: 'rapid' | 'blitz' | 'bullet';
  results: {
    wins: number;
    draws: number;
    losses: number;
    timeouts: number;
    abandoned: number;
  };
  bestWin: {
    opponentName: string;
    opponentRating: number;
    date: string;
  };
  worstLoss: {
    opponentName: string;
    opponentRating: number;
    date: string;
  };
  accuracy?: number | null;
}

const COLORS = {
  wins: '#10B981', // emerald-500
  draws: '#6366F1', // indigo-500
  losses: '#EF4444', // red-500
  timeouts: '#F59E0B', // amber-500
  abandoned: '#6B7280', // gray-500
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const FormatStatsCardPart2: React.FC<FormatStatsCardPart2Props> = ({
  username,
  format,
  results,
  bestWin,
  worstLoss,
  accuracy
}) => {
  // Calculate total games for pie chart
  const total = Object.values(results).reduce((acc, val) => acc + val, 0);
  const pieData = Object.entries(results).map(([key, value]) => ({
    name: key,
    value: (value / total) * 100,
  }));

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
          {format.charAt(0).toUpperCase() + format.slice(1)} Performance
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl font-bold text-orange-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
        >
          Game Results & Analysis
        </motion.p>
      </div>

      {/* Results Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6 bg-black/40 rounded-xl p-4 border border-orange-400/30"
      >
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name as keyof typeof COLORS]} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {Object.entries(results).map(([key, value]) => (
            value > 0 && (
              <div key={key} className="text-center">
                <div className="text-xs font-medium" style={{ color: COLORS[key as keyof typeof COLORS] }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <div className="text-sm font-bold text-white">
                  {((value / total) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-white/60">
                  {value} games
                </div>
              </div>
            )
          ))}
        </div>
      </motion.div>

      {/* Best Win & Worst Loss */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Best Win */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-black/40 rounded-xl p-4 border border-emerald-400/30"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-medium text-emerald-400 mb-1">Best Win</div>
              <div className="text-base font-bold text-white mb-0.5">
                vs {bestWin.opponentName}
              </div>
              <div className="text-sm text-white/70">
                Rating: {bestWin.opponentRating}
              </div>
            </div>
            <div className="text-xs text-white/60">
              {formatDate(bestWin.date)}
            </div>
          </div>
        </motion.div>

        {/* Worst Loss */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-black/40 rounded-xl p-4 border border-red-400/30"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-medium text-red-400 mb-1">Worst Loss</div>
              <div className="text-base font-bold text-white mb-0.5">
                vs {worstLoss.opponentName}
              </div>
              <div className="text-sm text-white/70">
                Rating: {worstLoss.opponentRating}
              </div>
            </div>
            <div className="text-xs text-white/60">
              {formatDate(worstLoss.date)}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Accuracy (if available) */}
      {accuracy !== null && accuracy !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-6 bg-black/40 rounded-xl p-4 border border-blue-400/30"
        >
          <div className="text-center">
            <div className="text-sm font-medium text-blue-400 mb-2">Average Accuracy</div>
            <div className="text-3xl font-black text-white">
              {accuracy.toFixed(1)}%
            </div>
          </div>
        </motion.div>
      )}

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