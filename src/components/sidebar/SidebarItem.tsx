
import React from "react";
import { cn } from "@/lib/utils";
import { SidebarItemProps } from "@/types/sidebar";
import SidebarItemIcon from "./SidebarItemIcon";
import SidebarItemContent from "./SidebarItemContent";

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isActive,
  onClick,
  hasChildren = false,
  isExpanded = false,
  depth = 0
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 py-2 px-4 rounded-md mb-0.5 cursor-pointer transition-all duration-200 group relative",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm translate-x-1.5" 
          : "text-sidebar-foreground hover:bg-sidebar-primary/30 hover:text-sidebar-foreground"
      )}
    >
      <SidebarItemIcon icon={icon} isActive={isActive} />
      <SidebarItemContent 
        label={label}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
      />
    </div>
  );
};

export default SidebarItem;
