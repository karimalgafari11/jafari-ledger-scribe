
import React, { useEffect, useState, ReactNode } from 'react';

interface StabilityWrapperProps {
  children: ReactNode;
}

export const StabilityWrapper = ({ children }: StabilityWrapperProps) => {
  const [isStable, setIsStable] = useState(false);
  
  useEffect(() => {
    // Short delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      setIsStable(true);
    }, 50);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div 
      className={`transition-opacity duration-300 ${isStable ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'opacity' }}
    >
      {children}
    </div>
  );
};

export default StabilityWrapper;
