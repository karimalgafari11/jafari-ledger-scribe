
import { AlertOctagon, AlertTriangle, Bell, Box, CreditCard, Database, DollarSign, FileText, Settings, ShoppingCart, User, UserCheck } from "lucide-react";

export const notificationEvents = [
  {
    id: 'inventory.low_stock',
    name: 'مخزون منخفض',
    description: 'عند وصول مخزون منتج إلى مستوى منخفض',
    icon: <Box size={20} className="text-amber-500" />
  },
  {
    id: 'inventory.out_of_stock',
    name: 'نفاد المخزون',
    description: 'عند نفاد مخزون منتج',
    icon: <AlertTriangle size={20} className="text-red-500" />
  },
  {
    id: 'expenses.pending_approval',
    name: 'مصروف ينتظر الموافقة',
    description: 'عند إنشاء مصروف جديد يحتاج موافقة',
    icon: <DollarSign size={20} className="text-blue-500" />
  },
  {
    id: 'invoices.created',
    name: 'تم إنشاء فاتورة جديدة',
    description: 'عند إنشاء فاتورة جديدة',
    icon: <FileText size={20} className="text-indigo-500" />
  },
  {
    id: 'invoices.overdue',
    name: 'فاتورة متأخرة',
    description: 'عند تأخر سداد فاتورة عن موعدها',
    icon: <AlertOctagon size={20} className="text-red-500" />
  },
  {
    id: 'customer.payment_received',
    name: 'تم استلام دفعة من العميل',
    description: 'عند استلام دفعة من العميل',
    icon: <CreditCard size={20} className="text-green-500" />
  },
  {
    id: 'system.backup_complete',
    name: 'اكتمال النسخ الاحتياطي',
    description: 'عند اكتمال النسخ الاحتياطي للنظام بنجاح',
    icon: <Database size={20} className="text-green-500" />
  },
  {
    id: 'system.backup_failed',
    name: 'فشل النسخ الاحتياطي',
    description: 'عند فشل النسخ الاحتياطي للنظام',
    icon: <AlertOctagon size={20} className="text-red-500" />
  },
  {
    id: 'system.login_failed',
    name: 'فشل تسجيل الدخول',
    description: 'عند تسجيل محاولة دخول فاشلة للنظام',
    icon: <UserCheck size={20} className="text-amber-500" />
  },
  {
    id: 'system.suspicious_activity',
    name: 'نشاط مشبوه',
    description: 'عند اكتشاف نشاط مشبوه في الحساب',
    icon: <AlertTriangle size={20} className="text-red-500" />
  }
];
