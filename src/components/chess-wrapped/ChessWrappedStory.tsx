import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/utils";
import { MultiStepLoader } from "../ui/multi-step-loader";
import { IconShare3, IconDownload } from '@tabler/icons-react';
import type { PlayerData } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { CountryFlag } from '../ui/country-flag';

const loadingStates = [
  { text: "Connecting to Chess.com..." },
  { text: "Analyzing your games from 2023..." },
  { text: "Finding your brilliant moves..." },
  { text: "Calculating your win rates..." },
  { text: "Discovering your favorite openings..." },
  { text: "Identifying your playing style..." },
  { text: "Preparing your chess story..." },
  { text: "Creating your wrapped..." },
  { text: "Almost ready..." },
];

type ChessPieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
type DecorationElement = {
  type: ChessPieceType | 'dots' | 'board' | 'crown' | 'sparkles' | 'graph' | 'clock' | 'hourglass';
  position: string;
  className?: string;
};

interface StoryCard {
  id: string;
  background: string;
  pattern: string;
  title: string;
  subtitle: string;
  decorations: DecorationElement[];
}

const storyCards: StoryCard[] = [
  {
    id: "games-played",
    background: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
    pattern: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1%, transparent 1%) 0 0/8px 8px",
    title: "Your Chess Journey",
    subtitle: "2023 in Numbers",
    decorations: [
      { type: "pawn", position: "top-[10%] left-[10%] w-16 opacity-20" },
      { type: "knight", position: "bottom-[15%] right-[10%] w-24 opacity-15" },
      { type: "dots", position: "top-[20%] right-[20%]" },
    ]
  },
  {
    id: "favorite-opening",
    background: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700",
    pattern: "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent) 0 0/20px 20px",
    title: "Opening Mastery",
    subtitle: "Your Signature Moves",
    decorations: [
      { type: "bishop", position: "top-[15%] right-[15%] w-20 opacity-20" },
      { type: "board", position: "bottom-[20%] left-[10%] w-32 opacity-10" },
    ]
  },
  {
    id: "win-rate",
    background: "bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700",
    pattern: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 1px, transparent 1px) 0 0/15px 15px",
    title: "Victory Road",
    subtitle: "Your Winning Moments",
    decorations: [
      { type: "queen", position: "bottom-[10%] right-[10%] w-28 opacity-20" },
      { type: "crown", position: "top-[15%] left-[15%] w-16 opacity-15" },
    ]
  },
  {
    id: "best-game",
    background: "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700",
    pattern: "linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px) 0 0/20px 20px, linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px) 0 0/20px 20px",
    title: "Brilliant Moves",
    subtitle: "Your Best Games",
    decorations: [
      { type: "rook", position: "top-[20%] right-[20%] w-20 opacity-20" },
      { type: "sparkles", position: "bottom-[15%] left-[15%]" },
    ]
  },
  {
    id: "rating-progress",
    background: "bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700",
    pattern: "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2) 1px, transparent 1px) 0 0/20px 20px",
    title: "Rating Journey",
    subtitle: "Your Progress",
    decorations: [
      { type: "graph", position: "center" },
      { type: "king", position: "top-[10%] right-[10%] w-24 opacity-15" },
    ]
  },
  {
    id: "time-control",
    background: "bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700",
    pattern: "linear-gradient(45deg, rgba(255,255,255,0.1) 2px, transparent 2px) 0 0/10px 10px",
    title: "Time Control",
    subtitle: "Your Game Pace",
    decorations: [
      { type: "clock", position: "top-[15%] left-[15%] w-20 opacity-20" },
      { type: "hourglass", position: "bottom-[20%] right-[20%] w-16 opacity-15" },
    ]
  },
];

