
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Trash2, Copy } from 'lucide-react';
import { PurchaseInvoice } from '@/types/purchases';

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
  onToggleSelection,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">مدفوعة</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">معلقة</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">متأخرة</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">مسودة</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="border rounded-md">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={invoices.length > 0 && selectedInvoices.length === invoices.length}
                  onCheckedChange={() => {
                    if (selectedInvoices.length === invoices.length) {
                      onToggleSelection("clear-all"); // استعمال قيمة خاصة لمسح التحديد
                    } else {
                      // تحديد الكل - يتم إدارتها في الوالد
                      invoices.forEach(inv => {
                        if (!selectedInvoices.includes(inv.id)) {
                          onToggleSelection(inv.id);
                        }
                      });
                    }
                  }}
                />
              </TableHead>
              <TableHead>رقم الفاتورة</TableHead>
              <TableHead>المورد</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الإجمالي</TableHead>
              <TableHead>المدفوع</TableHead>
              <TableHead>المتبقي</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10">
                  جاري التحميل...
                </TableCell>
              </TableRow>
            ) : invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10">
                  لا توجد فواتير متاحة
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedInvoices.includes(invoice.id)}
                      onCheckedChange={() => onToggleSelection(invoice.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.vendorName}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString('ar-SA')}</TableCell>
                  <TableCell>{invoice.totalAmount.toLocaleString()} ريال</TableCell>
                  <TableCell>{(invoice.amountPaid || 0).toLocaleString()} ريال</TableCell>
                  <TableCell>
                    {(invoice.totalAmount - (invoice.amountPaid || 0)).toLocaleString()} ريال
                  </TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" title="عرض">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="تعديل">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="نسخ">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="حذف" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
