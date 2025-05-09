
import React from "react";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ColumnDefinition, ActionDefinition } from "./types";

interface DataGridBodyProps {
  data: any[];
  visibleColumns: ColumnDefinition[];
  actions?: ActionDefinition[];
  selectable?: boolean;
  selectedRows?: string[];
  onToggleSelection?: (id: string) => void;
  idField?: string;
  emptyMessage?: string;
}

export function DataGridBody({
  data,
  visibleColumns,
  actions,
  selectable,
  selectedRows = [],
  onToggleSelection,
  idField = "id",
  emptyMessage = "لا توجد بيانات متاحة"
}: DataGridBodyProps) {
  const renderCellContent = (row: any, column: ColumnDefinition) => {
    try {
      if (!row) {
        console.warn("Row is undefined in DataGridBody renderCellContent");
        return '';
      }
      
      // Safely access the value using the accessor key
      const value = column.accessorKey ? row[column.accessorKey] : undefined;
      
      // Use custom cell renderer if provided
      if (column.cell && typeof column.cell === 'function') {
        try {
          return column.cell(value, row);
        } catch (cellError) {
          console.error("Error in custom cell renderer:", cellError);
          return "Error";
        }
      }
      
      // Handle undefined or null values
      if (value === undefined || value === null) {
        return '';
      }
      
      // Render value with tooltip
      return (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>{value.toString()}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs break-words">{value.toString()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    } catch (error) {
      console.error("Error rendering cell content:", error);
      return "Error";
    }
  };

  // Check if data is valid and not empty
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell 
            colSpan={visibleColumns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} 
            className="h-24 text-center text-muted-foreground py-8"
          >
            {emptyMessage}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((row, index) => (
        <TableRow 
          key={row && row[idField] ? row[idField] : index} 
          className="h-[45px] hover:bg-gray-50" 
          data-state={row && row[idField] && selectedRows.includes(row[idField]) ? "selected" : ""}
        >
          {selectable && (
            <TableCell className="text-center bg-teal-100 py-[10px] my-0">
              <input 
                type="checkbox" 
                className="rounded border-gray-300" 
                checked={row && row[idField] && selectedRows.includes(row[idField])} 
                onChange={() => row && row[idField] && onToggleSelection && onToggleSelection(row[idField])} 
              />
            </TableCell>
          )}
          
          {visibleColumns.map((column) => (
            <TableCell 
              key={`${row && row[idField] ? row[idField] : index}-${column.id}`} 
              className="p-4 text-sm text-center"
            >
              {renderCellContent(row, column)}
            </TableCell>
          ))}
          
          {actions && actions.length > 0 && (
            <TableCell className="p-2 bg-zinc-300">
              <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                {actions.map((action, idx) => {
                  // Skip rendering action if row is undefined
                  if (!row) return null;
                  
                  if (action.condition) {
                    return action.condition(row) && (
                      <Button 
                        key={idx} 
                        variant={action.variant || "ghost"} 
                        size="icon" 
                        onClick={() => action.onClick(row)} 
                        className="h-8 w-8"
                      >
                        {action.icon}
                      </Button>
                    );
                  } 
                  
                  return (
                    <Button 
                      key={idx} 
                      variant={action.variant || "ghost"} 
                      size="icon" 
                      onClick={() => action.onClick(row)} 
                      className="h-8 w-8"
                    >
                      {action.icon}
                    </Button>
                  );
                })}
              </div>
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
}
