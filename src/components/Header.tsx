import React from 'react';
import NotificationsDropdown from './notifications/NotificationsDropdown';
import { Logo } from './Logo';
interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBackClick?: () => void;
  children?: React.ReactNode;
}

// Making Header both a default export and a named export
const Header = ({
  title,
  showBack = false,
  onBackClick,
  children
}: HeaderProps) => {
  return <header className="border-b border-gray-200 flex items-center justify-between bg-blue-500 my-0 mx-0 px-[17px] py-[24px]">
      <div className="flex items-center">
        {showBack && <button onClick={onBackClick} className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors mr-3" aria-label="رجوع">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m9 18 6-6-6-6" /></svg>
          </button>}
        <h1 className="text-xl font-bold">{title || "نظام إدارة الأعمال"}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {children}
        <NotificationsDropdown />
        <Logo size="small" />
      </div>
    </header>;
};

// Export as both default and named
export default Header;
export { Header };