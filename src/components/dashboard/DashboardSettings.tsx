
import React from "react";
import { Settings2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import { SettingsContent } from "./settings/SettingsContent";
import { useDashboardSettings } from "@/hooks/useDashboardSettings";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const DashboardSettings: React.FC<{
  displayOptions: DisplayOptions;
  onDisplayOptionsChange: (options: DisplayOptions) => void;
  shortcuts: ShortcutItem[];
  onShortcutsChange: (shortcuts: ShortcutItem[]) => void;
}> = ({ 
  displayOptions, 
  onDisplayOptionsChange,
  shortcuts,
  onShortcutsChange
}) => {
  const {
    isMobile,
    handleDisplayOptionChange,
    handleShortcutToggle,
    handleDeleteShortcut,
    handleDragEnd,
    handleAddShortcut,
    handleSaveSettings
  } = useDashboardSettings({
    initialDisplayOptions: displayOptions,
    initialShortcuts: shortcuts,
    onDisplayOptionsChange,
    onShortcutsChange
  });
  
  const settingsContentProps = {
    displayOptions,
    shortcuts,
    onDisplayOptionChange: handleDisplayOptionChange,
    onShortcutToggle: handleShortcutToggle,
    onDeleteShortcut: handleDeleteShortcut,
    onDragEnd: handleDragEnd,
    onAddShortcut: handleAddShortcut
  };
  
  // Ensure we're using a boolean value for the conditional rendering
  const showMobileView = isMobile === true;
  
  return showMobileView ? (
    <Drawer>
      <DrawerTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="relative group">
                <Settings2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-sm font-medium">إعدادات لوحة التحكم</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DrawerTrigger>
      <DrawerContent className="p-6">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">إعدادات لوحة التحكم</h2>
          <SettingsContent {...settingsContentProps} />
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="relative group overflow-hidden"
              >
                <Settings2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:rotate-45 transform" />
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-sm font-medium">إعدادات لوحة التحكم</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إعدادات لوحة التحكم</DialogTitle>
          <DialogDescription>
            تخصيص لوحة التحكم وإدارة الاختصارات
          </DialogDescription>
        </DialogHeader>
        <SettingsContent {...settingsContentProps} />
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={handleSaveSettings} 
            className="relative overflow-hidden group"
          >
            <span className="relative z-10">حفظ الإعدادات</span>
            <span className="absolute inset-0 bg-primary/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
