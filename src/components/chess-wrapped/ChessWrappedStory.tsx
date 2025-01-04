import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/utils";
import { MultiStepLoader } from "../ui/multi-step-loader";

const loadingStates = [
  { text: "Analyzing your games..." },
  { text: "Calculating your best moves..." },
  { text: "Finding your favorite openings..." },
  { text: "Discovering your playing style..." },
  { text: "Counting your victories..." },
  { text: "Measuring your progress..." },
  { text: "Preparing your chess journey..." },
  { text: "Almost ready..." },
];

const storyCards = [
  {
    id: "games-played",
    background: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
    pattern: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1%, transparent 1%) 0 0/8px 8px",
  },
  {
    id: "favorite-opening",
    background: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700",
    pattern: "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent) 0 0/20px 20px",
  },
  {
    id: "win-rate",
    background: "bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700",
    pattern: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 1px, transparent 1px) 0 0/15px 15px",
  },
  {
    id: "best-game",
    background: "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700",
    pattern: "linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px) 0 0/20px 20px, linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px) 0 0/20px 20px",
  },
  {
    id: "rating-progress",
    background: "bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700",
    pattern: "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2) 1px, transparent 1px) 0 0/20px 20px",
  },
  {
    id: "time-control",
    background: "bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700",
    pattern: "linear-gradient(45deg, rgba(255,255,255,0.1) 2px, transparent 2px) 0 0/10px 10px",
  },
];

export const ChessWrappedStory = () => {
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, loadingStates.length * 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentCardIndex < storyCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  // Hide floating dock when story is visible
  useEffect(() => {
    const dock = document.querySelector('[data-floating-dock]');
    if (dock) {
      dock.classList.toggle('hidden', isVisible);
    }
  }, [isVisible]);

  if (loading) {
    return <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={2000} />;
  }

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center">
      <div className="relative w-full h-full md:w-auto md:h-auto flex items-center justify-center">
        {/* Story Container - Fixed aspect ratio */}
        <div className="relative md:h-[85vh] aspect-[9/16] bg-black shadow-2xl">
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
                  "w-full h-full relative overflow-hidden rounded-none md:rounded-2xl",
                  storyCards[currentCardIndex].background
                )}
              >
                {/* Pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{ backgroundImage: storyCards[currentCardIndex].pattern }}
                />

                {/* Chess piece silhouettes */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-[10%] left-[10%] w-24 h-24">
                    {/* Knight silhouette SVG */}
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 22H5v-2h14v2M13 2c-1.25 0-2.42.62-3.11 1.66L7 8l2 2 2.06-1.37c.44-.31 1.08-.19 1.39.27.02.03.05.06.07.08l1.04 1.57c.36.54.22 1.27-.32 1.63l-2.79 1.86L8 16l-3.78 4.78C3.82 21.22 4.12 22 4.67 22h14.67c.55 0 .85-.78.45-1.22L16 16l-2.45-1.96c-.54-.36-.68-1.09-.32-1.63l1.04-1.57c.36-.54 1.09-.68 1.63-.32l2.06 1.37 2-2-2.89-4.34C16.42 2.62 15.25 2 14 2h-1z"/>
                    </svg>
                  </div>
                  <div className="absolute bottom-[20%] right-[15%] w-32 h-32">
                    {/* Queen silhouette SVG */}
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 3a2 2 0 0 1 2 2c0 .81-.5 1.5-1.17 1.82L17 17h-2l-1.83-10.18A2 2 0 0 1 12 5a2 2 0 0 1-1.17 1.82L9 17H7L5.17 6.82A2 2 0 0 1 4 5a2 2 0 0 1 4 0c0 .81-.5 1.5-1.17 1.82L8 17h8l1.17-10.18A2 2 0 0 1 16 5a2 2 0 0 1 2-2z"/>
                    </svg>
                  </div>
                </div>

                {/* Navigation buttons */}
                <div className="absolute inset-x-0 top-0 h-full flex items-center justify-between px-4">
                  <button
                    onClick={handlePrevious}
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
                  onClick={() => setIsVisible(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}; 