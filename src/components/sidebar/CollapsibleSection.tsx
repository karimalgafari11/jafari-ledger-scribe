
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SidebarNavItem from "./SidebarNavItem";

interface CollapsibleSectionProps {
  section: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  active?: boolean;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  section,
  icon,
  isExpanded,
  onToggle,
  active,
  children
}) => (
  <Collapsible
    open={isExpanded}
    onOpenChange={onToggle}
  >
    <CollapsibleTrigger className="w-full">
      <SidebarNavItem 
        icon={icon} 
        label={section} 
        active={active}
        hasChildren={true}
        isExpanded={isExpanded}
      />
    </CollapsibleTrigger>
    <CollapsibleContent className="pl-6 animate-accordion-down">
      {children}
    </CollapsibleContent>
  </Collapsible>
);

export default CollapsibleSection;
