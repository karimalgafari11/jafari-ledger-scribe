
import React from "react";
import { TableCell } from "@/components/ui/table";

interface TotalCellProps {
  total: number;
}

export const TotalCell: React.FC<TotalCellProps> = ({ total }) => {
  return (
    <TableCell className="text-center border border-gray-300 p-2 font-bold">
      {total.toFixed(2)}
    </TableCell>
  );
};
