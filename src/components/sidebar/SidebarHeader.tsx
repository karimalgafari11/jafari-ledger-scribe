
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
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleCollapsed} 
        className="text-sidebar-foreground hover:bg-sidebar-primary"
      >
        <Menu size={24} />
      </Button>
      <div className="flex items-center">
        {!collapsed && (
          <div className="text-sidebar-foreground font-bold text-xl ml-2">AICore</div>
        )}
        <img 
          src="/lovable-uploads/3d743b81-5ccb-4ce5-9824-2af91771013d.png" 
          alt="AICore" 
          className={`${collapsed ? 'h-8 w-8' : 'h-10 w-10'} object-contain`} 
        />
      </div>
    </div>
  );
};

export default SidebarHeader;
