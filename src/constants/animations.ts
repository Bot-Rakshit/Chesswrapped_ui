export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0,
    duration: 0.2
  }
};

export const buttonVariants = {
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
}; 