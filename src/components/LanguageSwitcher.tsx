
import React from "react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = "" }) => {
  const { language, setLanguage } = useAppContext();
  
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      className={className}
    >
      <Globe className="h-5 w-5" />
      <span className="sr-only">{language === 'ar' ? 'English' : 'العربية'}</span>
    </Button>
  );
};
