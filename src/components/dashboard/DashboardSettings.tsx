
import React from "react";
import { Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import { SettingsContent } from "./settings/SettingsContent";
import { FileText } from "lucide-react";

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
  
  const handleDisplayOptionChange = (key: keyof DisplayOptions) => {
    onDisplayOptionsChange({
      ...displayOptions,
      [key]: !displayOptions[key]
    });
  };
  
  const handleShortcutToggle = (id: string) => {
    onShortcutsChange(
      shortcuts.map(shortcut => 
        shortcut.id === id ? { ...shortcut, enabled: !shortcut.enabled } : shortcut
      )
    );
  };
  
  const handleAddShortcut = (shortcutData: Omit<ShortcutItem, "id" | "icon" | "enabled">) => {
    const id = `custom-${Date.now()}`;
    onShortcutsChange([
      ...shortcuts,
      {
        id,
        name: shortcutData.name,
        icon: FileText,
        route: shortcutData.route,
        enabled: true,
        description: shortcutData.description
      }
    ]);
  };
  
  const handleDeleteShortcut = (id: string) => {
    onShortcutsChange(shortcuts.filter(shortcut => shortcut.id !== id));
    toast.success("تم حذف الاختصار بنجاح");
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(shortcuts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onShortcutsChange(items);
  };
  
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
          <Button type="submit" onClick={() => toast.success("تم حفظ الإعدادات")}>
            حفظ الإعدادات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
