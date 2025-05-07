
import React, { useState } from "react";
import { Settings, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface ShortcutItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  route: string;
  enabled: boolean;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "outline" | "destructive" | "success";
  };
  description?: string;
}

interface ShortcutsSettingsProps {
  shortcuts: ShortcutItem[];
  onShortcutsChange: (shortcuts: ShortcutItem[]) => void;
}

const ShortcutsSettings: React.FC<ShortcutsSettingsProps> = ({
  shortcuts,
  onShortcutsChange
}) => {
  const isMobile = useIsMobile();
  
  const handleShortcutToggle = (id: string) => {
    onShortcutsChange(
      shortcuts.map(shortcut => 
        shortcut.id === id ? { ...shortcut, enabled: !shortcut.enabled } : shortcut
      )
    );
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
  
  const SettingsContent = () => (
    <div className="space-y-4 rtl">
      <p className="text-sm text-muted-foreground mb-2">
        يمكنك تخصيص الاختصارات التي تظهر في لوحة التحكم عن طريق تفعيل أو تعطيل الاختصارات أدناه.
        يمكنك أيضاً سحب وإفلات الاختصارات لتغيير ترتيبها.
      </p>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="shortcuts">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {shortcuts.map((shortcut, index) => (
                <Draggable 
                  key={shortcut.id} 
                  draggableId={shortcut.id} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center justify-between p-2 border rounded-md bg-background"
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-muted rounded-md">
                          {shortcut.icon}
                        </div>
                        <div>
                          <p className="font-medium">{shortcut.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {shortcut.description || shortcut.route}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id={`toggle-${shortcut.id}`}
                          checked={shortcut.enabled}
                          onCheckedChange={() => handleShortcutToggle(shortcut.id)}
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteShortcut(shortcut.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
  
  return isMobile ? (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Settings className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-6">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">إعدادات الاختصارات</h2>
          <SettingsContent />
          <Button 
            className="w-full mt-4" 
            onClick={() => toast.success("تم حفظ الإعدادات")}
          >
            حفظ الإعدادات
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إعدادات الاختصارات</DialogTitle>
          <DialogDescription>
            تخصيص الاختصارات التي تظهر في لوحة التحكم
          </DialogDescription>
        </DialogHeader>
        <SettingsContent />
        <DialogFooter>
          <Button 
            onClick={() => toast.success("تم حفظ الإعدادات")}
          >
            حفظ الإعدادات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShortcutsSettings;
