
import React from "react";
import { Invoice } from "@/types/invoices";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { MoreHorizontal, Eye, Edit, Copy, Trash, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface InvoicesTableProps {
  invoices: Invoice[];
  isLoading: boolean;
  selectedInvoices: string[];
  onToggleSelection: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export const InvoicesTable: React.FC<InvoicesTableProps> = ({
  invoices,
  isLoading,
  selectedInvoices,
  onToggleSelection,
  onView,
  onEdit,
  onDelete,
  onDuplicate
}) => {
  // تنسيق حالة الفاتورة
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">مدفوعة</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">قيد الانتظار</Badge>;
      case "overdue":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100">متأخرة</Badge>;
      case "draft":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">مسودة</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // تنسيق طريقة الدفع
  const formatPaymentMethod = (method: string) => {
    return method === "cash" ? "نقدي" : "آجل";
  };

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr className="text-xs font-medium text-gray-500">
              <th className="p-4">
                <Skeleton className="h-4 w-4" />
              </th>
              <th className="p-4 text-right"><Skeleton className="h-4 w-20" /></th>
              <th className="p-4 text-right"><Skeleton className="h-4 w-24" /></th>
              <th className="p-4 text-right"><Skeleton className="h-4 w-16" /></th>
              <th className="p-4 text-right"><Skeleton className="h-4 w-16" /></th>
              <th className="p-4 text-right"><Skeleton className="h-4 w-16" /></th>
              <th className="p-4 text-right"><Skeleton className="h-4 w-16" /></th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b">
                <td className="p-4"><Skeleton className="h-4 w-4" /></td>
                <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                <td className="p-4"><Skeleton className="h-4 w-32" /></td>
                <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                <td className="p-4"><Skeleton className="h-8 w-8" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="p-8 text-center">
        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-lg font-medium">لا توجد فواتير</p>
        <p className="mt-1 text-sm text-gray-500">
          لم يتم العثور على أي فواتير مطابقة لمعايير البحث.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr className="text-xs font-medium text-gray-500">
            <th className="p-4 text-center w-12">
              <span className="sr-only">تحديد</span>
            </th>
            <th className="p-4 text-right">رقم الفاتورة</th>
            <th className="p-4 text-right">العميل</th>
            <th className="p-4 text-right">التاريخ</th>
            <th className="p-4 text-right">المبلغ</th>
            <th className="p-4 text-right">طريقة الدفع</th>
            <th className="p-4 text-right">الحالة</th>
            <th className="p-4 text-center w-20">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr 
              key={invoice.id} 
              className="border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => onView(invoice.id)}
            >
              <td className="p-4 text-center" onClick={(e) => {
                e.stopPropagation();
                onToggleSelection(invoice.id);
              }}>
                <Checkbox
                  checked={selectedInvoices.includes(invoice.id)}
                  onCheckedChange={() => onToggleSelection(invoice.id)}
                  aria-label={`تحديد الفاتورة ${invoice.invoiceNumber}`}
                />
              </td>
              <td className="p-4 font-medium">{invoice.invoiceNumber}</td>
              <td className="p-4">{invoice.customerName}</td>
              <td className="p-4">{format(new Date(invoice.date), "dd MMMM yyyy", { locale: ar })}</td>
              <td className="p-4 font-medium">{invoice.totalAmount.toLocaleString()} ر.س</td>
              <td className="p-4">{formatPaymentMethod(invoice.paymentMethod)}</td>
              <td className="p-4">{getStatusBadge(invoice.status)}</td>
              <td className="p-4">
                <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">فتح القائمة</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(invoice.id)}>
                        <Eye className="ml-2 h-4 w-4" />
                        <span>عرض</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(invoice.id)}>
                        <Edit className="ml-2 h-4 w-4" />
                        <span>تعديل</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate(invoice.id)}>
                        <Copy className="ml-2 h-4 w-4" />
                        <span>نسخ</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600" 
                        onClick={() => onDelete(invoice.id)}
                      >
                        <Trash className="ml-2 h-4 w-4" />
                        <span>حذف</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
