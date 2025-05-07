
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, FileText, CheckCircle } from "lucide-react";
import { InventoryCount } from "@/types/inventory";

interface CountingTableProps {
  counts: InventoryCount[];
  onViewDetails: (id: string) => void;
  onExport: (id: string) => void;
  onComplete: (id: string) => void;
}

export function CountingTable({
  counts,
  onViewDetails,
  onExport,
  onComplete
}: CountingTableProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const getStatusBadge = (status: 'draft' | 'in_progress' | 'completed') => {
    switch (status) {
      case 'draft':
        return <Badge className="bg-amber-500">مسودة</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500">قيد التنفيذ</Badge>;
      case 'completed':
        return <Badge className="bg-green-600">مكتمل</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">التاريخ</TableHead>
            <TableHead className="text-center">المستودع</TableHead>
            <TableHead className="text-center">الحالة</TableHead>
            <TableHead className="text-center">عدد الأصناف</TableHead>
            <TableHead className="text-center">ملاحظات</TableHead>
            <TableHead className="text-center">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {counts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500 text-lg">
                لا توجد عمليات جرد مسجلة
              </TableCell>
            </TableRow>
          ) : (
            counts.map(count => (
              <TableRow key={count.id}>
                <TableCell className="text-center">{formatDate(count.date)}</TableCell>
                <TableCell className="text-center font-medium">{count.warehouseName}</TableCell>
                <TableCell className="text-center">{getStatusBadge(count.status)}</TableCell>
                <TableCell className="text-center">{count.items.length}</TableCell>
                <TableCell className="text-center">{count.notes}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(count.id)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      عرض
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onExport(count.id)}
                      className="gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      طباعة
                    </Button>
                    {count.status !== 'completed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onComplete(count.id)}
                        className="gap-2 text-green-600 hover:text-green-800 hover:bg-green-100"
                      >
                        <CheckCircle className="h-4 w-4" />
                        اعتماد
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
