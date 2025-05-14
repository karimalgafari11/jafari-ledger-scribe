
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
  status: 'success' | 'failed' | 'warning' | 'info';
  timestamp: Date;
  ipAddress?: string;
  metadata?: Record<string, any>; // إضافة حقل البيانات الوصفية
}

// تعريف أنواع الصلاحيات
export type PermissionCategory = 
  | 'accounting'
  | 'inventory'
  | 'sales'
  | 'customers'
  | 'expenses'
  | 'reports'
  | 'settings'
  | 'admin'
  | 'system'  // Added system category
  | 'finance'  // Added finance category
  | string;

// تعريف واجهة الصلاحيات
export interface Permission {
  id: string;
  code?: string;
  name: string;
  category: PermissionCategory;
  description?: string;
}

// تعريف مجموعة الصلاحيات
export interface PermissionGroup {
  category: PermissionCategory;
  id?: string;  // Added id for compatibility
  name?: string; // Added name for compatibility
  permissions: Permission[];
}

// تعريف دور المستخدم
export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[] | string[];  // Allow either Permission objects or string IDs
  createdAt: Date;
  updatedAt: Date;
  isSystem: boolean;
}

// تعريف صلاحيات المستخدم
export interface UserPermissions {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
  canExport: boolean;
  canImport: boolean;
}

// تعريف مصفوفة الصلاحيات
export interface PermissionMatrix {
  [roleId: string]: {
    [moduleCode: string]: UserPermissions;
  };
}

// تعريف إعدادات الأمان
export interface SecuritySettings {
  id: string;
  passwordPolicy: {
    minimumLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    passwordExpiryDays: number;
    preventPasswordReuse: number;
    lockoutThreshold: number;
    lockoutDurationMinutes: number;
  };
  loginSettings: {
    maxFailedAttempts: number;
    lockoutDurationMinutes: number;
    requireTwoFactor: boolean;
    sessionTimeoutMinutes: number;
    allowMultipleSessions: boolean;
    allowRememberMe: boolean;
  };
  dataAccessControls: {
    restrictBranchAccess: boolean;
    restrictDataByDate: boolean;
    restrictedDateRangeDays: number;
    hideFinancialFigures: boolean;
    restrictExports: boolean;
    auditAllChanges: boolean;
  };
  encryptionSettings: {
    encryptionEnabled: boolean;
    encryptionType: 'standard' | 'advanced';  // Modified to enum type
    keyRotationDays: number;
    lastKeyRotation: Date;
  };
  updatedAt: Date;
  updatedBy: string;
}

// Define the type for ActivityFilter
export interface FiltersType {
  startDate?: Date;
  endDate?: Date;
  userId: string;
  action?: string;
  module?: string;
  status?: string;
  searchText?: string;
}
