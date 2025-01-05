import { motion } from 'framer-motion';

interface ChessInNumbersCardProps {
  totalGames: number;
  formatBreakdown: {
    rapid: { count: number; percentage: number };
    blitz: { count: number; percentage: number };
    bullet: { count: number; percentage: number };
  };
}

export const ChessInNumbersCard: React.FC<ChessInNumbersCardProps> = ({
  totalGames,
  formatBreakdown
}) => {
  return (
    <div className="w-full max-w-lg mx-auto relative z-50">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3"
        >
          Your Chess Journey
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-300"
        >
          2024 in Numbers
        </motion.p>
      </div>

      {/* Total Games with Animated Counter */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mb-12"
      >
        <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 border-2 border-orange-400">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-6xl sm:text-7xl md:text-8xl font-black text-white mb-2"
          >
            {totalGames}
          </motion.div>
          <div className="text-lg sm:text-xl font-bold text-white">
            Total Games Played
          </div>
        </div>
      </motion.div>

      {/* Format Breakdown */}
      <div className="space-y-6">
        {/* Rapid */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="relative"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-lg font-bold text-emerald-300">Rapid</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-emerald-300">{formatBreakdown.rapid.count}</span>
              <span className="text-sm font-bold text-emerald-300">games</span>
            </div>
          </div>
          <div className="h-4 bg-white rounded-full overflow-hidden border-2 border-emerald-400">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${formatBreakdown.rapid.percentage}%` }}
              transition={{ duration: 1, delay: 1 }}
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full relative"
            >
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-black text-white">
                {formatBreakdown.rapid.percentage}%
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Blitz */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="relative"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-400" />
              <span className="text-lg font-bold text-purple-300">Blitz</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-purple-300">{formatBreakdown.blitz.count}</span>
              <span className="text-sm font-bold text-purple-300">games</span>
            </div>
          </div>
          <div className="h-4 bg-white rounded-full overflow-hidden border-2 border-purple-400">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${formatBreakdown.blitz.percentage}%` }}
              transition={{ duration: 1, delay: 1.2 }}
              className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full relative"
            >
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-black text-white">
                {formatBreakdown.blitz.percentage}%
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bullet */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="relative"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-400" />
              <span className="text-lg font-bold text-pink-300">Bullet</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-pink-300">{formatBreakdown.bullet.count}</span>
              <span className="text-sm font-bold text-pink-300">games</span>
            </div>
          </div>
          <div className="h-4 bg-white rounded-full overflow-hidden border-2 border-pink-400">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${formatBreakdown.bullet.percentage}%` }}
              transition={{ duration: 1, delay: 1.4 }}
              className="h-full bg-gradient-to-r from-pink-500 to-pink-400 rounded-full relative"
            >
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-black text-white">
                {formatBreakdown.bullet.percentage}%
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Top Left Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-2xl"
        />
        {/* Bottom Right Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-purple-500 to-pink-500 rounded-full blur-2xl"
        />
      </div>
    </div>
  );
}; 