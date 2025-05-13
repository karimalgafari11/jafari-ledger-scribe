
import React from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={`flex h-full ${className || ''}`}>
      <div className="flex flex-1 flex-col overflow-hidden">
        {children || <Outlet />}
      </div>
    </div>
  );
};
