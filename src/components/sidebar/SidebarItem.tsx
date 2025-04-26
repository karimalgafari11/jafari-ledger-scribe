
import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItemProps } from "@/types/sidebar";

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
      <span className={cn("text-xl flex-shrink-0", isActive ? "text-sidebar-accent-foreground" : "")}>{icon}</span>
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
    </div>
  );
};

export default SidebarItem;
