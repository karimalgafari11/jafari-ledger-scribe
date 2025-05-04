
import React from "react";
import { TableCell } from "@/components/ui/table";

interface IndexCellProps {
  index: number;
}

export const IndexCell: React.FC<IndexCellProps> = ({ index }) => {
  return (
    <TableCell className="text-center border border-gray-300 p-2 font-bold text-lg">
      {index + 1}
    </TableCell>
  );
};