// Chess piece SVG components
const ChessPiece = ({ type, className }: { type: string; className?: string }) => {
  const pieces = {
    pawn: "M12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-6 14h12M9 19v-3.4c-1.8-.8-3-2.6-3-4.6 0-2.8 2.2-5 5-5s5 2.2 5 5c0 2-1.2 3.8-3 4.6V19",
    knight: "M19 22H5v-2h14v2M13 2c-1.25 0-2.42.62-3.11 1.66L7 8l2 2 2.06-1.37c.44-.31 1.08-.19 1.39.27.02.03.05.06.07.08l1.04 1.57c.36.54.22 1.27-.32 1.63l-2.79 1.86L8 16l-3.78 4.78C3.82 21.22 4.12 22 4.67 22h14.67c.55 0 .85-.78.45-1.22L16 16l-2.45-1.96c-.54-.36-.68-1.09-.32-1.63l1.04-1.57c.36-.54 1.09-.68 1.63-.32l2.06 1.37 2-2-2.89-4.34C16.42 2.62 15.25 2 14 2h-1z",
    bishop: "M12 2a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2v2l-1 1v4h6v-4l-1-1v-2c0-1.1-.9-2-2-2z",
    rook: "M5 20h14v2H5v-2zM17 2H7L4 8h16L17 2zm-2 7H9v3h6V9zm0 4H9v3h6v-3z",
    queen: "M18 3a2 2 0 0 1 2 2c0 .81-.5 1.5-1.17 1.82L17 17h-2l-1.83-10.18A2 2 0 0 1 12 5a2 2 0 0 1-1.17 1.82L9 17H7L5.17 6.82A2 2 0 0 1 4 5a2 2 0 0 1 4 0c0 .81-.5 1.5-1.17 1.82L8 17h8l1.17-10.18A2 2 0 0 1 16 5a2 2 0 0 1 2-2z",
    king: "M12 2l3 5h5l-4 4 2 5-6-3-6 3 2-5-4-4h5z",
  };

  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn("absolute", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={pieces[type as keyof typeof pieces]} />
    </svg>
  );
};

// Decorative elements
const Decorations = ({ decorations }: { decorations: DecorationElement[] }) => {
  return (
    <>
      {decorations.map((decoration, idx) => {
        if (['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'].includes(decoration.type)) {
          return (
            <ChessPiece
              key={idx}
              type={decoration.type as ChessPieceType}
              className={decoration.position}
            />
          );
        }
        return null;
      })}
    </>
  );
};

// New simplified player card for completion view
const CompletionPlayerCard: React.FC<{ player: PlayerData }> = ({ player }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-xl overflow-hidden border-2 border-blue-400/40 bg-gradient-to-br from-blue-500/10 to-[#0a1628]/30 backdrop-blur-sm"
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
                src="/chesscom_logo_pawn_negative.svg"
                alt="Chess.com"
                className="w-4 h-4 object-contain"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-4">
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
    </motion.div>
  );
};

// Simplified share menu for download only
const ShareMenu: React.FC<{ 
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[#0a1628] rounded-2xl p-6 max-w-sm w-full shadow-xl border-2 border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-white mb-2">Download Card</h3>
        <p className="text-sm text-white/60 mb-4">Save this card as an image</p>
        
        <button
          onClick={() => {
            // Add download logic here
            onClose();
          }}
          className={cn(
            "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-colors",
            "text-sm font-medium",
            "bg-purple-500/20 hover:bg-purple-500/30 text-purple-300"
          )}
        >
          <IconDownload className="w-5 h-5" />
          <span>Download Image</span>
        </button>
      </div>
    </motion.div>
  );
};

