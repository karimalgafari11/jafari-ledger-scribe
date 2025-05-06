
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Truck, CalendarClock, Check } from "lucide-react";
import { SalesOrdersStatusBadge } from "./SalesOrdersStatusBadge";

export interface SalesOrder {
  id: string;
  date: Date;
  customer: string;
  total: number;
  status: string;
  items: number;
  expectedDelivery: Date;
}

interface SalesOrdersTableProps {
  orders: SalesOrder[];
  onViewOrder: (id: string) => void;
  onProcessOrder: (id: string) => void;
  onShipOrder: (id: string) => void;
  onCompleteOrder: (id: string) => void;
}

export const SalesOrdersTable: React.FC<SalesOrdersTableProps> = ({
  orders,
  onViewOrder,
  onProcessOrder,
  onShipOrder,
  onCompleteOrder,
}) => {
  const formatDate = (date: Date) => {
    return format(date, "yyyy/MM/dd");
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>رقم الأمر</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead>العميل</TableHead>
            <TableHead>عدد الأصناف</TableHead>
            <TableHead>تاريخ التسليم المتوقع</TableHead>
            <TableHead>الإجمالي</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                لا توجد أوامر بيع مطابقة
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{formatDate(order.expectedDelivery)}</TableCell>
                <TableCell>
                  {order.total.toLocaleString("ar-SA")} ريال
                </TableCell>
                <TableCell><SalesOrdersStatusBadge status={order.status} /></TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewOrder(order.id)}
                      title="عرض التفاصيل"
                    >
                      <FileText size={16} />
                    </Button>
                    
                    {order.status === "pending" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onProcessOrder(order.id)}
                        title="بدء التجهيز"
                      >
                        <Truck size={16} />
                      </Button>
                    )}
                    
                    {order.status === "processing" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onShipOrder(order.id)}
                        title="شحن الطلب"
                      >
                        <CalendarClock size={16} />
                      </Button>
                    )}
                    
                    {order.status === "shipped" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCompleteOrder(order.id)}
                        title="إكمال الطلب"
                      >
                        <Check size={16} />
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
};
