"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "../../utils";

export const BoxesCore = ({ className, ...props }: { className?: string }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rows = new Array(12).fill(1);
  const cols = new Array(12).fill(1);

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full bg-transparent flex flex-col pointer-events-auto",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-blue-500/10 before:via-blue-500/15 before:to-blue-600/25 before:blur-[100px] before:pointer-events-none",
        "after:absolute after:inset-0 after:bg-gradient-to-tr after:from-blue-500/5 after:via-blue-500/10 after:to-blue-400/15 after:blur-[100px] after:pointer-events-none",
        "perspective-[1000px]",
        className
      )}
      {...props}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className="w-full h-[calc(100%/12)] flex"
          initial={{ opacity: 0, x: -10, rotateX: -20 }}
          animate={{ opacity: 1, x: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
          }}
        >
          {cols.map((_, j) => {
            const index = i * cols.length + j;
            const isHovered = hoveredIndex === index;
            const isEvenSquare = (i + j) % 2 === 0;
            const neighborIndices = [
              index - cols.length - 1, index - cols.length, index - cols.length + 1,
              index - 1,                                    index + 1,
              index + cols.length - 1, index + cols.length, index + cols.length + 1
            ];
            const isNeighbor = hoveredIndex !== null && neighborIndices.includes(hoveredIndex);
            const depth = Math.abs(((i + j) % 3) - 1); // Creates a repeating 0,1,0 pattern for depth

            return (
              <motion.div
                key={`col-${j}`}
                className={cn(
                  "w-[calc(100%/12)] h-full relative cursor-pointer",
                  "transition-all duration-300 ease-out",
                  "hover:z-50",
                  "pointer-events-auto",
                  "border-[1.5px] border-blue-500/40",
                  "shadow-lg shadow-blue-900/20",
                  isEvenSquare 
                    ? depth === 0 
                      ? "bg-blue-900/40"
                      : "bg-blue-800/30"
                    : depth === 0
                      ? "bg-blue-900/30"
                      : "bg-blue-950/20",
                  isHovered 
                    ? "scale-110 border-blue-400/70" 
                    : isNeighbor 
                      ? "scale-105 border-blue-500/50" 
                      : "scale-100"
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, scale: 0.8, rotateX: -10, rotateY: -10 }}
                animate={{ 
                  opacity: 1,
                  scale: isHovered ? 1.1 : isNeighbor ? 1.05 : 1,
                  rotateX: isHovered ? 10 : 0,
                  rotateY: isHovered ? 10 : 0,
                  z: isHovered ? 50 : depth * 10, // Increased depth effect
                }}
                transition={{
                  duration: 0.2,
                  delay: j * 0.05,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div
                  className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-br",
                    isHovered 
                      ? isEvenSquare 
                        ? "from-blue-400/50 via-blue-500/50 to-blue-600/60"
                        : "from-blue-400/40 via-blue-500/40 to-blue-600/50"
                      : depth === 0
                        ? "from-blue-500/20 via-blue-400/25 to-blue-600/35"
                        : "from-blue-400/15 via-blue-500/20 to-blue-600/30",
                    "transition-all duration-300",
                    "pointer-events-none",
                    "shadow-[inset_0_0_20px_rgba(59,130,246,0.3)]",
                    "after:absolute after:inset-0 after:shadow-[0_8px_20px_rgba(59,130,246,0.4)]",
                    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-400/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300",
                    isHovered && "before:opacity-100"
                  )}
                  animate={{
                    opacity: isHovered ? 1 : isNeighbor ? 0.9 : 0.7,
                  }}
                />
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-blue-500/35 to-blue-600/40" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/20 to-blue-300/30" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore); 