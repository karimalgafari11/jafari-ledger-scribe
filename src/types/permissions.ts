
// إذا لم يكن الملف موجوداً أو ناقصاً، نقوم بتعريف ActivityAction
export type ActivityAction = 
  // عمليات المستخدمين
  | 'user_login'
  | 'user_logout'
  | 'user_register'
  | 'user_update'
  | 'user_delete'
  | 'user_password_reset'
  
  // عمليات الحسابات
  | 'account_create'
  | 'account_update'
  | 'account_delete'
  | 'account_view'
  
  // عمليات دفتر اليومية والقيود
  | 'journal_create'
  | 'journal_update'
  | 'journal_delete'
  | 'journal_post'
  | 'journal_view'
  
  // عمليات المنتجات والمخزون
  | 'product_create'
  | 'product_update'
  | 'product_delete'
  | 'product_view'
  | 'inventory_count'
  | 'inventory_adjust'
  
  // عمليات الفواتير
  | 'invoice_create'
  | 'invoice_update'
  | 'invoice_delete'
  | 'invoice_post'
  | 'invoice_view'
  | 'invoice_print'
  
  // عمليات العملاء والموردين
  | 'customer_create'
  | 'customer_update'
  | 'customer_delete'
  | 'customer_view'
  | 'vendor_create'
  | 'vendor_update'
  | 'vendor_delete'
  | 'vendor_view'
  
  // عمليات أخرى
  | 'report_generate'
  | 'report_view'
  | 'setting_update'
  | 'system_backup'
  | 'system_restore'
  | string; // السماح بأي نص (للمرونة)

// تعريف UserActivity إذا كان ضرورياً
export interface UserActivity {
  id: string;
  userId: string;
  username: string;
  action: ActivityAction;
  module: string;
  details: string;
  status: 'success' | 'failed' | 'warning';
  timestamp: Date;
  ipAddress?: string;
}
