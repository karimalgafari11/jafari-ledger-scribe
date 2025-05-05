
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CollapsedNavButtonProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const CollapsedNavButton: React.FC<CollapsedNavButtonProps> = ({ icon, isActive, onClick }) => (
  <Button 
    size="icon" 
    variant="ghost" 
    className={cn(
      "rounded-lg",
      isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
    )}
    onClick={onClick}
  >
    {icon}
  </Button>
);

export default CollapsedNavButton;
