
import React from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SettingsContent } from "./SettingsContent";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import { useDashboardSettings } from "@/hooks/useDashboardSettings";

interface DashboardSettingsProps {
  displayOptions: DisplayOptions;
  shortcuts: ShortcutItem[];
  onDisplayOptionsChange: (options: DisplayOptions) => void;
  onShortcutsChange: (shortcuts: ShortcutItem[]) => void;
}

export const DashboardSettings: React.FC<DashboardSettingsProps> = ({
  displayOptions,
  shortcuts,
  onDisplayOptionsChange,
  onShortcutsChange,
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
    onShortcutsChange,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="hover:bg-accent" 
          title="إعدادات لوحة التحكم"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>إعدادات لوحة التحكم</DialogTitle>
          <DialogDescription>
            قم بتخصيص لوحة التحكم وإدارة الاختصارات
          </DialogDescription>
        </DialogHeader>

        <SettingsContent 
          displayOptions={displayOptions}
          shortcuts={shortcuts}
          onDisplayOptionChange={handleDisplayOptionChange}
          onShortcutToggle={handleShortcutToggle}
          onDeleteShortcut={handleDeleteShortcut}
          onDragEnd={handleDragEnd}
          onAddShortcut={handleAddShortcut}
        />

        <div className="mt-4 flex justify-end">
          <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
