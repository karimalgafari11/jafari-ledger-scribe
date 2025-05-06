
import React from "react";
import { Badge } from "@/components/ui/badge";

interface SalesOrdersStatusBadgeProps {
  status: string;
}

export const SalesOrdersStatusBadge: React.FC<SalesOrdersStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "pending":
      return <Badge variant="warning">قيد الانتظار</Badge>;
    case "processing":
      return <Badge variant="info" className="bg-purple-100 text-purple-800 hover:bg-purple-200">قيد التجهيز</Badge>;
    case "shipped":
      return <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">تم الشحن</Badge>;
    case "completed":
      return <Badge variant="success">مكتمل</Badge>;
    case "cancelled":
      return <Badge variant="destructive">ملغي</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};
