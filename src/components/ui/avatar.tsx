import { type FC } from 'react';
import { cn } from '../../utils';

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fallback?: string;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className,
  fallback
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl'
  };

  const rootClass = cn(
    "relative inline-flex shrink-0 rounded-lg overflow-hidden",
    "bg-[#0a101f]",
    "border-2 border-[#1e2d44]",
    "shadow-[0_0_10px_rgba(255,255,255,0.05)]",
    "transition-all duration-300",
    "hover:border-[#1e2d44]/80",
    "hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    sizeClasses[size],
    className
  );

  if (!src || fallback) {
    return (
      <div className={cn(
        rootClass,
        "items-center justify-center font-semibold text-white/90"
      )}>
        {fallback}
      </div>
    );
  }

  return (
    <div className={rootClass}>
      <img 
        src={src} 
        alt={alt}
        className="aspect-square h-full w-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}; 