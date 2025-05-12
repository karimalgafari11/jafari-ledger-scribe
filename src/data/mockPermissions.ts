export const mockUserRoles = [
  {
    id: 'admin',
    name: 'مدير النظام',
    permissions: ['all'],
    description: 'صلاحيات كاملة للنظام'
  },
  {
    id: 'manager',
    name: 'مدير',
    permissions: ['manage_users', 'manage_inventory', 'manage_finance', 'view_reports'],
    description: 'إدارة كافة العمليات بدون تعديل إعدادات النظام'
  },
  {
    id: 'accountant',
    name: 'محاسب',
    permissions: ['manage_finance', 'view_reports'],
    description: 'إدارة المالية وعرض التقارير'
  },
  {
    id: 'inventory',
    name: 'مخزون',
    permissions: ['manage_inventory', 'view_inventory_reports'],
    description: 'إدارة المخزون وعرض تقارير المخزون'
  },
  {
    id: 'sales',
    name: 'مبيعات',
    permissions: ['manage_sales', 'view_customers', 'view_sales_reports'],
    description: 'إدارة المبيعات وعرض العملاء وتقارير المبيعات'
  }
];

export const mockPermissionGroups = [
  {
    id: 'system',
    name: 'إدارة النظام',
    category: 'system',
    permissions: [
      { id: 'manage_settings', name: 'إدارة إعدادات النظام', category: 'system' },
      { id: 'manage_users', name: 'إدارة المستخدمين', category: 'system' },
      { id: 'manage_roles', name: 'إدارة الصلاحيات', category: 'system' },
      { id: 'view_activity_log', name: 'عرض سجل النشاط', category: 'system' },
      { id: 'manage_backup', name: 'إدارة النسخ الاحتياطي', category: 'system' }
    ]
  },
  {
    id: 'finance',
    name: 'المالية',
    category: 'finance',
    permissions: [
      { id: 'view_finance', name: 'عرض البيانات المالية', category: 'finance' },
      { id: 'manage_finance', name: 'إدارة البيانات المالية', category: 'finance' },
      { id: 'create_journal', name: 'إنشاء قيود محاسبية', category: 'finance' },
      { id: 'approve_journal', name: 'اعتماد قيود محاسبية', category: 'finance' },
      { id: 'view_reports', name: 'عرض التقارير المالية', category: 'finance' }
    ]
  },
  {
    id: 'inventory',
    name: 'المخزون',
    category: 'inventory',
    permissions: [
      { id: 'view_inventory', name: 'عرض المخزون', category: 'inventory' },
      { id: 'manage_inventory', name: 'إدارة المخزون', category: 'inventory' },
      { id: 'create_purchase', name: 'إنشاء أوامر شراء', category: 'inventory' },
      { id: 'approve_purchase', name: 'اعتماد أوامر شراء', category: 'inventory' },
      { id: 'view_inventory_reports', name: 'عرض تقارير المخزون', category: 'inventory' }
    ]
  },
  {
    id: 'sales',
    name: 'المبيعات',
    category: 'sales',
    permissions: [
      { id: 'view_sales', name: 'عرض المبيعات', category: 'sales' },
      { id: 'manage_sales', name: 'إدارة المبيعات', category: 'sales' },
      { id: 'view_customers', name: 'عرض العملاء', category: 'sales' },
      { id: 'manage_customers', name: 'إدارة العملاء', category: 'sales' },
      { id: 'view_sales_reports', name: 'عرض تقارير المبيعات', category: 'sales' }
    ]
  }
];

// Add the missing exports that are referenced in other files

// Mock permissions for usePermissions.ts
export const mockPermissions = mockPermissionGroups.flatMap(group => 
  group.permissions.map(permission => ({
    ...permission,
    category: group.category
  }))
);

// Alias for backward compatibility
export const permissionGroups = mockPermissionGroups;

// Mock permission matrix for usePermissions.ts
export const mockPermissionMatrix = {
  'admin': {
    'accounting': {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApprove: true,
      canExport: true,
      canImport: true,
    },
    'inventory': {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApprove: true,
      canExport: true,
      canImport: true,
    }
  },
  'manager': {
    'accounting': {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canApprove: true,
      canExport: true,
      canImport: false,
    },
    'inventory': {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canApprove: true,
      canExport: true,
      canImport: true,
    }
  },
  'accountant': {
    'accounting': {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canApprove: false,
      canExport: true,
      canImport: false,
    },
    'inventory': {
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canApprove: false,
      canExport: true,
      canImport: false,
    }
  }
};

