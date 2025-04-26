
import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemContentProps {
  label: string;
  hasChildren?: boolean;
  isExpanded?: boolean;
}

const SidebarItemContent: React.FC<SidebarItemContentProps> = ({ 
  label, 
  hasChildren, 
  isExpanded 
}) => (
  <>
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
  </>
);

export default SidebarItemContent;
