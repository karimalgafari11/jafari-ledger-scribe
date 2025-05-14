
import React from 'react';
import NotificationsDropdown from './notifications/NotificationsDropdown';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAppContext } from '@/contexts/AppContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBackClick?: () => void;
  children?: React.ReactNode;
  description?: string;
  backPath?: string;
  className?: string;
  actions?: React.ReactNode; // Added the actions prop
}

// Making Header both a default export and a named export
const Header = ({
  title,
  showBack = true,
  onBackClick,
  children,
  description,
  backPath,
  className = '',
  actions // Added actions to the destructured props
}: HeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { language } = useAppContext();
  
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };
  
  return (
    <header className={`border-b border-gray-200 flex items-center justify-between bg-blue-500 ${isMobile ? 'px-2 py-3 w-full' : 'px-[17px] py-[24px]'} my-0 mx-0 ${className}`}>
      <div className="flex items-center">
        {isMobile && (
          <SidebarTrigger className="ml-0 mr-2" />
        )}
        {showBack && (
          <Button 
            onClick={handleBackClick} 
            variant="ghost" 
            size="sm"
            className={`${language === 'ar' ? 'ml-2 mr-3' : 'mr-2 ml-3'} hover:bg-opacity-10 hover:bg-gray-100`}
          >
            <ArrowLeft className={language === 'ar' ? "rotate-180" : ""} />
          </Button>
        )}
        <div>
          <h1 className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}>{title || (language === 'ar' ? "نظام إدارة الأعمال" : "Business Management System")}</h1>
          {description && (
            <p className="text-sm opacity-80">{description}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {actions} {/* Render the actions prop */}
        {children}
        <LanguageSwitcher />
        <ThemeSwitcher />
        <NotificationsDropdown />
        <Logo size="small" className={isMobile ? "scale-75" : ""} />
      </div>
    </header>
  );
};

// Export as both default and named
export default Header;
export { Header };
