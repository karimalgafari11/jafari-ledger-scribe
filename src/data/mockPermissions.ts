
import { 
  UserRole, 
  Permission, 
  PermissionCategory, 
  PermissionGroup,
  UserActivity,
  SecuritySettings,
  UserPermissions,
  PermissionMatrix
} from '@/types/permissions';

// تعريف الصلاحيات حسب الفئات
export const mockPermissions: Permission[] = [
  // صلاحيات المحاسبة
  { id: 'acc-view', code: 'accounting.view', name: 'عرض البيانات المحاسبية', category: 'accounting', description: 'صلاحية عرض البيانات المحاسبية والحسابات' },
  { id: 'acc-edit', code: 'accounting.edit', name: 'تعديل البيانات المحاسبية', category: 'accounting', description: 'صلاحية تعديل البيانات المحاسبية والحسابات' },
  { id: 'acc-create', code: 'accounting.create', name: 'إنشاء قيود محاسبية', category: 'accounting', description: 'صلاحية إنشاء قيود محاسبية جديدة' },
  { id: 'acc-delete', code: 'accounting.delete', name: 'حذف قيود محاسبية', category: 'accounting', description: 'صلاحية حذف القيود المحاسبية' },
  { id: 'acc-approve', code: 'accounting.approve', name: 'اعتماد قيود محاسبية', category: 'accounting', description: 'صلاحية اعتماد القيود المحاسبية' },
  { id: 'acc-period', code: 'accounting.period', name: 'إدارة الفترات المحاسبية', category: 'accounting', description: 'صلاحية إدارة الفترات المحاسبية وإغلاقها' },

  // صلاحيات المخزون
  { id: 'inv-view', code: 'inventory.view', name: 'عرض المخزون', category: 'inventory', description: 'صلاحية عرض بيانات المخزون والأصناف' },
  { id: 'inv-edit', code: 'inventory.edit', name: 'تعديل المخزون', category: 'inventory', description: 'صلاحية تعديل بيانات المخزون والأصناف' },
  { id: 'inv-create', code: 'inventory.create', name: 'إضافة أصناف', category: 'inventory', description: 'صلاحية إضافة أصناف جديدة للمخزون' },
  { id: 'inv-delete', code: 'inventory.delete', name: 'حذف أصناف', category: 'inventory', description: 'صلاحية حذف أصناف من المخزون' },
  { id: 'inv-transfer', code: 'inventory.transfer', name: 'نقل مخزون', category: 'inventory', description: 'صلاحية نقل المخزون بين المستودعات' },
  { id: 'inv-count', code: 'inventory.count', name: 'جرد المخزون', category: 'inventory', description: 'صلاحية إجراء عمليات جرد المخزون' },

  // صلاحيات المبيعات
  { id: 'sales-view', code: 'sales.view', name: 'عرض المبيعات', category: 'sales', description: 'صلاحية عرض بيانات المبيعات والفواتير' },
  { id: 'sales-create', code: 'sales.create', name: 'إنشاء فواتير', category: 'sales', description: 'صلاحية إنشاء فواتير مبيعات جديدة' },
  { id: 'sales-edit', code: 'sales.edit', name: 'تعديل فواتير', category: 'sales', description: 'صلاحية تعديل فواتير المبيعات' },
  { id: 'sales-delete', code: 'sales.delete', name: 'حذف فواتير', category: 'sales', description: 'صلاحية حذف فواتير المبيعات' },
  { id: 'sales-returns', code: 'sales.returns', name: 'إدارة المرتجعات', category: 'sales', description: 'صلاحية إدارة مرتجعات المبيعات' },
  { id: 'sales-discount', code: 'sales.discount', name: 'منح خصومات', category: 'sales', description: 'صلاحية منح خصومات على المبيعات' },

  // صلاحيات العملاء
  { id: 'cust-view', code: 'customers.view', name: 'عرض بيانات العملاء', category: 'customers', description: 'صلاحية عرض بيانات العملاء وحساباتهم' },
  { id: 'cust-edit', code: 'customers.edit', name: 'تعديل بيانات العملاء', category: 'customers', description: 'صلاحية تعديل بيانات العملاء' },
  { id: 'cust-create', code: 'customers.create', name: 'إضافة عملاء', category: 'customers', description: 'صلاحية إضافة عملاء جدد' },
  { id: 'cust-delete', code: 'customers.delete', name: 'حذف عملاء', category: 'customers', description: 'صلاحية حذف بيانات العملاء' },

  // صلاحيات المصروفات
  { id: 'exp-view', code: 'expenses.view', name: 'عرض المصروفات', category: 'expenses', description: 'صلاحية عرض بيانات المصروفات' },
  { id: 'exp-create', code: 'expenses.create', name: 'إضافة مصروفات', category: 'expenses', description: 'صلاحية إضافة مصروفات جديدة' },
  { id: 'exp-edit', code: 'expenses.edit', name: 'تعديل مصروفات', category: 'expenses', description: 'صلاحية تعديل بيانات المصروفات' },
  { id: 'exp-delete', code: 'expenses.delete', name: 'حذف مصروفات', category: 'expenses', description: 'صلاحية حذف المصروفات' },
  { id: 'exp-approve', code: 'expenses.approve', name: 'اعتماد مصروفات', category: 'expenses', description: 'صلاحية اعتماد المصروفات' },

  // صلاحيات التقارير
  { id: 'rep-view', code: 'reports.view', name: 'عرض التقارير', category: 'reports', description: 'صلاحية عرض التقارير المختلفة' },
  { id: 'rep-create', code: 'reports.create', name: 'إنشاء تقارير', category: 'reports', description: 'صلاحية إنشاء تقارير جديدة' },
  { id: 'rep-edit', code: 'reports.edit', name: 'تعديل قوالب التقارير', category: 'reports', description: 'صلاحية تعديل قوالب التقارير' },
  { id: 'rep-export', code: 'reports.export', name: 'تصدير التقارير', category: 'reports', description: 'صلاحية تصدير التقارير' },

  // صلاحيات الإعدادات
  { id: 'set-view', code: 'settings.view', name: 'عرض الإعدادات', category: 'settings', description: 'صلاحية عرض إعدادات النظام' },
  { id: 'set-edit', code: 'settings.edit', name: 'تعديل الإعدادات', category: 'settings', description: 'صلاحية تعديل إعدادات النظام' },
  { id: 'set-backup', code: 'settings.backup', name: 'النسخ الاحتياطي', category: 'settings', description: 'صلاحية إدارة النسخ الاحتياطي واستعادة البيانات' },

  // صلاحيات إدارة المستخدمين
  { id: 'adm-users-view', code: 'admin.users.view', name: 'عرض المستخدمين', category: 'admin', description: 'صلاحية عرض بيانات المستخدمين' },
  { id: 'adm-users-edit', code: 'admin.users.edit', name: 'تعديل المستخدمين', category: 'admin', description: 'صلاحية تعديل بيانات المستخدمين' },
  { id: 'adm-users-create', code: 'admin.users.create', name: 'إضافة مستخدمين', category: 'admin', description: 'صلاحية إضافة مستخدمين جدد' },
  { id: 'adm-users-delete', code: 'admin.users.delete', name: 'حذف مستخدمين', category: 'admin', description: 'صلاحية حذف المستخدمين' },
  { id: 'adm-roles-manage', code: 'admin.roles.manage', name: 'إدارة الصلاحيات', category: 'admin', description: 'صلاحية إدارة مجموعات المستخدمين والصلاحيات' },
  { id: 'adm-security', code: 'admin.security', name: 'إعدادات الأمان', category: 'admin', description: 'صلاحية إدارة إعدادات الأمان والخصوصية' },
  { id: 'adm-activity', code: 'admin.activity', name: 'سجل الأحداث', category: 'admin', description: 'صلاحية عرض سجل أحداث وأنشطة المستخدمين' }
];

