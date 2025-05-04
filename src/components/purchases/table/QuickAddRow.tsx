
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface QuickAddRowProps {
  itemsLength: number;
  setIsAddingItem: (isAdding: boolean) => void;
}

export const QuickAddRow: React.FC<QuickAddRowProps> = ({
  itemsLength,
  setIsAddingItem
}) => {
  return (
    <TableRow className="bg-gray-50 hover:bg-gray-100">
      <TableCell className="text-center border border-gray-300 p-2 font-bold text-lg">
        {itemsLength + 1}
      </TableCell>
      <TableCell 
        className="border border-gray-300 p-2"
        colSpan={10}
      >
        <Button 
          variant="ghost"
          className="w-full flex items-center justify-center text-gray-500 p-2 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
          onClick={() => setIsAddingItem(true)}
        >
          <Plus size={18} className="ml-2" />
          إضافة صنف جديد
        </Button>
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
