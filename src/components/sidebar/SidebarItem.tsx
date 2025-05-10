
import React from "react";
import { cn } from "@/lib/utils";
import { SidebarItemProps } from "@/types/sidebar";
import SidebarItemIcon from "./SidebarItemIcon";
import SidebarItemContent from "./SidebarItemContent";
import { useSidebarNavigation } from "@/hooks/useSidebarNavigation";

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  path,
  isActive,
  hasChildren = false,
  isExpanded = false,
  depth = 0,
  onClick
}) => {
  const { handleItemClick } = useSidebarNavigation();
  
  // If there's a custom onClick handler, use it; otherwise use the default navigation handler
  const onItemClick = onClick || (() => handleItemClick(path));

  return (
    <div
      onClick={onItemClick}
      className={cn(
        "flex items-center gap-3 py-2.5 px-4 rounded-lg mb-1 cursor-pointer transition-all duration-200 group relative",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-md translate-x-1.5" 
          : "text-sidebar-foreground hover:bg-sidebar-primary/40 hover:text-sidebar-foreground hover:translate-x-1",
        depth > 0 && "py-2 text-base"
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
