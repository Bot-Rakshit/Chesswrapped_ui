"use client";

import React, { useState, useCallback, useEffect } from "react";
import { cn } from "../../utils";

const useGridDimensions = (squareSize: number = 50) => {
  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const cols = Math.ceil(window.innerWidth / squareSize);
      const rows = Math.ceil(window.innerHeight / squareSize);
      setDimensions({ rows, cols });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [squareSize]);

  return dimensions;
};

export const BoxesCore = ({ className, ...props }: { className?: string }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { rows, cols } = useGridDimensions(80); // Increased square size from 40 to 80 pixels
  const rowsArray = new Array(rows).fill(1);
  const colsArray = new Array(cols).fill(1);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-full bg-transparent pointer-events-none overflow-hidden",
        "before:fixed before:inset-0 before:bg-gradient-to-b before:from-blue-900/30 before:via-blue-800/20 before:to-white/10 before:blur-[120px] before:pointer-events-none",
        "after:fixed after:inset-0 after:bg-gradient-to-tr after:from-white/10 after:via-blue-500/10 after:to-white/10 after:blur-[120px] after:pointer-events-none",
        "perspective-[1000px] select-none touch-none",
        className
      )}
      {...props}
    >
      <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {rowsArray.map((_, i) => (
          <React.Fragment key={`row-${i}`}>
            {colsArray.map((_, j) => {
              const index = i * cols + j;
              const isHovered = hoveredIndex === index;
              const isEvenSquare = (i + j) % 2 === 0;
              const neighborIndices = [
                index - cols - 1, index - cols, index - cols + 1,
                index - 1,                      index + 1,
                index + cols - 1, index + cols, index + cols + 1
              ];
              const isNeighbor = hoveredIndex !== null && neighborIndices.includes(hoveredIndex);
              const depth = Math.abs(((i + j) % 3) - 1);

              return (
                <div
                  key={`col-${j}`}
                  className={cn(
                    "aspect-square w-full relative",
                    "transition-all duration-500 ease-out will-change-transform",
                    "hover:z-50",
                    "pointer-events-auto",
                    "border-[0.5px]",
                    isEvenSquare
                      ? "border-blue-400/40"
                      : "border-white/40",
                    "shadow-lg",
                    isEvenSquare
                      ? "shadow-blue-500/20"
                      : "shadow-white/20",
                    isEvenSquare 
                      ? depth === 0 
                        ? "bg-blue-500/40"
                        : "bg-blue-400/30"
                      : depth === 0
                        ? "bg-white/40"
                        : "bg-white/30",
                    isHovered 
                      ? "scale-110 border-white/60 shadow-white/30" 
                      : isNeighbor 
                        ? isEvenSquare
                          ? "scale-105 border-blue-300/50 shadow-blue-200/30"
                          : "scale-105 border-white/50 shadow-white/30"
                        : "scale-100"
                  )}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform: isHovered ? 'scale(1.1)' : isNeighbor ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.5s ease-out',
                    willChange: 'transform',
                  }}
                >
                  <div
                    className={cn(
                      "absolute inset-0",
                      "bg-gradient-to-br",
                      isHovered 
                        ? "from-white/30 via-blue-300/30 to-white/30"
                        : isEvenSquare
                          ? depth === 0
                            ? "from-blue-400/50 via-blue-500/50 to-blue-600/50"
                            : "from-blue-400/40 via-blue-500/40 to-blue-600/40"
                          : depth === 0
                            ? "from-white/50 via-white/50 to-blue-50/50"
                            : "from-white/40 via-white/40 to-blue-50/40",
                      "transition-all duration-500",
                      "pointer-events-none",
                      isEvenSquare
                        ? "shadow-[inset_0_0_15px_rgba(59,130,246,0.4)]"
                        : "shadow-[inset_0_0_15px_rgba(255,255,255,0.4)]",
                      isEvenSquare
                        ? "after:absolute after:inset-0 after:shadow-[0_4px_15px_rgba(59,130,246,0.5)]"
                        : "after:absolute after:inset-0 after:shadow-[0_4px_15px_rgba(255,255,255,0.5)]",
                      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500",
                      isHovered && "before:opacity-100"
                    )}
                  />
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-white/20 blur-xl" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 via-white/30 to-blue-300/30" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/20" />
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const Boxes = React.memo(BoxesCore); 