
import React from "react";
import { TableActionButtons } from "./TableActionButtons";

interface TableHeaderProps {
  onAddNewItem: () => void;
  onToggleSearch: () => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  onAddNewItem,
  onToggleSearch
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold">الأصناف</h3>
      <TableActionButtons 
        onAddNewItem={onAddNewItem}
        onToggleSearch={onToggleSearch}
      />
    </div>
  );
};
