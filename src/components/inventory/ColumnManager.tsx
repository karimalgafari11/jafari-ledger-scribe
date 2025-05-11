
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Columns, Eye, GripVertical, SlidersHorizontal } from "lucide-react";
import { ColumnDefinition } from "./types";

interface ColumnManagerProps {
  columns: ColumnDefinition[];
  visibleColumns: string[];
  columnOrder: string[];
  onVisibilityChange: (columnId: string, visible: boolean) => void;
  onOrderChange: (newOrder: string[]) => void;
}

export const ColumnManager: React.FC<ColumnManagerProps> = ({
  columns,
  visibleColumns,
  columnOrder,
  onVisibilityChange,
  onOrderChange
}) => {
  // Create a sorted version of columns based on columnOrder
  const sortedColumns = [...columns].sort((a, b) => {
    const aIndex = columnOrder.indexOf(a.id);
    const bIndex = columnOrder.indexOf(b.id);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  // Handle drag end event for column reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    
    if (sourceIndex === destIndex) return;
    
    const newOrder = [...columnOrder];
    const [removed] = newOrder.splice(sourceIndex, 1);
    newOrder.splice(destIndex, 0, removed);
    
    onOrderChange(newOrder);
  };

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Eye className="h-4 w-4 ml-2" />
            إظهار/إخفاء الأعمدة
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-60 p-4">
          <h3 className="font-medium text-sm mb-3">إظهار/إخفاء الأعمدة</h3>
          <div className="space-y-2">
            {columns.map((column) => (
              <label key={column.id} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={`column-${column.id}`}
                  checked={visibleColumns.includes(column.id)}
                  onCheckedChange={(checked) => 
                    onVisibilityChange(column.id, Boolean(checked))
                  }
                />
                <span className="text-sm mr-2">{column.header}</span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Columns className="h-4 w-4 ml-2" />
            ترتيب الأعمدة
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-60 p-4">
          <h3 className="font-medium text-sm mb-3">ترتيب الأعمدة</h3>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="column-reorder">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {sortedColumns.map((column, index) => (
                    <Draggable key={column.id} draggableId={column.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center p-2 border rounded bg-white"
                        >
                          <GripVertical className="h-4 w-4 ml-2 text-gray-400" />
                          <span className="text-sm">{column.header}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </PopoverContent>
      </Popover>
    </div>
  );
};
