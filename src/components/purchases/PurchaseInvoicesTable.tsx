
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PurchaseInvoice } from "@/types/purchases";

interface PurchaseInvoicesTableProps {
  invoices: PurchaseInvoice[];
  isLoading: boolean;
  selectedInvoices: string[];
  onToggleSelection: (id: string) => void;
}

export const PurchaseInvoicesTable: React.FC<PurchaseInvoicesTableProps> = ({
  invoices,
  isLoading,
  selectedInvoices,
  onToggleSelection
}) => {
  const navigate = useNavigate();
  
  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "overdue":
        return "destructive";
      case "draft":
        return "outline";
      default:
        return "secondary";
    }
  };
  
  const statusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "مدفوعة";
      case "pending":
        return "معلقة";
      case "overdue":
        return "متأخرة";
      case "draft":
        return "مسودة";
      default:
        return status;
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md mt-4 bg-gray-50">
        <FileText className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-2 text-lg font-medium">لا توجد فواتير</h3>
        <p className="text-gray-500 mt-1">لم يتم العثور على فواتير مشتريات</p>
        <Button 
          onClick={() => navigate("/purchases/new")} 
          className="mt-4"
        >
          إنشاء فاتورة جديدة
        </Button>
      </div>
    );
  }
  
  return (
    <div className="border rounded-md mt-4 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={invoices.length > 0 && selectedInvoices.length === invoices.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    // تحديد جميع الفواتير
                    invoices.forEach(invoice => {
                      if (!selectedInvoices.includes(invoice.id)) {
                        onToggleSelection(invoice.id);
                      }
                    });
                  } else {
                    // إلغاء تحديد جميع الفواتير
                    invoices.forEach(invoice => {
                      if (selectedInvoices.includes(invoice.id)) {
                        onToggleSelection(invoice.id);
                      }
                    });
                  }
                }}
              />
            </TableHead>
            <TableHead>رقم الفاتورة</TableHead>
            <TableHead>المورد</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead>المبلغ</TableHead>
            <TableHead>المدفوع</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>المستودع</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <Checkbox 
                  checked={selectedInvoices.includes(invoice.id)}
                  onCheckedChange={() => onToggleSelection(invoice.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.vendorName}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{formatCurrency(invoice.totalAmount)}</TableCell>
              <TableCell>
                {invoice.amountPaid ? formatCurrency(invoice.amountPaid) : formatCurrency(0)}
              </TableCell>
              <TableCell>
                <Badge variant={statusBadgeVariant(invoice.status)} className="text-xs">
                  {statusLabel(invoice.status)}
                </Badge>
              </TableCell>
              <TableCell>{invoice.warehouseName || "-"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" onClick={() => navigate(`/purchases/view/${invoice.id}`)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
