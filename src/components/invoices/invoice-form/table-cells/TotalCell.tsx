
import React, { forwardRef } from "react";
import { TableCell } from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatters";

interface TotalCellProps {
  total: number;
}

export const TotalCell = forwardRef<HTMLTableCellElement, TotalCellProps>(
  ({ total }, ref) => {
    return (
      <TableCell className="text-center font-semibold" ref={ref}>
        {formatCurrency(total, 'SAR')}
      </TableCell>
    );
  }
);

TotalCell.displayName = "TotalCell";
