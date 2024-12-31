import { type FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils';
import geminiIcon from '/google-gemini-icon.svg';
import chesscomLogo from '/chesscom_logo_pawn_negative.svg';
import { Boxes } from './components/ui/background-boxes';
import { PlayerCard } from './components/ui/player-card';
import { fetchPlayerData } from './lib/mock-data';
import { Avatar } from './components/ui/avatar';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
  IconHome,
  IconBrandGithub,
  IconBrandTwitter,
  IconInfoCircle,
} from '@tabler/icons-react';

interface VerificationState {
  isLoading: boolean;
  playerData: Awaited<ReturnType<typeof fetchPlayerData>>;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0,
    duration: 0.2
  }
};

const buttonVariants = {
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

const navigationItems = [
  {
    title: "ChessWrapped",
    icon: <IconHome className="h-full w-full text-white stroke-[1.5]" />,
    href: "#",
  },
  {
    title: "About",
    icon: <IconInfoCircle className="h-full w-full text-white stroke-[1.5]" />,
    href: "#about",
  },
  {
    title: "GitHub",
    icon: <IconBrandGithub className="h-full w-full text-white stroke-[1.5]" />,
    href: "https://github.com/rakshit087/chesswrapped",
  },
  {
    title: "Twitter",
    icon: <IconBrandTwitter className="h-full w-full text-white stroke-[1.5]" />,
    href: "https://twitter.com/rakshit087",
  },
];

const LandingPage: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [verificationState, setVerificationState] = useState<VerificationState>({
    isLoading: false,
    playerData: null
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (verificationState.playerData) {
      setVerificationState({ isLoading: false, playerData: null });
    }
    setIsConfirmed(false);
    setShowVerification(false);
  };

  const handleConfirmPlayer = () => {
    setIsConfirmed(true);
  };

  const handleRejectPlayer = () => {
    setVerificationState({ isLoading: false, playerData: null });
    setUsername('');
    setIsConfirmed(false);
    setShowVerification(false);
  };

  const handleVerifyClick = async () => {
    setIsGenerating(true);
    setShowVerification(true);

    setVerificationState({ isLoading: true, playerData: null });
    const playerData = await fetchPlayerData(username, 'chess.com');
    setVerificationState({ isLoading: false, playerData });

    setIsGenerating(false);
  };

  const handleGenerate = async () => {
    // This will be replaced with actual generation logic
    console.log('Generating wrapped for:', {
      username: username
    });
  };

  return (
    <div className="fixed inset-0 bg-[#030711] overflow-hidden">
      {/* Background Boxes */}
      <div className="absolute inset-0 z-10">
        <Boxes />
      </div>

      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-1/3 aspect-square bg-gradient-to-b from-[#1e40af]/3 blur-[140px]" />
        <div className="absolute bottom-0 right-1/3 translate-x-1/2 w-1/3 aspect-square bg-gradient-to-t from-[#1e3a8a]/3 blur-[140px]" />
      </div>

      {/* Enhanced gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030711]/90 via-[#030711]/70 to-[#030711]/90 z-20 pointer-events-none" />

      {/* Main Content */}
      <div className="absolute inset-0 z-40 flex items-center justify-center px-4 sm:px-6 pointer-events-none overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto pointer-events-auto py-8 sm:py-12 md:py-16"
        >
          <div className={cn(
            "relative p-6 sm:p-8 md:p-10 rounded-3xl",
            "border-2 border-green-400/30",
            "bg-[#0a101f]/95 backdrop-blur-lg",
            "shadow-[0_0_30px_rgba(34,197,94,0.15)]",
            "transition-all duration-500",
            "hover:shadow-[0_0_50px_rgba(34,197,94,0.2)]",
            "hover:border-green-400/40",
            "group",
            "relative",
            "overflow-hidden"
          )}>
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative text-center">
              <motion.h1 
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 sm:mb-8 md:mb-10 relative group w-full flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative inline-flex items-center justify-center flex-wrap gap-2">
                  <motion.div 
                    className="relative px-3 py-2"
                    whileHover={{ y: -4, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-green-100 to-white rounded-xl transform rotate-1 shadow-lg" />
                    <span className="relative text-[#030711] font-black tracking-tighter whitespace-nowrap">
                      Chess
                    </span>
                  </motion.div>
                  <motion.div 
                    className="relative px-3 py-2"
                    whileHover={{ y: -4, rotate: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-xl transform -rotate-1 shadow-lg" />
                    <span className="relative text-white font-black tracking-tighter whitespace-nowrap">
                      Wrapped
                    </span>
                  </motion.div>
                </div>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-default text-sm sm:text-base md:text-lg text-white/95 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]"
              >
                Your Chess.com journey, beautifully captured. Share your stats!
              </motion.p>

              <div className="flex flex-col items-center space-y-8 sm:space-y-10">
                {/* Username Input Section */}
                <motion.div 
                  variants={fadeInVariants}
                  className="w-full max-w-md mx-auto"
                >
                  <div className="text-xs sm:text-sm text-white font-semibold text-center mb-4 sm:mb-6 drop-shadow-sm flex items-center justify-center gap-2">
                    Enter your Chess.com username to get started
                  </div>

                  <div className="space-y-6">
                    {!isConfirmed && (
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-20">
                          <img 
                            src={chesscomLogo} 
                            alt="Chess.com" 
                            className="h-6 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-md"
                          />
                        </div>
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        <input
                          type="text"
                          placeholder="Enter your Chess.com username"
                          value={username}
                          onChange={(e) => handleUsernameChange(e.target.value)}
                          disabled={verificationState.isLoading}
                          className={cn(
                            "w-full pl-14 pr-4 py-4 rounded-xl",
                            "bg-[#0a101f]/95 backdrop-blur-sm",
                            "border-2 transition-all duration-300",
                            "text-white text-lg placeholder-white/60",
                            "focus:outline-none",
                            "font-default font-medium tracking-wide",
                            "relative z-10",
                            "disabled:opacity-50 disabled:cursor-wait",
                            verificationState.isLoading
                              ? "border-green-400/90 focus:border-green-400"
                              : [
                                  "border-green-400/40",
                                  "hover:border-green-400/60",
                                  "focus:border-green-400/80",
                                  "focus:shadow-[0_0_30px_rgba(34,197,94,0.3)]",
                                  "hover:shadow-[0_0_25px_rgba(34,197,94,0.2)]"
                                ],
                            "drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
                            "[&::placeholder]:text-white/60",
                            "[&::placeholder]:font-normal",
                            "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]",
                            "focus:bg-[#0a101f]"
                          )}
                          maxLength={25}
                          aria-label="Chess.com username"
                        />
                      </div>
                    )}

                    <AnimatePresence mode="wait">
                      {verificationState.isLoading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle 
                              className="opacity-25" 
                              cx="12" 
                              cy="12" 
                              r="10" 
                              stroke="currentColor" 
                              strokeWidth="4"
                              fill="none"
                            />
                            <path 
                              className="opacity-75" 
                              fill="currentColor" 
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        </motion.div>
                      )}

                      {showVerification && verificationState.playerData === null && !verificationState.isLoading && username.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-6"
                        >
                          <PlayerCard
                            player={null}
                            platformLogo={chesscomLogo}
                            onConfirm={handleConfirmPlayer}
                            onReject={handleRejectPlayer}
                            searchedUsername={username}
                          />
                        </motion.div>
                      )}

                      {showVerification && verificationState.playerData && !isConfirmed && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-6"
                        >
                          <PlayerCard
                            player={verificationState.playerData}
                            platformLogo={chesscomLogo}
                            onConfirm={handleConfirmPlayer}
                            onReject={handleRejectPlayer}
                          />
                        </motion.div>
                      )}

                      {isConfirmed && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3 bg-gradient-to-r from-[#0a101f]/95 to-[#0a101f]/98 backdrop-blur-md rounded-lg border-2 border-green-400/30 p-3 shadow-[0_4px_12px_rgba(34,197,94,0.15)] hover:shadow-[0_4px_20px_rgba(34,197,94,0.2)] hover:border-green-400/40 transition-all duration-300"
                        >
                          <div className="relative">
                            <Avatar
                              src={verificationState.playerData?.avatar}
                              alt={verificationState.playerData?.username || 'Chess.com'}
                              fallback={verificationState.playerData?.username?.[0].toUpperCase() || '?'}
                              size="sm"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a101f] flex items-center justify-center">
                              <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white drop-shadow-sm">
                              {verificationState.playerData?.username}
                            </p>
                            <p className="text-xs font-medium text-green-400/90">
                              Account verified
                            </p>
                          </div>
                          <button
                            onClick={handleRejectPlayer}
                            className="text-xs font-medium text-white/60 hover:text-white transition-colors duration-200 hover:bg-white/5 px-2 py-1 rounded-md"
                          >
                            Change
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <AnimatePresence mode="wait">
                  {username.length >= 3 && (
                    <motion.div
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex flex-col items-center gap-4"
                    >
                      <motion.button
                        onClick={!showVerification ? handleVerifyClick : handleGenerate}
                        disabled={isGenerating || (showVerification && !isConfirmed)}
                        className={cn(
                          "group relative inline-flex items-center justify-center gap-2",
                          "px-6 sm:px-8 py-3 overflow-hidden rounded-lg",
                          "transition-all duration-300 ease-out",
                          "font-default text-base sm:text-lg font-semibold",
                          (!isGenerating && (!showVerification || isConfirmed))
                            ? [
                                "bg-gradient-to-r from-green-400 to-green-500 text-white",
                                "hover:scale-[1.02]",
                                "shadow-[0_0_20px_rgba(34,197,94,0.5)]",
                                "hover:shadow-[0_0_30px_rgba(34,197,94,0.7)]",
                                "border border-green-200/30"
                              ]
                            : "bg-[#1e2d44]/50 text-neutral-400 cursor-not-allowed"
                        )}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        {isGenerating ? (
                          <div className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle 
                                className="opacity-25" 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                                fill="none"
                              />
                              <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            <span>Generating...</span>
                          </div>
                        ) : (
                          'Generate Your Wrapped'
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Powered by Section */}
                <div className="flex items-center space-x-3 pt-4 sm:pt-6">
                  <span className="text-neutral-400 font-default text-xs sm:text-sm">Powered by</span>
                  <div className="flex items-center space-x-2 glass-effect rounded-lg px-3 py-1.5 sm:py-2 shadow-lg bg-gradient-to-r from-green-500/10 to-green-400/10 border border-green-500/20 hover:border-green-400/30 hover:from-green-500/15 hover:to-green-400/15 transition-all duration-300">
                    <img src={geminiIcon} alt="Google Gemini" className="h-4 sm:h-5 w-auto" />
                    <span className="text-green-300 font-medium text-xs sm:text-sm">Gemini</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Floating Dock */}
      <FloatingDock
        items={navigationItems}
        mobileClassName="absolute bottom-4 left-1/2 -translate-x-1/2 z-50"
        desktopClassName="absolute bottom-4 left-1/2 -translate-x-1/2 z-50"
      />
    </div>
  );
};

export default LandingPage; 