// تقسيم الصلاحيات حسب الفئات
export const permissionGroups: PermissionGroup[] = [
  { category: 'accounting', permissions: mockPermissions.filter(p => p.category === 'accounting') },
  { category: 'inventory', permissions: mockPermissions.filter(p => p.category === 'inventory') },
  { category: 'sales', permissions: mockPermissions.filter(p => p.category === 'sales') },
  { category: 'customers', permissions: mockPermissions.filter(p => p.category === 'customers') },
  { category: 'expenses', permissions: mockPermissions.filter(p => p.category === 'expenses') },
  { category: 'reports', permissions: mockPermissions.filter(p => p.category === 'reports') },
  { category: 'settings', permissions: mockPermissions.filter(p => p.category === 'settings') },
  { category: 'admin', permissions: mockPermissions.filter(p => p.category === 'admin') }
];

// تعريف أدوار المستخدمين
export const mockUserRoles: UserRole[] = [
  {
    id: 'admin',
    name: 'مدير النظام',
    description: 'صلاحيات كاملة للنظام',
    permissions: mockPermissions,
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
    isSystem: true
  },
  {
    id: 'manager',
    name: 'مدير',
    description: 'مدير مع صلاحيات واسعة لكن مقيدة',
    permissions: mockPermissions.filter(p => 
      !(['admin.security', 'admin.roles.manage', 'settings.backup'].includes(p.code))
    ),
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 2, 15),
    isSystem: true
  },
  {
    id: 'accountant',
    name: 'محاسب',
    description: 'صلاحيات محاسبية ومالية',
    permissions: mockPermissions.filter(p => 
      p.category === 'accounting' || 
      p.category === 'reports' || 
      ['expenses.view', 'expenses.create', 'expenses.edit'].includes(p.code)
    ),
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 1, 10),
    isSystem: true
  },
  {
    id: 'inventory',
    name: 'أمين مخزن',
    description: 'إدارة المخزون والأصناف',
    permissions: mockPermissions.filter(p => 
      p.category === 'inventory' || 
      ['reports.view', 'reports.export'].includes(p.code)
    ),
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
    isSystem: true
  },
  {
    id: 'sales',
    name: 'مندوب مبيعات',
    description: 'إدارة المبيعات والعملاء',
    permissions: mockPermissions.filter(p => 
      p.category === 'sales' || 
      p.category === 'customers' || 
      ['reports.view', 'reports.export'].includes(p.code)
    ),
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 3, 5),
    isSystem: true
  },
  {
    id: 'viewer',
    name: 'مطلع',
    description: 'صلاحيات عرض فقط',
    permissions: mockPermissions.filter(p => p.code.includes('view') || p.code.includes('export')),
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
    isSystem: true
  }
];

