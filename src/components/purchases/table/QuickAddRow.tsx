
import React from "react";
import { Search } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ProductSearchCell } from "./ProductSearchCell";

interface QuickAddRowProps {
  itemsLength: number;
  activeSearchCell: string | null;
  handleCellClick: (index: number, field: string) => void;
  handleProductSelect: (product: any, index?: number) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export const QuickAddRow: React.FC<QuickAddRowProps> = ({
  itemsLength,
  activeSearchCell,
  handleCellClick,
  handleProductSelect,
  searchInputRef
}) => {
  return (
    <TableRow className="bg-gray-50 hover:bg-gray-100">
      <TableCell className="text-center border border-gray-300 p-2 font-bold text-lg">
        {itemsLength + 1}
      </TableCell>
      <TableCell 
        className="border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer search-cell relative" 
        onClick={(e) => {
          e.stopPropagation();
          handleCellClick(-1, 'quickadd');
        }}
        colSpan={10}
      >
        <ProductSearchCell 
          active={activeSearchCell === `quickadd-${-1}`}
          index={-1}
          field="quickadd"
          onSelect={handleProductSelect}
          searchInputRef={searchInputRef}
        />
        {activeSearchCell !== `quickadd-${-1}` && (
          <div className="flex items-center justify-center text-gray-500 p-2">
            <Search size={18} className="ml-2" />
            انقر هنا للبحث وإضافة صنف جديد
          </div>
        )}
      </TableCell>
      <TableCell className="text-center border border-gray-300 p-2 print:hidden">
        <Button 
          variant="ghost" 
          size="sm" 
          className="opacity-0"
        >
          <span></span>
        </Button>
      </TableCell>
    </TableRow>
  );
};