// Mock security settings for usePermissions.ts
export const mockSecuritySettings = {
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
    lockoutDurationMinutes: 30
  },
  loginSettings: {
    maxFailedAttempts: 5,
    lockoutDurationMinutes: 30,
    requireTwoFactor: false,
    sessionTimeoutMinutes: 60,
    allowMultipleSessions: true,
    allowRememberMe: true
  },
  dataAccessControls: {
    restrictBranchAccess: true,
    restrictDataByDate: true,
    restrictedDateRangeDays: 90,
    hideFinancialFigures: false,
    restrictExports: false,
    auditAllChanges: true
  },
  encryptionSettings: {
    encryptionEnabled: true,
    encryptionType: 'standard' as const,
    keyRotationDays: 180,
    lastKeyRotation: new Date('2023-01-01')
  },
  updatedAt: new Date('2023-06-15'),
  updatedBy: 'admin'
};

// Mock user activities for useUserActivity.ts
export const mockUserActivities = [
  {
    id: 'act-001',
    userId: '1',
    username: 'ahmed.mohamed',
    action: 'user_login',
    module: 'auth',
    details: 'تسجيل دخول ناجح',
    status: 'success' as 'success' | 'failed' | 'warning' | 'info',
    timestamp: new Date('2023-05-12T10:30:00'),
    ipAddress: '192.168.1.105'
  },
  {
    id: 'act-002',
    userId: '1',
    username: 'ahmed.mohamed',
    action: 'setting_update',
    module: 'settings',
    details: 'تحديث إعدادات النظام',
    status: 'success' as 'success' | 'failed' | 'warning' | 'info',
    timestamp: new Date('2023-05-12T11:45:00'),
    ipAddress: '192.168.1.105'
  },
  {
    id: 'act-003',
    userId: '2',
    username: 'sara.abdullah',
    action: 'invoice_create',
    module: 'invoices',
    details: 'إنشاء فاتورة جديدة رقم INV-2023-054',
    status: 'success' as 'success' | 'failed' | 'warning' | 'info',
    timestamp: new Date('2023-05-12T13:20:00'),
    ipAddress: '192.168.1.110'
  },
  {
    id: 'act-004',
    userId: '3',
    username: 'khalid.otaibi',
    action: 'product_update',
    module: 'inventory',
    details: 'تحديث بيانات المنتج SKU-8901',
    status: 'success' as 'success' | 'failed' | 'warning' | 'info',
    timestamp: new Date('2023-05-11T09:15:00'),
    ipAddress: '192.168.1.120'
  },
  {
    id: 'act-005',
    userId: '2',
    username: 'sara.abdullah',
    action: 'journal_post',
    module: 'accounting',
    details: 'ترحيل قيد محاسبي رقم JE-2023-105',
    status: 'failed' as 'success' | 'failed' | 'warning' | 'info',
    timestamp: new Date('2023-05-11T14:30:00'),
    ipAddress: '192.168.1.110'
  },
  {
    id: 'act-006',
    userId: '5',
    username: 'fahad.saeed',
    action: 'report_generate',
    module: 'reports',
    details: 'إنشاء تقرير الميزانية العمومية',
    status: 'success' as 'success' | 'failed' | 'warning' | 'info',
    timestamp: new Date('2023-05-10T16:45:00'),
    ipAddress: '192.168.1.130'
  },
  {
    id: 'act-007',
    userId: '1',
    username: 'ahmed.mohamed',
    action: 'user_create',
    module: 'users',
    details: 'إنشاء مستخدم جديد: nasser.ali',
    status: 'success' as 'success' | 'failed' | 'warning' | 'info',
    timestamp: new Date('2023-05-10T11:10:00'),
    ipAddress: '192.168.1.105'
  },
  {
    id: 'act-008',
    userId: '4',
    username: 'mona.zahrani',
    action: 'inventory_adjust',
    module: 'inventory',
    details: 'تعديل مخزون المنتج SKU-5432',
    status: 'warning' as 'success' | 'failed' | 'warning' | 'info',
    timestamp: new Date('2023-05-09T10:20:00'),
    ipAddress: '192.168.1.115'
  }
];

// Add the mockBackupSettings export for backupState.ts
export const mockBackupSettings = {
  id: '1',
  autoBackup: true,
  backupFrequency: 'daily',
  backupTime: '02:00',
  retentionPeriodDays: 30,
  compressionLevel: 'high',
  encryptBackups: true,
  backupLocation: 'cloud',
  cloudProvider: 'aws',
  lastBackupDate: new Date('2023-05-10T02:00:00'),
  nextBackupDate: new Date('2023-05-11T02:00:00'),
  backupNotifications: true,
  notifyOnSuccess: true,
  notifyOnFailure: true,
  notifyEmail: 'admin@example.com',
  updatedAt: new Date('2023-04-01'),
  updatedBy: 'admin'
};