// مصفوفة الصلاحيات
export const mockPermissionMatrix: PermissionMatrix = {
  'admin': {
    'accounting': { canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, canImport: true },
    'inventory': { canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, canImport: true },
    'sales': { canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, canImport: true },
    'customers': { canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, canImport: true },
    'expenses': { canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, canImport: true },
    'reports': { canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, canImport: true },
    'settings': { canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, canImport: true },
    'admin': { canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, canImport: true }
  },
  'accountant': {
    'accounting': { canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: true, canExport: true, canImport: true },
    'inventory': { canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: true, canImport: false },
    'sales': { canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: true, canImport: false },
    'customers': { canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: true, canImport: false },
    'expenses': { canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: true, canExport: true, canImport: true },
    'reports': { canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: false, canExport: true, canImport: false },
    'settings': { canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: false, canImport: false },
    'admin': { canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: false, canImport: false }
  }
};

// سجل الأنشطة والأحداث
export const mockUserActivities: UserActivity[] = [
  {
    id: '1',
    userId: '1',
    username: 'admin',
    action: 'login',
    module: 'auth',
    details: 'تسجيل دخول ناجح',
    timestamp: new Date(2025, 3, 30, 9, 15),
    ipAddress: '192.168.1.100',
    status: 'success'
  },
  {
    id: '2',
    userId: '2',
    username: 'accountant1',
    action: 'create',
    module: 'accounting',
    details: 'إنشاء قيد محاسبي جديد: ق-2025-042',
    timestamp: new Date(2025, 3, 30, 10, 22),
    ipAddress: '192.168.1.102',
    status: 'success',
    metadata: { journalId: 'J-2025-042', amount: 1500 }
  },
  {
    id: '3',
    userId: '3',
    username: 'inventory1',
    action: 'update',
    module: 'inventory',
    details: 'تحديث مخزون منتج: OIL-FILTER-001',
    timestamp: new Date(2025, 3, 30, 11, 5),
    ipAddress: '192.168.1.105',
    status: 'success',
    metadata: { productId: 'OIL-FILTER-001', quantity: 50 }
  },
  {
    id: '4',
    userId: '2',
    username: 'accountant1',
    action: 'approve',
    module: 'expenses',
    details: 'اعتماد مصروف: مصروفات تشغيلية - 2500 ريال',
    timestamp: new Date(2025, 3, 30, 12, 30),
    ipAddress: '192.168.1.102',
    status: 'success',
    metadata: { expenseId: 'EXP-2025-015', amount: 2500 }
  },
  {
    id: '5',
    userId: '1',
    username: 'admin',
    action: 'backup',
    module: 'settings',
    details: 'إنشاء نسخة احتياطية للنظام',
    timestamp: new Date(2025, 3, 30, 23, 0),
    ipAddress: '192.168.1.100',
    status: 'success',
    metadata: { backupId: 'BK20250430', size: '42.7 MB' }
  },
  {
    id: '6',
    userId: '4',
    username: 'sales1',
    action: 'create',
    module: 'sales',
    details: 'إنشاء فاتورة مبيعات جديدة: ف-2025-136',
    timestamp: new Date(2025, 3, 30, 15, 40),
    ipAddress: '192.168.1.110',
    status: 'success',
    metadata: { invoiceId: 'INV-2025-136', amount: 3750, customerId: 'CUST-0054' }
  },
  {
    id: '7',
    userId: '5',
    username: 'user5',
    action: 'login',
    module: 'auth',
    details: 'محاولة تسجيل دخول فاشلة',
    timestamp: new Date(2025, 3, 30, 8, 5),
    ipAddress: '192.168.1.120',
    status: 'failed'
  },
  {
    id: '8',
    userId: '1',
    username: 'admin',
    action: 'update',
    module: 'admin',
    details: 'تحديث صلاحيات المستخدم: user3',
    timestamp: new Date(2025, 3, 30, 16, 15),
    ipAddress: '192.168.1.100',
    status: 'success',
    metadata: { targetUserId: '3', roleId: 'inventory' }
  },
  {
    id: '9',
    userId: '2',
    username: 'accountant1',
    action: 'export',
    module: 'reports',
    details: 'تصدير تقرير: أرصدة الحسابات',
    timestamp: new Date(2025, 3, 30, 14, 30),
    ipAddress: '192.168.1.102',
    status: 'success',
    metadata: { reportId: 'REP-ACC-BAL', format: 'excel' }
  },
  {
    id: '10',
    userId: '6',
    username: 'manager1',
    action: 'view',
    module: 'accounting',
    details: 'عرض تقرير الأرباح والخسائر',
    timestamp: new Date(2025, 3, 30, 17, 0),
    ipAddress: '192.168.1.115',
    status: 'success',
    metadata: { reportId: 'REP-PL', periodId: '2025-Q1' }
  }
];

// إعدادات الأمان
export const mockSecuritySettings: SecuritySettings = {
  id: '1',
  passwordPolicy: {
    minimumLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    passwordExpiryDays: 90,
    preventPasswordReuse: 5,
    lockoutThreshold: 5,
    lockoutDurationMinutes: 15
  },
  loginSettings: {
    maxFailedAttempts: 5,
    lockoutDurationMinutes: 15,
    requireTwoFactor: false,
    sessionTimeoutMinutes: 30,
    allowMultipleSessions: true,
    allowRememberMe: true
  },
  dataAccessControls: {
    restrictBranchAccess: true,
    restrictDataByDate: false,
    restrictedDateRangeDays: 365,
    hideFinancialFigures: false,
    restrictExports: false,
    auditAllChanges: true
  },
  encryptionSettings: {
    encryptionEnabled: true,
    encryptionType: 'standard',
    keyRotationDays: 90,
    lastKeyRotation: new Date(2025, 3, 1)
  },
  updatedAt: new Date(2025, 3, 1),
  updatedBy: 'admin'
};
