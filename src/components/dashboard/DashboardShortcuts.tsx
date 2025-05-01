
import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ShortcutItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  route: string;
  enabled: boolean;
}

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
      {enabledShortcuts.map((shortcut) => (
        <Card 
          key={shortcut.id}
          className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent transition-colors"
          onClick={() => navigate(shortcut.route)}
        >
          <div className="p-2 bg-primary/10 rounded-full text-primary">
            {shortcut.icon}
          </div>
          <span className="text-sm font-medium text-center">{shortcut.name}</span>
        </Card>
      ))}
    </div>
  );
};

export default DashboardShortcuts;
