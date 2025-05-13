
import React from 'react';
import { AlertCircle, Check, Clock, FileText, FileWarning, PieChart, RefreshCw, ShieldAlert, ShoppingCart, User, CreditCard, Bell, DollarSign, Package } from 'lucide-react';

export const notificationEvents = [
  {
    id: 'inventory.low_stock',
    name: 'مخزون منخفض',
    description: 'عند وصول مخزون منتج إلى مستوى منخفض',
    icon: <Package className="h-5 w-5 text-amber-500" />
  },
  {
    id: 'inventory.out_of_stock',
    name: 'نفاد المخزون',
    description: 'عند نفاد مخزون منتج',
    icon: <ShoppingCart className="h-5 w-5 text-red-500" />
  },
  {
    id: 'expenses.pending_approval',
    name: 'مصروف ينتظر الموافقة',
    description: 'عند إنشاء مصروف جديد يحتاج موافقة',
    icon: <FileText className="h-5 w-5 text-amber-500" />
  },
  {
    id: 'expenses.approved',
    name: 'تمت الموافقة على المصروف',
    description: 'عند الموافقة على مصروف',
    icon: <Check className="h-5 w-5 text-green-500" />
  },
  {
    id: 'expenses.rejected',
    name: 'تم رفض المصروف',
    description: 'عند رفض مصروف',
    icon: <FileWarning className="h-5 w-5 text-red-500" />
  },
  {
    id: 'invoices.created',
    name: 'تم إنشاء فاتورة جديدة',
    description: 'عند إنشاء فاتورة جديدة',
    icon: <FileText className="h-5 w-5 text-blue-500" />
  },
  {
    id: 'invoices.paid',
    name: 'تم دفع فاتورة',
    description: 'عند دفع قيمة فاتورة',
    icon: <CreditCard className="h-5 w-5 text-green-500" />
  },
  {
    id: 'invoices.overdue',
    name: 'فاتورة متأخرة',
    description: 'عند تأخر سداد فاتورة عن موعدها',
    icon: <Clock className="h-5 w-5 text-red-500" />
  },
  {
    id: 'customer.payment_received',
    name: 'تم استلام دفعة من العميل',
    description: 'عند استلام دفعة من العميل',
    icon: <DollarSign className="h-5 w-5 text-green-500" />
  },
  {
    id: 'customer.credit_limit_reached',
    name: 'تم الوصول للحد الائتماني',
    description: 'عند وصول عميل إلى حد الائتمان المسموح',
    icon: <AlertCircle className="h-5 w-5 text-amber-500" />
  },
  {
    id: 'system.backup_complete',
    name: 'اكتمال النسخ الاحتياطي',
    description: 'عند اكتمال النسخ الاحتياطي للنظام بنجاح',
    icon: <RefreshCw className="h-5 w-5 text-green-500" />
  },
  {
    id: 'system.backup_failed',
    name: 'فشل النسخ الاحتياطي',
    description: 'عند فشل النسخ الاحتياطي للنظام',
    icon: <AlertCircle className="h-5 w-5 text-red-500" />
  },
  {
    id: 'system.login_failed',
    name: 'فشل تسجيل الدخول',
    description: 'عند تسجيل محاولة دخول فاشلة للنظام',
    icon: <User className="h-5 w-5 text-amber-500" />
  },
  {
    id: 'system.suspicious_activity',
    name: 'نشاط مشبوه',
    description: 'عند اكتشاف نشاط مشبوه في الحساب',
    icon: <ShieldAlert className="h-5 w-5 text-red-500" />
  },
];
