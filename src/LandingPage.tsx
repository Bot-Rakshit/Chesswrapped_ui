import { type FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils';
import geminiIcon from '/google-gemini-icon.svg';
import chesscomLogo from '/chesscom_logo_pawn_negative.svg';
import lichessLogo from '/Lichess_Logo_2019.svg';
import { Boxes } from './components/ui/background-boxes';
import { PlayerCard } from './components/ui/player-card';
import { fetchPlayerData } from './lib/mock-data';
import { Avatar } from './components/ui/avatar';

type Platform = 'chess.com' | 'lichess';

interface PlatformData {
  id: Platform;
  name: string;
  logo: string;
  username: string;
  minLength?: number;
  maxLength?: number;
}

const PLATFORM_DATA: Record<Platform, Omit<PlatformData, 'username'>> = {
  'chess.com': { 
    id: 'chess.com', 
    name: 'Chess.com', 
    logo: chesscomLogo,
    minLength: 3,
    maxLength: 25
  },
  'lichess': { 
    id: 'lichess', 
    name: 'Lichess', 
    logo: lichessLogo,
    minLength: 2,
    maxLength: 20
  }
} as const;

interface VerificationState {
  isLoading: boolean;
  playerData: Awaited<ReturnType<typeof fetchPlayerData>>;
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

const LandingPage: FC = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [usernames, setUsernames] = useState<Record<Platform, string>>({
    'chess.com': '',
    'lichess': ''
  });
  const [verificationState, setVerificationState] = useState<Record<Platform, VerificationState>>({
    'chess.com': { isLoading: false, playerData: null },
    'lichess': { isLoading: false, playerData: null }
  });
  const [confirmedPlatforms, setConfirmedPlatforms] = useState<Platform[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
    // Reset states when platform is deselected
    if (verificationState[platform].playerData) {
      setVerificationState(prev => ({ ...prev, [platform]: { isLoading: false, playerData: null } }));
    }
    if (confirmedPlatforms.includes(platform)) {
      setConfirmedPlatforms(prev => prev.filter(p => p !== platform));
    }
    setShowVerification(false);
  };

  const handleUsernameChange = (platform: Platform, username: string) => {
    setUsernames(prev => ({
      ...prev,
      [platform]: username
    }));
    // Reset verification when username changes
    if (verificationState[platform].playerData) {
      setVerificationState(prev => ({ ...prev, [platform]: { isLoading: false, playerData: null } }));
    }
    if (confirmedPlatforms.includes(platform)) {
      setConfirmedPlatforms(prev => prev.filter(p => p !== platform));
    }
    setShowVerification(false);
  };

  const handleConfirmPlayer = (platform: Platform) => {
    setConfirmedPlatforms(prev => [...prev, platform]);
  };

  const handleRejectPlayer = (platform: Platform) => {
    setVerificationState(prev => ({
      ...prev,
      [platform]: { isLoading: false, playerData: null }
    }));
    setUsernames(prev => ({ ...prev, [platform]: '' }));
    setConfirmedPlatforms(prev => prev.filter(p => p !== platform));
    setShowVerification(false);
  };

  const handleVerifyClick = async () => {
    setIsGenerating(true);
    setShowVerification(true);

    // Fetch data for all selected platforms
    await Promise.all(
      selectedPlatforms.map(async (platform) => {
        const username = usernames[platform];
        if (username.length >= PLATFORM_DATA[platform].minLength!) {
          setVerificationState(prev => ({
            ...prev,
            [platform]: { ...prev[platform], isLoading: true }
          }));

          const playerData = await fetchPlayerData(username, platform);
          
          setVerificationState(prev => ({
            ...prev,
            [platform]: { isLoading: false, playerData }
          }));
        }
      })
    );

    setIsGenerating(false);
  };

  const handleGenerate = async () => {
    // This will be replaced with actual generation logic
    console.log('Generating wrapped for:', confirmedPlatforms.map(p => ({
      platform: p,
      username: usernames[p]
    })));
  };

  const canVerify = selectedPlatforms.length > 0 && 
    selectedPlatforms.every(platform => 
      usernames[platform].length >= PLATFORM_DATA[platform].minLength!
    );

  const canGenerate = selectedPlatforms.length > 0 && 
    selectedPlatforms.every(platform => confirmedPlatforms.includes(platform));

  return (
    <div className="relative min-h-screen bg-[#030711] overflow-hidden">
      {/* Background Boxes */}
      <div className="fixed inset-0 z-10">
        <Boxes />
      </div>

      <div className="fixed inset-0 z-30 pointer-events-none">
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-1/3 aspect-square bg-gradient-to-b from-[#1e40af]/3 blur-[140px]" />
        <div className="absolute bottom-0 right-1/3 translate-x-1/2 w-1/3 aspect-square bg-gradient-to-t from-[#1e3a8a]/3 blur-[140px]" />
      </div>

      {/* Enhanced gradient overlay for better contrast */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#030711]/90 via-[#030711]/70 to-[#030711]/90 z-20 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-40 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto pointer-events-auto"
        >
          <div className={cn(
            "relative p-8 sm:p-10 rounded-3xl",
            "border-2 border-[#1e2d44]/80 bg-[#0a101f]/80 backdrop-blur-md",
            "shadow-[0_0_30px_rgba(0,0,0,0.3)]",
            "transition-all duration-300",
            "hover:shadow-[0_0_40px_rgba(0,0,0,0.4)]",
            "hover:border-[#1e2d44]"
          )}>
            <div className="relative text-center">
              <motion.h1 
                className="font-clash text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 sm:mb-10"
                variants={fadeInVariants}
              >
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/95 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                  Chess
                </span>
                <span className="text-gradient-accent bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                  Wrapped
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-default text-base sm:text-lg md:text-xl text-neutral-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2 text-shadow-sm"
              >
                Your annual chess journey, beautifully visualized. Powered by advanced AI to generate stunning, shareable stats from Chess.com and Lichess.
              </motion.p>

              <div className="flex flex-col items-center space-y-10 sm:space-y-12">
                {/* Platform Selection */}
                <motion.div 
                  variants={fadeInVariants}
                  className="flex flex-col items-center space-y-6"
                >
                  <p className="text-white font-default text-sm sm:text-base font-semibold drop-shadow-sm">
                    Select your platform(s):
                  </p>
                  <div className="flex items-center justify-center gap-4 sm:gap-6">
                    {(Object.keys(PLATFORM_DATA) as Platform[]).map((platform) => (
                      <motion.button
                        key={platform}
                        onClick={() => handlePlatformToggle(platform)}
                        className={cn(
                          "group relative flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4",
                          "rounded-xl border-2 transition-all duration-200",
                          "hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]",
                          selectedPlatforms.includes(platform)
                            ? "border-blue-400/70 bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                            : "border-[#1e2d44] hover:border-blue-400/50 bg-[#1e2d44]/30"
                        )}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <img 
                          src={PLATFORM_DATA[platform].logo} 
                          alt={PLATFORM_DATA[platform].name}
                          className="h-6 sm:h-8 w-auto drop-shadow-md"
                        />
                        <span className={cn(
                          "font-semibold transition-colors duration-200 drop-shadow-sm",
                          selectedPlatforms.includes(platform)
                            ? "text-white"
                            : "text-white/80 group-hover:text-white"
                        )}>
                          {PLATFORM_DATA[platform].name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Username Input Section */}
                <AnimatePresence mode="wait">
                  {selectedPlatforms.length > 0 && (
                    <motion.div
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="w-full max-w-md"
                    >
                      <div className="text-sm text-white font-semibold text-center mb-6 drop-shadow-sm">
                        We'll analyze your games from January 1st, 2024 onwards
                      </div>
                      <div className="space-y-8">
                        {selectedPlatforms.map((platform) => (
                          <motion.div
                            key={platform}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative group"
                          >
                            {!confirmedPlatforms.includes(platform) && (
                              <>
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-20">
                                  <img 
                                    src={PLATFORM_DATA[platform].logo} 
                                    alt={PLATFORM_DATA[platform].name} 
                                    className="h-6 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-md"
                                  />
                                </div>
                                <input
                                  type="text"
                                  placeholder={`Enter your ${PLATFORM_DATA[platform].name} username`}
                                  value={usernames[platform]}
                                  onChange={(e) => handleUsernameChange(platform, e.target.value)}
                                  disabled={verificationState[platform].isLoading}
                                  className={cn(
                                    "w-full pl-14 pr-4 py-4 rounded-xl",
                                    "bg-[#1e2d44] backdrop-blur-sm",
                                    "border-2 transition-all duration-300",
                                    "text-white text-lg placeholder-white/60",
                                    "focus:outline-none",
                                    "font-default font-medium tracking-wide",
                                    "relative z-10",
                                    "disabled:opacity-50 disabled:cursor-wait",
                                    verificationState[platform].isLoading
                                      ? "border-blue-400/80 focus:border-blue-400"
                                      : [
                                          "border-blue-400/50",
                                          "hover:border-blue-400/70",
                                          "focus:border-blue-400",
                                          "focus:shadow-[0_0_30px_rgba(96,165,250,0.4)]",
                                          "hover:shadow-[0_0_25px_rgba(96,165,250,0.3)]"
                                        ],
                                    "drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
                                    "[&::placeholder]:text-white/60",
                                    "[&::placeholder]:font-normal",
                                    "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                                  )}
                                  maxLength={PLATFORM_DATA[platform].maxLength}
                                  aria-label={`${PLATFORM_DATA[platform].name} username`}
                                />
                              </>
                            )}

                            <AnimatePresence mode="wait">
                              {verificationState[platform].isLoading && (
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

                              {showVerification && verificationState[platform].playerData === null && !verificationState[platform].isLoading && usernames[platform].length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="mt-3"
                                >
                                  <PlayerCard
                                    player={null}
                                    platformLogo={PLATFORM_DATA[platform].logo}
                                    onConfirm={() => handleConfirmPlayer(platform)}
                                    onReject={() => handleRejectPlayer(platform)}
                                    searchedUsername={usernames[platform]}
                                  />
                                </motion.div>
                              )}

                              {showVerification && verificationState[platform].playerData && !confirmedPlatforms.includes(platform) && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="mt-3"
                                >
                                  <PlayerCard
                                    player={verificationState[platform].playerData}
                                    platformLogo={PLATFORM_DATA[platform].logo}
                                    onConfirm={() => handleConfirmPlayer(platform)}
                                    onReject={() => handleRejectPlayer(platform)}
                                  />
                                </motion.div>
                              )}

                              {confirmedPlatforms.includes(platform) && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center gap-3 bg-[#1e2d44]/80 backdrop-blur-sm rounded-lg border-2 border-green-500/50 p-3 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                                >
                                  <Avatar
                                    src={verificationState[platform].playerData?.avatar}
                                    alt={verificationState[platform].playerData?.username || platform}
                                    fallback={verificationState[platform].playerData?.username?.[0].toUpperCase() || '?'}
                                    size="sm"
                                  />
                                  <div className="flex-1">
                                    <p className="text-sm font-semibold text-white drop-shadow-sm">
                                      {verificationState[platform].playerData?.username}
                                    </p>
                                    <p className="text-xs font-medium text-white/80">
                                      Account verified
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => handleRejectPlayer(platform)}
                                    className="text-xs font-medium text-white/80 hover:text-white transition-colors duration-200"
                                  >
                                    Change
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <AnimatePresence mode="wait">
                  {selectedPlatforms.length > 0 && (
                    <motion.div
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex flex-col items-center gap-4"
                    >
                      <motion.button
                        onClick={!showVerification ? handleVerifyClick : handleGenerate}
                        disabled={!showVerification ? !canVerify || isGenerating : !canGenerate}
                        className={cn(
                          "group relative inline-flex items-center justify-center gap-2",
                          "px-6 sm:px-8 py-3 overflow-hidden rounded-lg",
                          "transition-all duration-300 ease-out",
                          "font-default text-base sm:text-lg font-semibold",
                          (!showVerification ? canVerify : canGenerate) && !isGenerating
                            ? "bg-gradient-accent text-white hover:scale-[1.02] shadow-[0_2px_20px_rgba(30,64,175,0.3)] hover:shadow-[0_4px_24px_rgba(30,64,175,0.4)]"
                            : "bg-[#1e2d44]/50 text-neutral-400 cursor-not-allowed"
                        )}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        {isGenerating ? (
                          <>
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
                            <span>{!showVerification ? 'Verifying...' : 'Generating...'}</span>
                          </>
                        ) : (
                          'Generate Your Wrapped'
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Powered by Section */}
                <div className="flex items-center space-x-3 pt-2">
                  <span className="text-neutral-400 font-default text-xs sm:text-sm">Powered by</span>
                  <div className="flex items-center space-x-2 glass-effect rounded-lg px-3 py-1.5 sm:py-2 shadow-lg">
                    <img src={geminiIcon} alt="Google Gemini" className="h-4 sm:h-5 w-auto" />
                    <span className="text-neutral-300 font-medium text-xs sm:text-sm">Gemini</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage; 