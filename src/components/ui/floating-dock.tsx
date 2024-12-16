import { cn } from "@/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      {/* Dock containers */}
      <div className="fixed z-50">
        {/* Desktop - Vertical Dock */}
        <div className="hidden md:block fixed right-6 lg:right-8 top-1/2 -translate-y-1/2">
          <FloatingDockDesktop items={items} className={cn(
            "flex-col py-3",
            desktopClassName
          )} />
        </div>
        
        {/* Mobile - Bottom Dock */}
        <div className="block md:hidden fixed bottom-0 left-0 right-0">
          <div className="container mx-auto max-w-7xl px-4 pb-4">
            <div className="flex justify-center">
              <MobileNavBar items={items} className={cn(
                "block md:hidden",
                mobileClassName
              )} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MobileNavBar = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    setPathname(window.location.pathname);

    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange();
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const isRouteActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/' || pathname === '/chesswrapped';
    }
    return pathname.startsWith(href);
  };
  
  return (
    <div className={cn(
      "w-full max-w-sm bg-[#0f172a] border-2 border-[#1e293b] rounded-2xl shadow-lg",
      className
    )}>
      <nav>
        <div className="flex justify-around items-stretch">
          {items.map((item) => {
            const isActive = isRouteActive(item.href);
            
            return (
              <a
                key={item.title}
                href={item.href}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center py-3 px-2 relative",
                  "first:rounded-l-2xl last:rounded-r-2xl",
                  isActive ? "bg-[#1e293b]" : "hover:bg-[#1e293b]/50 active:bg-[#1e293b]/70"
                )}
              >
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white rounded-full" />
                )}
                <div className={cn(
                  "h-6 w-6 mb-1",
                  isActive ? "text-white scale-110 transition-transform" : "text-[#94a3b8]"
                )}>
                  {item.icon}
                </div>
                <span className={cn(
                  "text-[11px] font-medium transition-colors",
                  isActive ? "text-white" : "text-[#94a3b8]"
                )}>
                  {item.title}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseY = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className={cn(
        "inline-flex gap-3",
        "bg-[#1e293b]/95 backdrop-blur-md px-2.5",
        "border border-white/10 rounded-2xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]",
        "transition-all duration-300",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseY={mouseY} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseY,
  title,
  icon,
  href,
}: {
  mouseY: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [44, 64, 44]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [44, 64, 44]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [22, 32, 22]);
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [22, 32, 22]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} className="group">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "aspect-square rounded-xl flex items-center justify-center relative",
          "bg-white/5 hover:bg-white/10",
          "border border-white/5 hover:border-white/10",
          "transition-colors duration-200 my-1.5",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
          "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
              exit={{ 
                opacity: 0, 
                x: 5, 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
              className={cn(
                "px-3 py-1.5 whitespace-pre rounded-lg",
                "bg-[#1e293b] backdrop-blur-md",
                "border border-white/10",
                "absolute left-full ml-3",
                "shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
                "flex items-center gap-2"
              )}
            >
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#1e293b] border-l border-b border-white/10" />
              <span className="text-sm font-medium text-white/90">{title}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={cn(
            "flex items-center justify-center",
            "text-white/75 group-hover:text-white/90 transition-colors duration-200"
          )}
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}