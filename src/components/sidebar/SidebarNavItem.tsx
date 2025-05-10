
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
      "flex items-center gap-3 py-2.5 px-4 w-full rounded-lg transition-all duration-200 ease-in-out group text-base font-medium",
      active 
        ? "bg-sidebar-accent text-sidebar-accent-foreground translate-x-1.5 shadow-md" 
        : "text-sidebar-foreground hover:bg-sidebar-primary/40 hover:translate-x-1"
    )}
  >
    <span className="text-xl flex-shrink-0">{icon}</span>
    <span className="flex-grow">{label}</span>
    {hasChildren && (
      <ChevronDown 
        size={18} 
        className={cn(
          "transition-transform duration-200 ease-in-out",
          isExpanded ? "transform rotate-180" : ""
        )}
      />
    )}
  </button>
);

export default SidebarNavItem;
