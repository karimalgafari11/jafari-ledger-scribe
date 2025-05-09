
import React, { KeyboardEvent, forwardRef } from "react";
import { TableCell as UITableCell } from "@/components/ui/table";

interface EditableTableCellProps {
  rowIndex: number;
  cellName: string;
  isActive: boolean;
  onClick: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLTableCellElement>) => void;
  children: React.ReactNode;
  className?: string; // Added className as an optional prop
}

export const EditableTableCell = forwardRef<HTMLTableCellElement, EditableTableCellProps>(
  ({ rowIndex, cellName, isActive, onClick, onKeyDown, children, className, ...rest }, ref) => {
    return (
      <UITableCell 
        className={`p-2 ${isActive ? 'bg-blue-100' : ''} transition-colors ${className || ''}`}
        onClick={onClick}
        onKeyDown={onKeyDown}
        data-row-index={rowIndex}
        data-cell-name={cellName}
        ref={ref}
        tabIndex={0}
        aria-selected={isActive}
        role="gridcell"
        {...rest}
      >
        {children}
      </UITableCell>
    );
  }
);

EditableTableCell.displayName = "EditableTableCell";
