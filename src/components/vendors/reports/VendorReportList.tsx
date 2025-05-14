
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Expense } from "@/types/expenses";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { toast } from "sonner";

interface VendorReportListProps {
  vendors: any[];
  filteredExpenses: Expense[];
  title?: string; // Add optional title prop
}

export const VendorReportList: React.FC<VendorReportListProps> = ({
  vendors,
  filteredExpenses,
  title
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // تجميع المشتريات حسب المورد
  const purchasesByVendor = filteredExpenses.reduce((acc, expense) => {
    if (!expense.vendor) return acc;
    
    if (!acc[expense.vendor]) {
      acc[expense.vendor] = {
        totalAmount: 0,
        count: 0,
        lastPurchaseDate: null
      };
    }
    
    acc[expense.vendor].totalAmount += expense.amount;
    acc[expense.vendor].count += 1;
    
    // تحديث آخر تاريخ شراء
    const expenseDate = new Date(expense.date);
    if (!acc[expense.vendor].lastPurchaseDate || 
        expenseDate > new Date(acc[expense.vendor].lastPurchaseDate)) {
      acc[expense.vendor].lastPurchaseDate = expense.date;
    }
    
    return acc;
  }, {});
  
  // تحويل البيانات إلى مصفوفة للعرض في الجدول
  const vendorReportData = Object.keys(purchasesByVendor).map(vendorName => {
    const vendorInfo = vendors.find(v => v.name === vendorName) || {};
    return {
      id: vendorInfo.id || `vendor-${vendorName}`,
      name: vendorName,
      phone: vendorInfo.phone || "-",
      totalAmount: purchasesByVendor[vendorName].totalAmount,
      purchaseCount: purchasesByVendor[vendorName].count,
      lastPurchaseDate: purchasesByVendor[vendorName].lastPurchaseDate
    };
  }).sort((a, b) => b.totalAmount - a.totalAmount);
  
  // تقسيم البيانات حسب الصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vendorReportData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(vendorReportData.length / itemsPerPage);
  
  const handleViewDetails = (vendorId: string) => {
    toast.info(`عرض تفاصيل المورد: ${vendorId}`);
  };
  
  const handleViewStatement = (vendorId: string) => {
    toast.info(`عرض كشف حساب المورد: ${vendorId}`);
  };

  return (
    <div>
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>المورد</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead>إجمالي المشتريات</TableHead>
              <TableHead>عدد المشتريات</TableHead>
              <TableHead>آخر عملية شراء</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell dir="ltr">{item.phone}</TableCell>
                  <TableCell>{formatCurrency(item.totalAmount)} ريال</TableCell>
                  <TableCell>{item.purchaseCount}</TableCell>
                  <TableCell>{item.lastPurchaseDate ? formatDate(new Date(item.lastPurchaseDate)) : "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(item.id)}
                        title="عرض التفاصيل"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewStatement(item.id)}
                        title="كشف حساب"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  لا توجد بيانات مشتريات للعرض
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {vendorReportData.length > itemsPerPage && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                السابق
              </Button>
              <span className="text-sm">
                صفحة {currentPage} من {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                التالي
              </Button>
            </div>
          </Pagination>
        </div>
      )}
      
      <div className="mt-4 text-sm text-muted-foreground">
        إجمالي سجلات المشتريات: {vendorReportData.length}
      </div>
    </div>
  );
};
