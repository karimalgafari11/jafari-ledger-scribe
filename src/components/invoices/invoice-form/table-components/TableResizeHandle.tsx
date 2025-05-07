
import React from "react";

interface TableResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

export const TableResizeHandle: React.FC<TableResizeHandleProps> = ({ onMouseDown }) => {
  return (
    <div 
      className="absolute right-0 top-0 h-full w-2 cursor-col-resize print-hide hover:bg-blue-200 transition-colors"
      onMouseDown={onMouseDown}
    />
  );
};
