
import React from "react";
import { Trash2, FileText } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ShortcutItem } from "@/types/dashboard";

interface ShortcutListProps {
  shortcuts: ShortcutItem[];
  onShortcutToggle: (id: string) => void;
  onDeleteShortcut: (id: string) => void;
  onDragEnd: (result: any) => void;
}

export const ShortcutList: React.FC<ShortcutListProps> = ({
  shortcuts,
  onShortcutToggle,
  onDeleteShortcut,
  onDragEnd
}) => {
  // Enhanced function to safely render icon component with stronger type checking
  const renderIcon = (icon: any) => {
    if (!icon) {
      return <FileText size={20} />;
    }
    
    try {
      // Check if icon is a valid component
      if (typeof icon === 'function') {
        return React.createElement(icon, { size: 20 });
      }
      // Fallback for invalid icons
      return <FileText size={20} />;
    } catch (error) {
      console.error("Error rendering icon:", error);
      return <FileText size={20} />;
    }
  };

  // Use StrictMode-compatible implementation
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                        {renderIcon(shortcut.icon)}
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
                        onCheckedChange={() => onShortcutToggle(shortcut.id)}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onDeleteShortcut(shortcut.id)}
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
  );
};
