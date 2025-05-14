
import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Printer, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatters";

interface Vendor {
  id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  balance: number;
  lastTransaction?: string;
  status: string;
}

interface VendorStatementListProps {
  vendors: Vendor[];
}

export const VendorStatementList: React.FC<VendorStatementListProps> = ({ vendors }) => {
  const navigate = useNavigate();

  const handleViewStatement = (id: string) => {
    navigate(`/vendors/statement/${id}`);
  };

  const getStatusBadge = (status: string, balance: number) => {
    if (balance === 0) return <Badge className="bg-gray-500">بلا رصيد</Badge>;
    if (status === "overdue") return <Badge className="bg-red-500">متأخر</Badge>;
    return <Badge className="bg-green-500">نشط</Badge>;
  };

  return (
    <div className="overflow-x-auto">
      {vendors.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">اسم المورد</TableHead>
              <TableHead>جهة الاتصال</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead>الرصيد المستحق</TableHead>
              <TableHead>آخر معاملة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{vendor.name}</TableCell>
                <TableCell>{vendor.contactPerson || "-"}</TableCell>
                <TableCell dir="ltr" className="text-left">{vendor.phone || "-"}</TableCell>
                <TableCell className={vendor.balance > 0 ? "font-bold text-red-600" : ""}>
                  {formatCurrency(vendor.balance)} ريال
                </TableCell>
                <TableCell>{vendor.lastTransaction || "-"}</TableCell>
                <TableCell>{getStatusBadge(vendor.status, vendor.balance)}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewStatement(vendor.id)}
                    >
                      <FileText size={16} className="ml-1" />
                      كشف الحساب
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Printer size={16} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Download size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">لا يوجد موردين للعرض</p>
        </div>
      )}
    </div>
  );
};
