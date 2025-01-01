import { type FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';
import geminiIcon from '/google-gemini-icon.svg';
import chesscomLogo from '/chesscom_logo_pawn_negative.svg';
import { Boxes } from '@/components/ui/background-boxes';
import PlayerCard from '@/components/ui/player-card';
import { ChessService } from '@/services/chess.service';
import { APIError } from '@/lib/axios';
import { Avatar } from '@/components/ui/avatar';
import { FloatingDock } from '@/components/ui/floating-dock';
import { navigationItems } from '@/constants/navigation';
import type { VerificationState } from '@/types/domain.types';

const LandingPage: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [verificationState, setVerificationState] = useState<VerificationState>({
    isLoading: false,
    playerData: null
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (verificationState.playerData) {
      setVerificationState({ isLoading: false, playerData: null });
    }
    setIsConfirmed(false);
    setShowVerification(false);
    setError(null);
  };

  const handleConfirmPlayer = () => {
    setIsConfirmed(true);
  };

  const handleRejectPlayer = () => {
    setVerificationState({ isLoading: false, playerData: null });
    setUsername('');
    setIsConfirmed(false);
    setShowVerification(false);
    setError(null);
  };

  const handleVerifyClick = async () => {
    setShowVerification(true);
    setVerificationState({ isLoading: true, playerData: null });
    setError(null);
    
    try {
      const playerData = await ChessService.verifyUser(username);
      setVerificationState({ isLoading: false, playerData });
    } catch (err) {
      if (err instanceof APIError) {
        switch (err.code) {
          case 'UNAUTHORIZED':
            setError('API key is invalid or missing');
            break;
          case 'NETWORK_ERROR':
            setError('Failed to connect to the server');
            break;
          default:
            setError('An unexpected error occurred');
        }
      } else {
        setError('An unexpected error occurred');
      }
      setVerificationState({ isLoading: false, playerData: null });
    }
  };

  const handleGenerate = async () => {
    setVerificationState(state => ({ ...state, isLoading: true }));
    // This will be replaced with actual generation logic
    console.log('Generating wrapped for:', {
      username: username
    });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setVerificationState(state => ({ ...state, isLoading: false }));
  };

  return (
    <div className="fixed inset-0 bg-[#0a1628] overflow-hidden">
      {/* Background Boxes */}
      <div className="absolute inset-0 z-10">
        <Boxes />
      </div>

      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-1/2 sm:w-1/3 aspect-square bg-gradient-to-b from-blue-600/20 blur-[140px]" />
        <div className="absolute bottom-0 right-1/3 translate-x-1/2 w-1/2 sm:w-1/3 aspect-square bg-gradient-to-t from-blue-400/20 blur-[140px]" />
      </div>

      {/* Enhanced gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/90 via-[#0a1628]/70 to-[#0a1628]/90 z-20 pointer-events-none" />

      {/* Main Content */}
      <div className="absolute inset-0 z-40 flex items-center justify-center px-3 xs:px-4 sm:px-6 pointer-events-none overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl mx-auto pointer-events-auto py-6 xs:py-8 sm:py-12 md:py-16"
        >
          {/* Title Section - Outside content box for better contrast */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center w-full mb-6 xs:mb-8 sm:mb-10 gap-2 xs:gap-3 sm:gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-blue-500/50 to-blue-600/50 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-500 text-white px-4 xs:px-5 py-1.5 xs:py-2 sm:px-8 sm:py-4 rounded-2xl font-display text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-black shadow-[0_0_40px_rgba(59,130,246,0.4)] relative">
                Chess
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-blue-500/50 to-blue-600/50 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-500 text-white px-4 xs:px-5 py-1.5 xs:py-2 sm:px-8 sm:py-4 rounded-2xl font-display text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-black shadow-[0_0_40px_rgba(59,130,246,0.4)] relative">
                Wrapped
              </div>
            </div>
          </motion.div>

          <div className={cn(
            "relative p-6 xs:p-8 sm:p-10 md:p-12 rounded-[2rem]",
            "border-2 border-blue-500/30",
            "bg-gradient-to-b from-blue-950/90 via-[#0a1628]/95 to-blue-950/90 backdrop-blur-xl",
            "shadow-[0_0_60px_rgba(59,130,246,0.15)]",
            "transition-all duration-500",
            "hover:shadow-[0_0_80px_rgba(59,130,246,0.2)]",
            "hover:border-blue-500/40",
            "group"
          )}>
            {/* Subtle animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-blue-500/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white/90 text-base xs:text-lg sm:text-xl mb-8 xs:mb-10 max-w-xl mx-auto leading-relaxed font-medium px-1"
              >
                Your Chess.com journey, beautifully captured. Share your stats!
              </motion.p>

              <div className="text-sm sm:text-base text-white/70 mb-4 xs:mb-6 font-medium">
                Enter your Chess.com username to get started
              </div>

              {/* Input Section */}
              <div className="space-y-4 xs:space-y-6 max-w-md mx-auto">
                {!isConfirmed && (
                  <div className="relative group">
                    {/* Glowing effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500" />
                    
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <div className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-20">
                      <img 
                        src={chesscomLogo} 
                        alt="Chess.com" 
                        className="h-4 xs:h-5 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your Chess.com username"
                      value={username}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                      disabled={verificationState.isLoading}
                      className={cn(
                        "w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-3 xs:py-4 rounded-xl",
                        "bg-[#0a1628]",
                        "border-2 border-blue-500/40",
                        "text-sm xs:text-base text-white",
                        "placeholder-white/30",
                        "focus:outline-none focus:border-blue-400/80 focus:bg-[#0a1628]",
                        "transition-all duration-300",
                        "disabled:opacity-50 disabled:cursor-wait",
                        "group-hover:border-blue-400/60",
                        "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]",
                        "relative z-10",
                        "focus:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
                        "group-hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]"
                      )}
                      maxLength={25}
                      aria-label="Chess.com username"
                    />
                  </div>
                )}

                {/* Verification States */}
                <AnimatePresence mode="wait">
                  {error && !verificationState.isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm"
                    >
                      {error}
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
                      className="flex items-center gap-3 bg-gradient-to-r from-[#0a1628]/95 to-[#0a1628]/98 backdrop-blur-md rounded-lg border-2 border-blue-400/30 p-3 shadow-[0_4px_12px_rgba(59,130,246,0.15)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.2)] hover:border-blue-400/40 transition-all duration-300"
                    >
                      <div className="relative">
                        <Avatar
                          src={verificationState.playerData?.avatar}
                          alt={verificationState.playerData?.username || 'Chess.com'}
                          fallback={verificationState.playerData?.username?.[0].toUpperCase() || '?'}
                          size="sm"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-sky-400 rounded-full border-2 border-[#0a1628] flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white drop-shadow-sm">
                          {verificationState.playerData?.username}
                        </p>
                        <p className="text-xs font-medium text-sky-400/90">
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

                {/* Action Button */}
                {username.length >= 3 && (
                  <motion.button
                    onClick={!showVerification ? handleVerifyClick : handleGenerate}
                    disabled={verificationState.isLoading || (showVerification && !isConfirmed)}
                    className={cn(
                      "w-full py-3 xs:py-3.5 rounded-xl font-medium text-sm xs:text-base",
                      "transition-all duration-200",
                      (!verificationState.isLoading && (!showVerification || isConfirmed))
                        ? [
                            "bg-blue-500 hover:bg-blue-600",
                            "text-white",
                            "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
                            "hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]",
                            "border border-blue-400/30"
                          ]
                        : "bg-blue-950/80 text-white/40 cursor-not-allowed border border-blue-500/20"
                    )}
                  >
                    {verificationState.isLoading ? (
                      <div className="flex items-center justify-center gap-2">
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
                )}
              </div>

              {/* Powered by Section */}
              <div className="mt-6 xs:mt-8 flex items-center justify-center gap-1.5 xs:gap-2 text-xs xs:text-sm">
                <span className="text-white/60">Powered by</span>
                <div className="flex items-center gap-1.5 xs:gap-2 bg-blue-950/80 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:border-blue-400/40 transition-all duration-300">
                  <img src={geminiIcon} alt="Google Gemini" className="h-4 xs:h-5 w-auto" />
                  <span className="text-white/90 font-medium">Gemini</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Dock - Added bottom margin for mobile */}
      <div className="pb-20 md:pb-0">
        <FloatingDock
          items={navigationItems}
          mobileClassName="absolute bottom-4 left-1/2 -translate-x-1/2 z-50"
          desktopClassName="absolute bottom-4 left-1/2 -translate-x-1/2 z-50"
        />
      </div>
    </div>
  );
};

export default LandingPage; 