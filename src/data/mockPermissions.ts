
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
    permissions: [
      { id: 'manage_settings', name: 'إدارة إعدادات النظام' },
      { id: 'manage_users', name: 'إدارة المستخدمين' },
      { id: 'manage_roles', name: 'إدارة الصلاحيات' },
      { id: 'view_activity_log', name: 'عرض سجل النشاط' },
      { id: 'manage_backup', name: 'إدارة النسخ الاحتياطي' }
    ]
  },
  {
    id: 'finance',
    name: 'المالية',
    permissions: [
      { id: 'view_finance', name: 'عرض البيانات المالية' },
      { id: 'manage_finance', name: 'إدارة البيانات المالية' },
      { id: 'create_journal', name: 'إنشاء قيود محاسبية' },
      { id: 'approve_journal', name: 'اعتماد قيود محاسبية' },
      { id: 'view_reports', name: 'عرض التقارير المالية' }
    ]
  },
  {
    id: 'inventory',
    name: 'المخزون',
    permissions: [
      { id: 'view_inventory', name: 'عرض المخزون' },
      { id: 'manage_inventory', name: 'إدارة المخزون' },
      { id: 'create_purchase', name: 'إنشاء أوامر شراء' },
      { id: 'approve_purchase', name: 'اعتماد أوامر شراء' },
      { id: 'view_inventory_reports', name: 'عرض تقارير المخزون' }
    ]
  },
  {
    id: 'sales',
    name: 'المبيعات',
    permissions: [
      { id: 'view_sales', name: 'عرض المبيعات' },
      { id: 'manage_sales', name: 'إدارة المبيعات' },
      { id: 'view_customers', name: 'عرض العملاء' },
      { id: 'manage_customers', name: 'إدارة العملاء' },
      { id: 'view_sales_reports', name: 'عرض تقارير المبيعات' }
    ]
  }
];
