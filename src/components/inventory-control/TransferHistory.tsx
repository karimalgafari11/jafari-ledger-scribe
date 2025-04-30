
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, FileText, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { mockStockMovements } from "@/data/mockStockMovements";

export function TransferHistory() {
  const transfers = mockStockMovements.filter((m) => m.type === "transfer");

  // Helper function to format the date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleViewDetails = (id: string) => {
    toast.info(`عرض تفاصيل حركة النقل: ${id}`);
  };

  const handlePrintTransfer = (id: string) => {
    toast.info(`جاري طباعة مستند النقل: ${id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">سجل عمليات النقل</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>التاريخ</TableHead>
                <TableHead>الصنف</TableHead>
                <TableHead>الكمية</TableHead>
                <TableHead>من</TableHead>
                <TableHead>إلى</TableHead>
                <TableHead>ملاحظات</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-muted-foreground"
                  >
                    لا توجد عمليات نقل سابقة
                  </TableCell>
                </TableRow>
              ) : (
                transfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell>{formatDate(transfer.date)}</TableCell>
                    <TableCell>{transfer.itemName}</TableCell>
                    <TableCell>{transfer.quantity}</TableCell>
                    <TableCell>{transfer.sourceWarehouse}</TableCell>
                    <TableCell>{transfer.destinationWarehouse}</TableCell>
                    <TableCell>
                      {transfer.notes || (
                        <span className="text-muted-foreground text-sm">
                          -
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(transfer.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePrintTransfer(transfer.id)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
