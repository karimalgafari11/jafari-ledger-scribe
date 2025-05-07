
import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ShortcutItem } from "@/types/dashboard";

interface DashboardShortcutsProps {
  shortcuts: ShortcutItem[];
}

const DashboardShortcuts: React.FC<DashboardShortcutsProps> = ({ shortcuts }) => {
  const navigate = useNavigate();
  const enabledShortcuts = shortcuts.filter(shortcut => shortcut.enabled);
  
  if (enabledShortcuts.length === 0) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
      {enabledShortcuts.map((shortcut) => {
        return (
          <TooltipProvider key={shortcut.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card 
                  key={shortcut.id}
                  className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent transition-all duration-200 hover:shadow-md relative group h-24"
                  onClick={() => navigate(shortcut.route)}
                >
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {shortcut.badge && (
                      <Badge variant={shortcut.badge.variant || "default"} className="text-xs">
                        {shortcut.badge.text}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-2 bg-primary/10 rounded-full text-primary transform group-hover:scale-110 transition-transform">
                    {React.createElement(shortcut.icon, { size: 20 })}
                  </div>
                  
                  <span className="text-sm font-medium text-center">{shortcut.name}</span>
                </Card>
              </TooltipTrigger>
              {shortcut.description && (
                <TooltipContent>
                  <p className="text-sm">{shortcut.description}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default DashboardShortcuts;
