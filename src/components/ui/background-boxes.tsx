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
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-blue-800/40 before:via-blue-700/30 before:to-neutral-900/50 before:blur-[100px] before:pointer-events-none",
        "after:absolute after:inset-0 after:bg-gradient-to-tr after:from-blue-400/20 after:via-blue-300/25 after:to-blue-500/30 after:blur-[100px] after:pointer-events-none",
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
            const depth = Math.abs(((i + j) % 3) - 1);

            return (
              <motion.div
                key={`col-${j}`}
                className={cn(
                  "w-[calc(100%/12)] h-full relative cursor-pointer",
                  "transition-all duration-300 ease-out",
                  "hover:z-50",
                  "pointer-events-auto",
                  "border-[1px]",
                  isEvenSquare
                    ? "border-blue-600/70"
                    : "border-neutral-600/70",
                  "shadow-lg",
                  isEvenSquare
                    ? "shadow-blue-700/40"
                    : "shadow-neutral-700/40",
                  isEvenSquare 
                    ? depth === 0 
                      ? "bg-blue-700/60"
                      : "bg-blue-600/50"
                    : depth === 0
                      ? "bg-neutral-700/60"
                      : "bg-neutral-600/50",
                  isHovered 
                    ? "scale-110 border-blue-400/80 shadow-blue-300/40" 
                    : isNeighbor 
                      ? isEvenSquare
                        ? "scale-105 border-blue-500/70 shadow-blue-400/30"
                        : "scale-105 border-neutral-500/70 shadow-blue-400/30"
                      : "scale-100"
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, scale: 0.8, rotateX: -10, rotateY: -10 }}
                animate={{ 
                  opacity: 1,
                  scale: isHovered ? 1.1 : isNeighbor ? 1.05 : 1,
                  rotateX: isHovered ? 8 : isNeighbor ? 4 : 0,
                  rotateY: isHovered ? 8 : isNeighbor ? 4 : 0,
                  z: isHovered ? 50 : isNeighbor ? 30 : depth * 10,
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
                      ? "from-blue-300/40 via-blue-400/40 to-blue-500/50"
                      : isEvenSquare
                        ? depth === 0
                          ? "from-blue-600/60 via-blue-700/70 to-blue-800/80"
                          : "from-blue-600/50 via-blue-700/60 to-blue-800/70"
                        : depth === 0
                          ? "from-neutral-600/60 via-neutral-700/70 to-neutral-800/80"
                          : "from-neutral-600/50 via-neutral-700/60 to-neutral-800/70",
                    "transition-all duration-300",
                    "pointer-events-none",
                    isEvenSquare
                      ? "shadow-[inset_0_0_20px_rgba(29,78,216,0.6)]"
                      : "shadow-[inset_0_0_20px_rgba(64,64,64,0.6)]",
                    isEvenSquare
                      ? "after:absolute after:inset-0 after:shadow-[0_8px_20px_rgba(29,78,216,0.7)]"
                      : "after:absolute after:inset-0 after:shadow-[0_8px_20px_rgba(64,64,64,0.7)]",
                    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-300/30 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300",
                    isHovered && "before:opacity-100"
                  )}
                  animate={{
                    opacity: isHovered ? 1 : isNeighbor ? 0.95 : 0.9,
                  }}
                />
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute inset-0 bg-blue-300/30 blur-xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200/35 via-blue-300/40 to-blue-400/45" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-200/30 to-blue-100/35" />
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