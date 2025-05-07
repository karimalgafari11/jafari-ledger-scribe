
import React from "react";

interface TableResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

export const TableResizeHandle: React.FC<TableResizeHandleProps> = ({ onMouseDown }) => {
  return (
    <div 
      className="absolute top-0 bottom-0 right-0 w-2 cursor-ew-resize hover:bg-blue-300 opacity-0 hover:opacity-100 transition-opacity print-hide"
      onMouseDown={onMouseDown}
      title="اضغط وحرك لتغيير حجم الجدول"
    />
  );
};
