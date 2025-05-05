
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface SidebarHeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, toggleCollapsed }) => {
  return (
    <div className="p-4 flex justify-between items-center border-b border-sidebar-border">
      {!collapsed && (
        <div className="text-sidebar-foreground font-bold text-xl">الجعفري</div>
      )}
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleCollapsed} 
        className="text-sidebar-foreground hover:bg-sidebar-primary"
      >
        <Menu size={24} />
      </Button>
    </div>
  );
};

export default SidebarHeader;
