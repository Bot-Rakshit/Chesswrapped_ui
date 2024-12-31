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
        "before:fixed before:inset-0 before:bg-gradient-to-b before:from-green-500/50 before:via-green-400/40 before:to-neutral-900/60 before:blur-[100px] before:pointer-events-none",
        "after:fixed after:inset-0 after:bg-gradient-to-tr after:from-green-400/30 after:via-white/35 after:to-emerald-400/40 after:blur-[100px] after:pointer-events-none",
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
                      ? "border-green-400/80"
                      : "border-white/80",
                    "shadow-lg",
                    isEvenSquare
                      ? "shadow-green-500/50"
                      : "shadow-white/50",
                    isEvenSquare 
                      ? depth === 0 
                        ? "bg-green-500/70"
                        : "bg-green-400/60"
                      : depth === 0
                        ? "bg-white/70"
                        : "bg-white/60",
                    isHovered 
                      ? "scale-110 border-green-200/90 shadow-green-100/50" 
                      : isNeighbor 
                        ? isEvenSquare
                          ? "scale-105 border-green-300/80 shadow-green-200/40"
                          : "scale-105 border-white/80 shadow-green-200/40"
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
                        ? "from-green-100/50 via-white/50 to-green-300/60"
                        : isEvenSquare
                          ? depth === 0
                            ? "from-green-400/70 via-green-500/80 to-green-600/90"
                            : "from-green-400/60 via-green-500/70 to-green-600/80"
                          : depth === 0
                            ? "from-white/70 via-white/80 to-neutral-100/90"
                            : "from-white/60 via-white/70 to-neutral-100/80",
                      "transition-all duration-300",
                      "pointer-events-none",
                      isEvenSquare
                        ? "shadow-[inset_0_0_20px_rgba(34,197,94,0.6)]"
                        : "shadow-[inset_0_0_20px_rgba(255,255,255,0.6)]",
                      isEvenSquare
                        ? "after:absolute after:inset-0 after:shadow-[0_8px_20px_rgba(34,197,94,0.7)]"
                        : "after:absolute after:inset-0 after:shadow-[0_8px_20px_rgba(255,255,255,0.7)]",
                      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-200/30 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300",
                      isHovered && "before:opacity-100"
                    )}
                  />
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-green-200/30 blur-xl" />
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100/35 via-white/40 to-green-300/45" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-green-100/30 to-white/35" />
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