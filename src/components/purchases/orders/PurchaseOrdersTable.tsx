
import React from "react";
import { PurchaseOrder } from "@/types/purchases";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/formatters";
import { useNavigate } from "react-router-dom";

interface PurchaseOrdersTableProps {
  orders: PurchaseOrder[];
  selectedOrders: string[];
  onToggleSelection: (id: string) => void;
}

export function PurchaseOrdersTable({ 
  orders, 
  selectedOrders, 
  onToggleSelection 
}: PurchaseOrdersTableProps) {
  const navigate = useNavigate();
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "draft":
        return "secondary";
      case "pending":
        return "warning";
      case "approved":
        return "info";
      case "completed":
        return "success";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "draft":
        return "مسودة";
      case "pending":
        return "قيد الانتظار";
      case "approved":
        return "معتمد";
      case "completed":
        return "مكتمل";
      case "cancelled":
        return "ملغي";
      default:
        return status;
    }
  };
  
  const handleView = (orderId: string) => {
    // For now, just navigate to the edit page as we don't have a separate view page
    navigate(`/purchases/orders/new?id=${orderId}`);
  };
  
  const handleEdit = (orderId: string) => {
    navigate(`/purchases/orders/new?id=${orderId}`);
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={orders.length > 0 && selectedOrders.length === orders.length}
                onCheckedChange={() => {
                  if (selectedOrders.length === orders.length) {
                    // Unselect all
                    onToggleSelection("clear-all");
                  } else {
                    // Select all
                    orders.forEach(order => {
                      if (!selectedOrders.includes(order.id)) {
                        onToggleSelection(order.id);
                      }
                    });
                  }
                }}
              />
            </TableHead>
            <TableHead>رقم الأمر</TableHead>
            <TableHead>المورد</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead>تاريخ التسليم</TableHead>
            <TableHead>إجمالي المبلغ</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>تم بواسطة</TableHead>
            <TableHead className="text-center">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                لا توجد أوامر شراء متاحة
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => onToggleSelection(order.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                <TableCell>{order.vendorName}</TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>{order.deliveryDate ? formatDate(order.deliveryDate) : "غير محدد"}</TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(order.totalAmount)}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </TableCell>
                <TableCell>{order.createdBy}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="عرض"
                      onClick={() => handleView(order.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="تعديل"
                      disabled={order.status === "completed" || order.status === "cancelled"}
                      onClick={() => handleEdit(order.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="حذف"
                      disabled={order.status === "completed"}
                      onClick={() => onToggleSelection(order.id)}
                    >
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
  );
}
