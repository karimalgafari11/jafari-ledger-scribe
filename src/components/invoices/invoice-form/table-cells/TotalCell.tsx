
import React, { forwardRef } from "react";
import { TableCell } from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatters";
import { useTranslation } from "@/hooks/useTranslation";

interface TotalCellProps {
  total: number;
}

export const TotalCell = forwardRef<HTMLTableCellElement, TotalCellProps>(
  ({ total }, ref) => {
    const { language } = useTranslation();
    
    return (
      <TableCell className="text-center font-semibold" ref={ref}>
        {formatCurrency(total, 'SAR', language)}
      </TableCell>
    );
  }
);

TotalCell.displayName = "TotalCell";
