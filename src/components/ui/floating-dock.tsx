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
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <MobileNavBar items={items} className={mobileClassName} />
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
    // Set initial pathname
    setPathname(window.location.pathname);

    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    // Listen for both popstate and click events
    window.addEventListener('popstate', handleLocationChange);
    
    // Update pathname on initial load and subsequent changes
    handleLocationChange();
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Helper function to check if a route is active
  const isRouteActive = (href: string): boolean => {
    // For home route, check if pathname is exactly '/' or '/chesswrapped'
    if (href === '/') {
      return pathname === '/' || pathname === '/chesswrapped';
    }
    // For other routes, check if pathname starts with href
    return pathname.startsWith(href);
  };
  
  return (
    <>
      {/* Safe area spacer */}
      <div className="h-[4.5rem] block md:hidden" />
      
      {/* Bottom Navigation */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 block md:hidden w-full", 
        className
      )}>
        <nav className="bg-[#0f172a] border-t border-[#1e293b]">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-around items-stretch">
              {items.map((item) => {
                const isActive = isRouteActive(item.href);
                
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex-1 flex flex-col items-center justify-center py-3 px-2 relative",
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
          </div>
        </nav>
      </div>
    </>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-[#1e2d44]/80 backdrop-blur-md px-4 pb-3 border-2 border-[#1e2d44] border-white/5",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
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
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-[#1e2d44] hover:bg-[#2a3b56] flex items-center justify-center relative transition-colors"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-[#1e2d44] border border-[#2a3b56] text-white absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-white"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}