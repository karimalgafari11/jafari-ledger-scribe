
import React from 'react';
import NotificationsDropdown from './notifications/NotificationsDropdown';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };
  
  return (
    <header className="border-b border-gray-200 flex items-center justify-between bg-blue-500 my-0 mx-0 px-[17px] py-[24px]">
      <div className="flex items-center">
        {showBack && (
          <Button 
            onClick={handleBackClick} 
            variant="ghost" 
            size="sm"
            className="ml-2 mr-3 hover:bg-opacity-10 hover:bg-gray-100"
          >
            <ArrowLeft className="rotate-180" />
          </Button>
        )}
        <h1 className="text-xl font-bold">{title || "نظام إدارة الأعمال"}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {children}
        <NotificationsDropdown />
        <Logo size="small" />
      </div>
    </header>
  );
};

// Export as both default and named
export default Header;
export { Header };
