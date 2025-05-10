
import React from "react";
import { MenuItem } from "@/types/sidebar";
import { useSidebarNavigation } from "@/hooks/useSidebarNavigation";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Main ExpandedView component
const ExpandedView = () => {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
        <span className="ml-2 font-semibold text-lg">محاسبة</span>
      </div>
    </div>
  );
};

// Section component for ExpandedView
const Section = ({ 
  section, 
  toggleSidebar 
}: { 
  section: MenuItem, 
  toggleSidebar?: () => void 
}) => {
  const { handleItemClick } = useSidebarNavigation();
  const [isOpen, setIsOpen] = useState(false);

  if (!section.children && section.path) {
    return (
      <div
        className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 text-gray-700"
        onClick={() => {
          handleItemClick(section.path);
          toggleSidebar?.();
        }}
      >
        <section.icon className="h-5 w-5 ml-2 text-teal-600" />
        <span className="text-sm">{section.section}</span>
      </div>
    );
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <CollapsibleTrigger className="w-full flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100 text-gray-700">
        <div className="flex items-center">
          <section.icon className="h-5 w-5 ml-2 text-teal-600" />
          <span className="text-sm">{section.section}</span>
        </div>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen ? "transform rotate-180" : "")} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mr-4 border-r pr-2 mt-1">
          {section.children?.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 text-gray-700"
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
      </CollapsibleContent>
    </Collapsible>
  );
};

ExpandedView.Section = Section;

export default ExpandedView;
