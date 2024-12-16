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
import { FloatingDock } from '@/components/ui/floating-dock';
import {
  IconHome,
  IconBrandGithub,
  IconBrandTwitter,
  IconInfoCircle,
} from '@tabler/icons-react';

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
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [showYearSelect, setShowYearSelect] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [verificationState, setVerificationState] = useState<VerificationState>({
    isLoading: false,
    playerData: null
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handlePlatformSelect = (platform: Platform) => {
    if (selectedPlatform === platform) {
      setSelectedPlatform(null);
      setUsername('');
      setVerificationState({ isLoading: false, playerData: null });
      setIsConfirmed(false);
      setShowVerification(false);
    } else {
      setSelectedPlatform(platform);
      setUsername('');
      setVerificationState({ isLoading: false, playerData: null });
      setIsConfirmed(false);
      setShowVerification(false);
    }
  };

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
    if (!selectedPlatform) return;
    
    setIsGenerating(true);
    setShowVerification(true);

    setVerificationState({ isLoading: true, playerData: null });
    const playerData = await fetchPlayerData(username, selectedPlatform);
    setVerificationState({ isLoading: false, playerData });

    setIsGenerating(false);
  };

  const handleGenerate = async () => {
    if (!selectedPlatform) return;
    // This will be replaced with actual generation logic
    console.log('Generating wrapped for:', {
      platform: selectedPlatform,
      username: username
    });
  };

  const canVerify = selectedPlatform && 
    username.length >= PLATFORM_DATA[selectedPlatform].minLength!;

  const canGenerate = selectedPlatform && isConfirmed;

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
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
      <div className="absolute inset-0 z-40 flex items-start justify-center px-4 sm:px-6 pointer-events-none overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto pointer-events-auto py-8 md:py-12"
        >
          <div className={cn(
            "relative p-8 sm:p-10 rounded-3xl mb-24 md:mb-32",
            "border-2 border-[#1e2d44]/90 bg-[#0a101f]/90 backdrop-blur-md",
            "shadow-[0_0_30px_rgba(0,0,0,0.4)]",
            "transition-all duration-300",
            "hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]",
            "hover:border-[#1e2d44]"
          )}>
            <div className="relative text-center">
              <motion.h1 
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 sm:mb-10 relative group w-full flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative inline-flex items-center justify-center flex-wrap">
                  <motion.div 
                    className="relative px-2 py-1 mx-auto"
                    whileHover={{ y: -4, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-neutral-100 rounded-xl transform rotate-1" />
                    <span className="relative text-[#030711] font-black tracking-tighter whitespace-nowrap">
                      Chess
                    </span>
                  </motion.div>
                  <motion.div 
                    className="relative px-2 py-1 -ml-1"
                    whileHover={{ y: -4, rotate: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl transform -rotate-1" />
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
                className="font-default text-base sm:text-lg md:text-xl text-white/95 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]"
              >
                Your chess journey, beautifully captured. Share your stats!
              </motion.p>

              <div className="flex flex-col items-center space-y-10 sm:space-y-12">
                {/* Platform Selection */}
                <motion.div 
                  variants={fadeInVariants}
                  className="flex flex-col items-center space-y-6"
                >
                  <p className="text-white font-default text-sm sm:text-base font-semibold drop-shadow-sm">
                    Select your platform:
                  </p>
                  <div className="flex items-center justify-center gap-4 sm:gap-6">
                    {(Object.keys(PLATFORM_DATA) as Platform[]).map((platform) => (
                      <motion.button
                        key={platform}
                        onClick={() => handlePlatformSelect(platform)}
                        className={cn(
                          "group relative flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4",
                          "rounded-xl border-2 transition-all duration-200",
                          "hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]",
                          selectedPlatform === platform
                            ? "border-blue-400/80 bg-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                            : "border-[#1e2d44] hover:border-blue-400/60 bg-[#1e2d44]/40"
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
                          selectedPlatform === platform
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
                  {selectedPlatform && (
                    <motion.div
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="w-full max-w-md"
                    >
                      <div className="text-sm text-white font-semibold text-center mb-6 drop-shadow-sm flex items-center justify-center gap-2">
                        We'll analyze your games from January 1st, {selectedYear} onwards
                        {isConfirmed && (
                          <button
                            onClick={() => setShowYearSelect(true)}
                            className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 underline underline-offset-2"
                          >
                            Change
                          </button>
                        )}
                      </div>

                      {/* Year Selection Modal */}
                      <AnimatePresence>
                        {showYearSelect && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              className={cn(
                                "relative p-6 rounded-2xl",
                                "border-2 border-[#1e2d44]/80 bg-[#0a101f]/95 backdrop-blur-md",
                                "shadow-[0_0_30px_rgba(0,0,0,0.3)]",
                                "max-w-sm w-full"
                              )}
                            >
                              <div className="text-center mb-6">
                                <h3 className="text-lg font-semibold text-white mb-2">Select Year</h3>
                                <p className="text-sm text-neutral-400">Choose which year you want to analyze</p>
                              </div>
                              <div className="flex flex-col gap-3">
                                {[2024, 2023, 2022].map((year) => (
                                  <button
                                    key={year}
                                    onClick={() => {
                                      handleYearChange(year);
                                      setShowYearSelect(false);
                                    }}
                                    className={cn(
                                      "w-full py-3 px-4 rounded-xl transition-all duration-200",
                                      "border-2",
                                      selectedYear === year
                                        ? "border-blue-400/70 bg-blue-500/20 text-white"
                                        : "border-[#1e2d44] hover:border-blue-400/50 bg-[#1e2d44]/30 text-white/80 hover:text-white"
                                    )}
                                  >
                                    <span className="font-semibold">{year}</span>
                                  </button>
                                ))}
                              </div>
                              <button
                                onClick={() => setShowYearSelect(false)}
                                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-200"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="space-y-8">
                        {!isConfirmed && (
                          <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-20">
                              <img 
                                src={PLATFORM_DATA[selectedPlatform].logo} 
                                alt={PLATFORM_DATA[selectedPlatform].name} 
                                className="h-6 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-md"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder={`Enter your ${PLATFORM_DATA[selectedPlatform].name} username`}
                              value={username}
                              onChange={(e) => handleUsernameChange(e.target.value)}
                              disabled={verificationState.isLoading}
                              className={cn(
                                "w-full pl-14 pr-4 py-4 rounded-xl",
                                "bg-[#1e2d44]/90 backdrop-blur-sm",
                                "border-2 transition-all duration-300",
                                "text-white text-lg placeholder-white/70",
                                "focus:outline-none",
                                "font-default font-medium tracking-wide",
                                "relative z-10",
                                "disabled:opacity-50 disabled:cursor-wait",
                                verificationState.isLoading
                                  ? "border-blue-400/90 focus:border-blue-400"
                                  : [
                                      "border-blue-400/60",
                                      "hover:border-blue-400/80",
                                      "focus:border-blue-400",
                                      "focus:shadow-[0_0_30px_rgba(96,165,250,0.5)]",
                                      "hover:shadow-[0_0_25px_rgba(96,165,250,0.4)]"
                                    ],
                                "drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
                                "[&::placeholder]:text-white/60",
                                "[&::placeholder]:font-normal",
                                "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                              )}
                              maxLength={PLATFORM_DATA[selectedPlatform].maxLength}
                              aria-label={`${PLATFORM_DATA[selectedPlatform].name} username`}
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
                              className="mt-3"
                            >
                              <PlayerCard
                                player={null}
                                platformLogo={PLATFORM_DATA[selectedPlatform].logo}
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
                              className="mt-3"
                            >
                              <PlayerCard
                                player={verificationState.playerData}
                                platformLogo={PLATFORM_DATA[selectedPlatform].logo}
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
                              className="flex items-center gap-3 bg-[#1e2d44]/90 backdrop-blur-sm rounded-lg border-2 border-green-400/60 p-3 shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                            >
                              <Avatar
                                src={verificationState.playerData?.avatar}
                                alt={verificationState.playerData?.username || selectedPlatform}
                                fallback={verificationState.playerData?.username?.[0].toUpperCase() || '?'}
                                size="sm"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-white drop-shadow-sm">
                                  {verificationState.playerData?.username}
                                </p>
                                <p className="text-xs font-medium text-white/90">
                                  Account verified
                                </p>
                              </div>
                              <button
                                onClick={handleRejectPlayer}
                                className="text-xs font-medium text-white/80 hover:text-white transition-colors duration-200"
                              >
                                Change
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <AnimatePresence mode="wait">
                  {selectedPlatform && (
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
                            ? [
                                "bg-white text-[#030711]",
                                "hover:scale-[1.02]",
                                "shadow-[0_0_20px_rgba(59,130,246,0.5)]",
                                "hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]",
                                "border border-blue-200/30"
                              ]
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