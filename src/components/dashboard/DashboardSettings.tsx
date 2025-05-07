
import React from "react";
import { Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import { SettingsContent } from "./settings/SettingsContent";
import { useDashboardSettings } from "@/hooks/useDashboardSettings";

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
  const isMobile = useIsMobile();
  
  const {
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
  
  return isMobile ? (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
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
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
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
          <Button type="submit" onClick={handleSaveSettings}>
            حفظ الإعدادات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
