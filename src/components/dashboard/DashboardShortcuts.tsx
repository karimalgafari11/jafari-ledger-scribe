
import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ShortcutItem } from "@/types/dashboard";
import { FileText, CreditCard } from "lucide-react";

interface DashboardShortcutsProps {
  shortcuts: ShortcutItem[];
}

const DashboardShortcuts: React.FC<DashboardShortcutsProps> = ({ shortcuts }) => {
  const navigate = useNavigate();
  const enabledShortcuts = shortcuts.filter(shortcut => shortcut.enabled);
  
  if (enabledShortcuts.length === 0) {
    return null;
  }
  
  // Enhanced function to safely render icon component
  const renderIcon = (icon: any) => {
    if (!icon) {
      return <FileText size={20} />;
    }
    
    try {
      // Check if icon is a valid component
      if (typeof icon === 'function') {
        return React.createElement(icon, { size: 20 });
      }
      // Fallback to FileText icon for invalid icons
      return <FileText size={20} />;
    } catch (error) {
      console.error("Error rendering icon:", error);
      return <FileText size={20} />;
    }
  };
  
  const handleShortcutClick = (route: string) => {
    // Добавляем плавную прокрутку наверх перед переходом
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // После небольшой задержки выполняем переход
    setTimeout(() => navigate(route), 100);
  };
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
      {enabledShortcuts.map((shortcut) => (
        <TooltipProvider key={shortcut.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card 
                className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent transition-all duration-200 hover:shadow-md relative group h-24"
                onClick={() => handleShortcutClick(shortcut.route)}
              >
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {shortcut.badge && (
                    <Badge variant={shortcut.badge.variant || "default"} className="text-xs">
                      {shortcut.badge.text}
                    </Badge>
                  )}
                </div>
                
                <div className="p-2 bg-primary/10 rounded-full text-primary transform group-hover:scale-110 transition-transform">
                  {renderIcon(shortcut.icon)}
                </div>
                
                <span className="text-sm font-medium text-center line-clamp-2">{shortcut.name}</span>
              </Card>
            </TooltipTrigger>
            {shortcut.description && (
              <TooltipContent>
                <p className="text-sm">{shortcut.description}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default DashboardShortcuts;
