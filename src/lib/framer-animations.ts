
// Animation variants for Framer Motion
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    } 
  }
};

export const listItemAnimation = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export const buttonAnimation = {
  tap: { scale: 0.95 },
  hover: { scale: 1.05 }
};
