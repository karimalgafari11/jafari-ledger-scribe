
import { useState } from "react";
import { toast } from "sonner";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import { FileText } from "lucide-react";

export function useDashboardSettings({
  initialDisplayOptions,
  initialShortcuts,
  onDisplayOptionsChange,
  onShortcutsChange,
}: {
  initialDisplayOptions: DisplayOptions;
  initialShortcuts: ShortcutItem[];
  onDisplayOptionsChange: (options: DisplayOptions) => void;
  onShortcutsChange: (shortcuts: ShortcutItem[]) => void;
}) {
  const [isMobile] = useState(false);
  
  const handleDisplayOptionChange = (key: keyof DisplayOptions) => {
    onDisplayOptionsChange({
      ...initialDisplayOptions,
      [key]: !initialDisplayOptions[key]
    });
  };
  
  const handleShortcutToggle = (id: string) => {
    onShortcutsChange(
      initialShortcuts.map(shortcut => 
        shortcut.id === id ? { ...shortcut, enabled: !shortcut.enabled } : shortcut
      )
    );
  };
  
  const handleAddShortcut = (shortcutData: Omit<ShortcutItem, "id" | "icon" | "enabled">) => {
    const id = `custom-${Date.now()}`;
    onShortcutsChange([
      ...initialShortcuts,
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
    onShortcutsChange(initialShortcuts.filter(shortcut => shortcut.id !== id));
    toast.success("تم حذف الاختصار بنجاح");
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(initialShortcuts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onShortcutsChange(items);
  };

  const handleSaveSettings = () => {
    toast.success("تم حفظ الإعدادات");
  };
  
  return {
    handleDisplayOptionChange,
    handleShortcutToggle,
    handleDeleteShortcut,
    handleDragEnd,
    handleAddShortcut,
    handleSaveSettings
  };
}
