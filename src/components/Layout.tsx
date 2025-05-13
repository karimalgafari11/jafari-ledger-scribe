
import React from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col overflow-hidden">
        {children || <Outlet />}
      </div>
    </div>
  );
};
