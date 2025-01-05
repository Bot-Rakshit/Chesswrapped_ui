import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface Opening {
  name: string;
  count: number;
  winRate: number;
  percentage: number;
  eco: string;
  fen: string | null;
  moves: string | null;
}

interface OpeningsBreakdownProps {
  data: {
    byColor: {
      asWhite: {
        topOpenings: Opening[];
        worstOpenings: Opening[];
      };
      asBlack: {
        topOpenings: Opening[];
        worstOpenings: Opening[];
      };
    };
  };
}

export const OpeningsBreakdown = ({ data }: OpeningsBreakdownProps) => {
  const getFenImage = (fen: string | null) => {
    if (!fen) return '';
    // Using lichess.org's board image API
    const encodedFen = encodeURIComponent(fen);
    return `https://lichess.org/board.png?fen=${encodedFen}`;
  };

  const OpeningCard = ({ opening, type }: { opening: Opening; type: 'best' | 'worst' }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "p-4 rounded-xl backdrop-blur-sm",
          type === 'best' 
            ? "bg-emerald-500/10 border border-emerald-500/20" 
            : "bg-rose-500/10 border border-rose-500/20"
        )}
      >
        <div className="flex items-start gap-4">
          {opening.fen && (
            <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-black/20">
              <img 
                src={getFenImage(opening.fen)} 
                alt={`${opening.name} position`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="text-sm font-medium text-white/80 mb-1">
              {opening.eco}
            </div>
            <div className="text-lg font-semibold text-white mb-2">
              {opening.name}
            </div>
            <div className="text-sm text-white/60">
              {opening.moves}
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-white/60">
              <div>
                {opening.count} games
              </div>
              <div>
                {opening.percentage}% of games
              </div>
              <div className={cn(
                "px-2 py-0.5 rounded font-medium",
                type === 'best'
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-rose-500/20 text-rose-400"
              )}>
                {Math.round(opening.winRate)}% WR
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* White openings */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">As White</h3>
        <div className="space-y-4">
          {data.byColor.asWhite.topOpenings.slice(0, 3).map((opening) => (
            <OpeningCard key={opening.eco} opening={opening} type="best" />
          ))}
        </div>
      </div>

      {/* Black openings */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">As Black</h3>
        <div className="space-y-4">
          {data.byColor.asBlack.topOpenings.slice(0, 3).map((opening) => (
            <OpeningCard key={opening.eco} opening={opening} type="best" />
          ))}
        </div>
      </div>
    </div>
  );
}; 