
import React from "react";
import { AlertTriangle, Bell, CreditCard, FileText, Package, Settings, Users } from "lucide-react";
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
    icon: <Package size={16} /> 
  },
  { 
    id: "inventory.out_of_stock", 
    name: "نفاد المخزون", 
    description: "عند نفاد مخزون منتج", 
    icon: <Package size={16} /> 
  },
  { 
    id: "expenses.pending_approval", 
    name: "مصروف ينتظر الموافقة", 
    description: "عند إنشاء مصروف جديد يحتاج موافقة", 
    icon: <CreditCard size={16} /> 
  },
  { 
    id: "expenses.approved", 
    name: "تمت الموافقة على المصروف", 
    description: "عند الموافقة على مصروف", 
    icon: <CreditCard size={16} /> 
  },
  { 
    id: "expenses.rejected", 
    name: "تم رفض المصروف", 
    description: "عند رفض مصروف", 
    icon: <CreditCard size={16} /> 
  },
  { 
    id: "invoices.created", 
    name: "تم إنشاء فاتورة جديدة", 
    description: "عند إنشاء فاتورة جديدة", 
    icon: <FileText size={16} /> 
  },
  { 
    id: "invoices.paid", 
    name: "تم دفع فاتورة", 
    description: "عند دفع قيمة فاتورة", 
    icon: <FileText size={16} /> 
  },
  { 
    id: "invoices.overdue", 
    name: "فاتورة متأخرة", 
    description: "عند تأخر سداد فاتورة عن موعدها", 
    icon: <FileText size={16} /> 
  },
  { 
    id: "customer.payment_received", 
    name: "تم استلام دفعة من العميل", 
    description: "عند استلام دفعة من العميل", 
    icon: <Users size={16} /> 
  },
  { 
    id: "customer.credit_limit_reached", 
    name: "تجاوز الحد الائتماني", 
    description: "عند وصول عميل إلى حد الائتمان المسموح", 
    icon: <Users size={16} /> 
  },
  { 
    id: "system.backup_complete", 
    name: "اكتمال النسخ الاحتياطي", 
    description: "عند اكتمال النسخ الاحتياطي للنظام بنجاح", 
    icon: <Settings size={16} /> 
  },
  { 
    id: "system.backup_failed", 
    name: "فشل النسخ الاحتياطي", 
    description: "عند فشل النسخ الاحتياطي للنظام", 
    icon: <Settings size={16} /> 
  },
  { 
    id: "system.login_failed", 
    name: "فشل تسجيل الدخول", 
    description: "عند تسجيل محاولة دخول فاشلة للنظام", 
    icon: <AlertTriangle size={16} /> 
  },
  { 
    id: "system.suspicious_activity", 
    name: "نشاط مشبوه", 
    description: "عند اكتشاف نشاط مشبوه في الحساب", 
    icon: <AlertTriangle size={16} /> 
  },
];
