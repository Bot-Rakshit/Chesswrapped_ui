import { motion } from "framer-motion";
import { cn } from "@/utils";

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 2000,
}: {
  loadingStates: { text: string }[];
  loading: boolean;
  duration?: number;
}) => {
  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a1628]/95 backdrop-blur-md"
    >
      <div className="w-full max-w-xl mx-auto px-4">
        <div className="relative">
          {/* Loading states */}
          {loadingStates.map((state, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: duration / 1000,
                delay: (idx * duration) / 1000,
                ease: "easeInOut",
              }}
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "text-lg xs:text-xl sm:text-2xl font-medium text-white/90",
                "text-center"
              )}
              style={{
                animation: `fadeInOut ${duration}ms ${
                  (idx * duration) / 1000
                }ms forwards`,
              }}
            >
              {state.text}
            </motion.div>
          ))}

          {/* Loading bar */}
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: (loadingStates.length * duration) / 1000,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Add keyframes for fade in/out animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeInOut {
    0%, 100% { opacity: 0; transform: translateY(10px); }
    25%, 75% { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style); 