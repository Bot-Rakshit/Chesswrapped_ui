"use client";

import React, { useState, useCallback } from "react";
import { cn } from "../../utils";

export const BoxesCore = ({ className, ...props }: { className?: string }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rows = new Array(12).fill(1);
  const cols = new Array(12).fill(1);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full bg-transparent flex flex-col pointer-events-none overflow-hidden",
        "before:fixed before:inset-0 before:bg-gradient-to-b before:from-blue-800/50 before:via-blue-700/40 before:to-neutral-900/60 before:blur-[100px] before:pointer-events-none",
        "after:fixed after:inset-0 after:bg-gradient-to-tr after:from-blue-400/30 after:via-blue-300/35 after:to-blue-500/40 after:blur-[100px] after:pointer-events-none",
        "perspective-[1000px] select-none touch-none",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full">
        {rows.map((_, i) => (
          <div
            key={`row-${i}`}
            className="w-full h-[calc(100%/12)] flex"
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
                <div
                  key={`col-${j}`}
                  className={cn(
                    "w-[calc(100%/12)] h-full relative",
                    "transition-all duration-300 ease-out will-change-transform",
                    "hover:z-50",
                    "pointer-events-auto",
                    "border-[1px]",
                    isEvenSquare
                      ? "border-blue-500/80"
                      : "border-neutral-500/80",
                    "shadow-lg",
                    isEvenSquare
                      ? "shadow-blue-600/50"
                      : "shadow-neutral-600/50",
                    isEvenSquare 
                      ? depth === 0 
                        ? "bg-blue-600/70"
                        : "bg-blue-500/60"
                      : depth === 0
                        ? "bg-neutral-600/70"
                        : "bg-neutral-500/60",
                    isHovered 
                      ? "scale-110 border-blue-300/90 shadow-blue-200/50" 
                      : isNeighbor 
                        ? isEvenSquare
                          ? "scale-105 border-blue-400/80 shadow-blue-300/40"
                          : "scale-105 border-neutral-400/80 shadow-blue-300/40"
                        : "scale-100"
                  )}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform: isHovered ? 'scale(1.1)' : isNeighbor ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.2s ease-out',
                    willChange: 'transform',
                  }}
                >
                  <div
                    className={cn(
                      "absolute inset-0",
                      "bg-gradient-to-br",
                      isHovered 
                        ? "from-blue-200/50 via-blue-300/50 to-blue-400/60"
                        : isEvenSquare
                          ? depth === 0
                            ? "from-blue-500/70 via-blue-600/80 to-blue-700/90"
                            : "from-blue-500/60 via-blue-600/70 to-blue-700/80"
                          : depth === 0
                            ? "from-neutral-500/70 via-neutral-600/80 to-neutral-700/90"
                            : "from-neutral-500/60 via-neutral-600/70 to-neutral-700/80",
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
                  />
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-blue-300/30 blur-xl" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/35 via-blue-300/40 to-blue-400/45" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-200/30 to-blue-100/35" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Boxes = React.memo(BoxesCore); 