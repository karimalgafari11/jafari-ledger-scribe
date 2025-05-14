
import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = "medium", className = "" }) => {
  const sizeClass = {
    small: "h-10 w-10",
    medium: "h-16 w-16",
    large: "h-24 w-24",
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img 
        src="/lovable-uploads/3d743b81-5ccb-4ce5-9824-2af91771013d.png" 
        alt="AICore" 
        className={`${sizeClass[size]} object-contain`} 
      />
    </div>
  );
};