export const ChessWrappedStory = ({ playerData }: { playerData: PlayerData }) => {
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [storyComplete, setStoryComplete] = useState(false);
  const [selectedCard, setSelectedCard] = useState<StoryCard | null>(null);

  // Handle navigation
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentCardIndex < storyCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setStoryComplete(true);
    }
  };

  useEffect(() => {
    // Only keep the loading timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, loadingStates.length * 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentCardIndex < storyCards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentCardIndex > 0) {
        setCurrentCardIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCardIndex]);

  // Handle click navigation
  const handleScreenClick = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { innerWidth } = window;
    const clickPosition = clientX / innerWidth;

    if (clickPosition > 0.7 && currentCardIndex < storyCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else if (clickPosition < 0.3 && currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  // Handle share
  const handleShare = async (card: StoryCard, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    const shareData = {
      title: `${playerData.username}'s Chess Wrapped - ${card.title}`,
      text: `Check out my ${card.title} on Chess Wrapped!`,
      url: `https://chesswrapped.com/share/${playerData.username}/${card.id}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // If Web Share API is not available, show download option
        setSelectedCard(card);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  // Handle download
  const handleDownload = (card: StoryCard, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedCard(card);
  };

  // Hide floating dock when story is visible
  useEffect(() => {
    const dock = document.querySelector('[data-floating-dock]');
    if (dock) {
      dock.classList.add('hidden');
    }

    // Cleanup - show dock when component unmounts
    return () => {
      if (dock) {
        dock.classList.remove('hidden');
      }
    };
  }, []);

  // Show dock in completion view
  useEffect(() => {
    const dock = document.querySelector('[data-floating-dock]');
    if (dock) {
      if (storyComplete) {
        dock.classList.remove('hidden');
      } else {
        dock.classList.add('hidden');
      }
    }
  }, [storyComplete]);

  if (loading) {
    return <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={2000} />;
  }

  if (storyComplete) {
    return (
      <div className="fixed inset-0 bg-[#0a1628]/95 backdrop-blur-xl z-[100] overflow-y-auto">
        <div className="container max-w-2xl mx-auto px-4 py-8">
          {/* Player Card */}
          <div className="mb-8">
            <CompletionPlayerCard player={playerData} />
          </div>

          {/* Story Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {storyCards.map((card, idx) => (
              <div key={card.id} className="relative group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "aspect-[9/16] rounded-xl overflow-hidden relative",
                    "border-2 border-white/10 group-hover:border-white/20 transition-colors"
                  )}
                >
                  <div className={cn("w-full h-full", card.background)}>
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{ backgroundImage: card.pattern }}
                    />
                    <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center">
                      <h3 className="text-lg font-bold text-white mb-1">{card.title}</h3>
                      <p className="text-sm text-white/80">{card.subtitle}</p>
                    </div>
                  </div>

                  {/* Share/Download buttons */}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleShare(card, e)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 active:bg-white/40"
                      >
                        <IconShare3 className="w-4 h-4" />
                        Share
                      </button>
                      <button
                        onClick={(e) => handleDownload(card, e)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 active:bg-white/40"
                      >
                        <IconDownload className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Download menu */}
          <AnimatePresence>
            {selectedCard && (
              <ShareMenu
                isOpen={true}
                onClose={() => setSelectedCard(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
      <div className="w-full h-full">
        {/* Story Container */}
        <div 
          className="relative w-full h-full"
          onClick={handleScreenClick}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCardIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <div 
                className={cn(
                  "w-full h-full relative",
                  storyCards[currentCardIndex].background
                )}
              >
                {/* Pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{ backgroundImage: storyCards[currentCardIndex].pattern }}
                />

                {/* Card content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8"
                  >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                      {storyCards[currentCardIndex].title}
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-white/80">
                      {storyCards[currentCardIndex].subtitle}
                    </p>
                  </motion.div>

                  {/* Decorative elements */}
                  <Decorations decorations={storyCards[currentCardIndex].decorations} />
                </div>

                {/* Navigation buttons */}
                <div className="absolute inset-x-0 top-0 h-full flex items-center justify-between px-4">
                  <button
                    onClick={() => setCurrentCardIndex(prev => prev - 1)}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      "bg-white/10 backdrop-blur-sm",
                      "transition-opacity duration-200",
                      currentCardIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
                    )}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      "bg-white/10 backdrop-blur-sm",
                      "transition-opacity duration-200",
                      currentCardIndex === storyCards.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100"
                    )}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Progress bar */}
                <div className="absolute top-0 inset-x-0 flex gap-1 p-2">
                  {storyCards.map((_, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-1 rounded-full overflow-hidden bg-white/20"
                    >
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: idx <= currentCardIndex ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-white"
                      />
                    </div>
                  ))}
                </div>

                {/* Close button */}
                <button
                  onClick={() => setStoryComplete(true)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Share/Download buttons */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    onClick={(e) => handleShare(storyCards[currentCardIndex], e)}
                    className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 active:bg-white/40"
                  >
                    <IconShare3 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={(e) => handleDownload(storyCards[currentCardIndex], e)}
                    className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 active:bg-white/40"
                  >
                    <IconDownload className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}; 