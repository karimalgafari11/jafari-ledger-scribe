
import React from "react";
import { cn } from "@/lib/utils";

interface SidebarItemIconProps {
  icon: React.ReactNode;
  isActive?: boolean;
}

const SidebarItemIcon: React.FC<SidebarItemIconProps> = ({ icon, isActive }) => (
  <span className={cn(
    "text-xl flex-shrink-0", 
    isActive ? "text-sidebar-accent-foreground" : ""
  )}>
    {icon}
  </span>
);

export default SidebarItemIcon;
