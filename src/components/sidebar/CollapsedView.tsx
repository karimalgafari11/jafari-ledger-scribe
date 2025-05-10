
import React from "react";
import { MenuItem } from "@/types/sidebar";
import { useSidebarNavigation } from "@/hooks/useSidebarNavigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define props type for Section component
interface SectionProps {
  section: MenuItem;
  toggleSidebar?: () => void;
}

// Main CollapsedView component
const CollapsedView = () => {
  return (
    <div className="p-4 border-b flex items-center justify-center">
      <div className="flex items-center justify-center">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
      </div>
    </div>
  );
};

// Section component for CollapsedView
const Section = ({ 
  section, 
  toggleSidebar 
}: SectionProps) => {
  const { handleItemClick } = useSidebarNavigation();

  if (!section.children && section.path) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="flex items-center justify-center p-2 rounded-md cursor-pointer hover:bg-gray-100 my-2"
              onClick={() => {
                handleItemClick(section.path);
                toggleSidebar?.();
              }}
            >
              <section.icon className="h-5 w-5 text-teal-600" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="left">{section.section}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <div className="flex items-center justify-center p-2 rounded-md cursor-pointer hover:bg-gray-100 my-2">
                <section.icon className="h-5 w-5 text-teal-600" />
              </div>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="left">{section.section}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent side="left" className="w-48 p-0">
        <div className="py-1">
          {section.children?.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100 text-gray-700"
              onClick={() => {
                handleItemClick(item.path);
                toggleSidebar?.();
              }}
            >
              <item.icon className="h-4 w-4 ml-2 text-teal-500" />
              <span className="text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Attach Section to CollapsedView
CollapsedView.Section = Section;

export default CollapsedView;
