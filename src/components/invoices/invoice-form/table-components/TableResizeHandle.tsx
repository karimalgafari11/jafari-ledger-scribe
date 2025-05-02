
import React from "react";

interface TableResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

export const TableResizeHandle: React.FC<TableResizeHandleProps> = ({ onMouseDown }) => {
  return (
    <div 
      className="absolute top-0 bottom-0 right-0 w-1 cursor-ew-resize bg-primary/10 hover:bg-primary/20 transition-colors" 
      onMouseDown={onMouseDown}
      title="اسحب لتغيير حجم الجدول" 
      aria-label="تغيير حجم الجدول"
    />
  );
};
