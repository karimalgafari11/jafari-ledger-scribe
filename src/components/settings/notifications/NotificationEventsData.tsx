
import React from "react";
import { AlertTriangle } from "lucide-react";
import { NotificationEvent } from "@/types/notifications";

export interface NotificationEventItem {
  id: NotificationEvent;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const notificationEvents: NotificationEventItem[] = [
  { 
    id: "inventory.low_stock", 
    name: "مخزون منخفض", 
    description: "عند وصول مخزون منتج إلى مستوى منخفض", 
    icon: <AlertTriangle size={16} /> 
  },
  { 
    id: "inventory.out_of_stock", 
    name: "نفاد المخزون", 
    description: "عند نفاد مخزون منتج", 
    icon: <AlertTriangle size={16} /> 
  },
  { 
    id: "expenses.pending_approval", 
    name: "مصروف ينتظر الموافقة", 
    description: "عند إنشاء مصروف جديد يحتاج موافقة", 
    icon: <AlertTriangle size={16} /> 
  },
  { 
    id: "invoices.overdue", 
    name: "فاتورة متأخرة", 
    description: "عند تأخر سداد فاتورة عن موعدها", 
    icon: <AlertTriangle size={16} /> 
  },
  { 
    id: "customer.credit_limit_reached", 
    name: "تجاوز الحد الائتماني", 
    description: "عند وصول عميل إلى حد الائتمان المسموح", 
    icon: <AlertTriangle size={16} /> 
  },
];
