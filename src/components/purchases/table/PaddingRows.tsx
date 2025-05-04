
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
  
  return (
    <>
      {Array.from({ length: paddingRowCount }, (_, index) => (
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
    </>
  );
};
