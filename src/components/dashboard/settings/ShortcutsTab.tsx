
import React from "react";
import { FileText } from "lucide-react";
import { ShortcutList } from "./ShortcutList";
import { ShortcutForm } from "./ShortcutForm";
import { ShortcutItem } from "@/types/dashboard";

interface ShortcutsTabProps {
  shortcuts: ShortcutItem[];
  onShortcutToggle: (id: string) => void;
  onDeleteShortcut: (id: string) => void;
  onDragEnd: (result: any) => void;
  onAddShortcut: (shortcut: Omit<ShortcutItem, "id" | "icon" | "enabled">) => void;
}

export const ShortcutsTab: React.FC<ShortcutsTabProps> = ({
  shortcuts,
  onShortcutToggle,
  onDeleteShortcut,
  onDragEnd,
  onAddShortcut
}) => {
  return (
    <div className="space-y-4">
      <ShortcutList
        shortcuts={shortcuts}
        onShortcutToggle={onShortcutToggle}
        onDeleteShortcut={onDeleteShortcut}
        onDragEnd={onDragEnd}
      />
      
      <ShortcutForm onAddShortcut={onAddShortcut} />
    </div>
  );
};
