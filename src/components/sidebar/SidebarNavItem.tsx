
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  hasChildren?: boolean;
  isExpanded?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  icon, 
  label, 
  active, 
  onClick, 
  hasChildren, 
  isExpanded 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 py-2 px-4 w-full rounded-md transition-all duration-200 ease-in-out group",
      active 
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium translate-x-1.5 shadow-sm" 
        : "text-sidebar-foreground hover:bg-sidebar-primary/30"
    )}
  >
    <span className="text-xl">{icon}</span>
    <span className="flex-grow">{label}</span>
    {hasChildren && (
      <ChevronDown 
        size={16} 
        className={cn(
          "transition-transform duration-200 ease-in-out",
          isExpanded ? "transform rotate-180" : ""
        )}
      />
    )}
  </button>
);

export default SidebarNavItem;
