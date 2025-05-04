
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

interface PaddingRowsProps {
  currentItemCount: number;
  totalRows: number;
}

export const PaddingRows: React.FC<PaddingRowsProps> = ({ currentItemCount, totalRows }) => {
  // Calculate how many padding rows we need
  const paddingRowCount = Math.max(0, totalRows - currentItemCount);
  
  if (paddingRowCount <= 0) {
    return null;
  }
  
  // Only render the first 10 padding rows for performance when there are many items
  const visiblePaddingRows = Math.min(paddingRowCount, 5);
  
  return (
    <>
      {Array.from({ length: visiblePaddingRows }, (_, index) => (
        <TableRow key={`empty-padding-row-${index}`} className={(currentItemCount + index) % 2 === 0 ? "bg-gray-50" : ""}>
          <TableCell className="text-center border border-gray-300 p-2 font-bold text-lg">
            {currentItemCount + index + 1}
          </TableCell>
          <TableCell className="border border-gray-300 p-2"></TableCell>
          <TableCell className="text-center border border-gray-300 p-2"></TableCell>
          <TableCell className="text-center border border-gray-300 p-2"></TableCell>
          <TableCell className="text-center border border-gray-300 p-2"></TableCell>
          <TableCell className="text-center border border-gray-300 p-2"></TableCell>
          <TableCell className="text-center border border-gray-300 p-2"></TableCell>
          <TableCell className="text-center border border-gray-300 p-2"></TableCell>
          <TableCell className="text-center border border-gray-300 p-2"></TableCell>
          <TableCell className="text-center border border-gray-300 p-2 font-bold"></TableCell>
          <TableCell className="border border-gray-300 p-2"></TableCell>
          <TableCell className="text-center border border-gray-300 p-2 print:hidden"></TableCell>
        </TableRow>
      ))}
      
      {paddingRowCount > 5 && (
        <TableRow>
          <TableCell colSpan={12} className="text-center border border-gray-300 p-2 text-gray-500">
            {paddingRowCount - 5} صفوف إضافية...
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
