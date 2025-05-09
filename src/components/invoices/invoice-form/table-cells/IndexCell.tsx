
import React from "react";
import { TableCell } from "@/components/ui/table";

interface IndexCellProps {
  index: number;
}

export const IndexCell: React.FC<IndexCellProps> = ({ index }) => {
  return (
    <TableCell className="text-center">
      {index + 1}
    </TableCell>
  );
};
