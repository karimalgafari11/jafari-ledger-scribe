
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className = "" }) => {
  const { themeMode, toggleTheme } = useAppContext();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={themeMode === 'light' ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري'}
      aria-label={themeMode === 'light' ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري'}
      className={className}
    >
      {themeMode === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};
