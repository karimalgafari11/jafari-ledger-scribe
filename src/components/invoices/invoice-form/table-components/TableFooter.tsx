
import React from "react";

interface TableFooterProps {
  itemsCount: number;
}

export const TableFooter: React.FC<TableFooterProps> = ({ itemsCount }) => {
  if (itemsCount === 0) return null;
  
  return (
    <div className="py-2 px-4 text-sm text-muted-foreground border-t">
      <div className="flex justify-between items-center">
        <div>إجمالي الأصناف: {itemsCount}</div>
        <div className="text-xs text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded ml-1">Insert</span> لإضافة صنف | 
          <span className="bg-gray-100 px-2 py-1 rounded mx-1">أسهم الكيبورد</span> للتنقل | 
          <span className="bg-gray-100 px-2 py-1 rounded mr-1">Enter</span> للتحرير
        </div>
      </div>
    </div>
  );
};
