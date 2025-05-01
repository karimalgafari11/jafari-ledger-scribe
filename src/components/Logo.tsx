
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
        src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
        alt="الجعفري للمحاسبة" 
        className={`${sizeClass[size]} object-contain`} 
      />
    </div>
  );
};
