
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DisplayOptionsTab } from "./DisplayOptionsTab";
import { ShortcutsTab } from "./ShortcutsTab";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import { FileText } from "lucide-react";

interface SettingsContentProps {
  displayOptions: DisplayOptions;
  shortcuts: ShortcutItem[];
  onDisplayOptionChange: (key: keyof DisplayOptions) => void;
  onShortcutToggle: (id: string) => void;
  onDeleteShortcut: (id: string) => void;
  onDragEnd: (result: any) => void;
  onAddShortcut: (shortcut: Omit<ShortcutItem, "id" | "icon" | "enabled">) => void;
}

export const SettingsContent: React.FC<SettingsContentProps> = ({
  displayOptions,
  shortcuts,
  onDisplayOptionChange,
  onShortcutToggle,
  onDeleteShortcut,
  onDragEnd,
  onAddShortcut
}) => {
  return (
    <Tabs defaultValue="display" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="display">خيارات العرض</TabsTrigger>
        <TabsTrigger value="shortcuts">الاختصارات</TabsTrigger>
      </TabsList>
      
      <TabsContent value="display" className="space-y-4 mt-4">
        <DisplayOptionsTab 
          displayOptions={displayOptions} 
          onDisplayOptionChange={onDisplayOptionChange} 
        />
      </TabsContent>
      
      <TabsContent value="shortcuts" className="space-y-4 mt-4">
        <ShortcutsTab 
          shortcuts={shortcuts}
          onShortcutToggle={onShortcutToggle}
          onDeleteShortcut={onDeleteShortcut}
          onDragEnd={onDragEnd}
          onAddShortcut={onAddShortcut}
        />
      </TabsContent>
    </Tabs>
  );
};
