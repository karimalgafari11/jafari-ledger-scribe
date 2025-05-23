export const mockBranches = [
  {
    id: '1',
    name: 'الرياض',
    code: 'RYD',
    address: 'الرياض - طريق الملك فهد',
    phone: '011-4567890',
    email: 'riyadh@example.com',
    manager: 'أحمد محمد',
    isActive: true,
    isMainBranch: true
  },
  {
    id: '2',
    name: 'جدة',
    code: 'JED',
    address: 'جدة - شارع التحلية',
    phone: '012-3456789',
    email: 'jeddah@example.com',
    manager: 'سعيد عبدالله',
    isActive: true,
    isMainBranch: false
  },
  {
    id: '3',
    name: 'الدمام',
    code: 'DMM',
    address: 'الدمام - شارع الأمير محمد',
    phone: '013-4567890',
    email: 'dammam@example.com',
    manager: 'فهد العتيبي',
    isActive: true,
    isMainBranch: false
  },
  {
    id: '4',
    name: 'المدينة المنورة',
    code: 'MED',
    address: 'المدينة المنورة - شارع الهجرة',
    phone: '014-3456789',
    email: 'madinah@example.com',
    manager: 'عمر الشمري',
    isActive: false,
    isMainBranch: false
  }
];

export const mockSystemSettings = {
  id: '1',
  companyName: 'شركة نظام المحاسبة',
  taxNumber: '300012345600003',
  currency: 'SAR',
  language: 'ar' as const,
  theme: 'light' as const,
  fiscalYearStart: new Date('2023-01-01'),
  logo: '/logo.png',
  address: 'المملكة العربية السعودية، الرياض',
  phone: '966512345678',
  email: 'info@accounting.example',
  timezone: 'Asia/Riyadh',
  dateFormat: 'dd/MM/yyyy',
  numberFormat: '#,##0.00',
  fontSize: 'medium' as const,
  density: 'comfortable' as const,
  invoicePrefix: 'INV-',
  invoiceStartNumber: 1001,
  lockPeriod: 'month' as const,
  autoSave: true,
  notifications: true,
  darkMode: false,
  compactMode: false
};

// Update backup settings for backupState.ts
export const mockBackupSettings = {
  id: '1',
  frequency: 'daily' as 'daily' | 'weekly' | 'monthly' | 'manual',
  time: '02:00',
  keepBackups: 7,
  lastBackup: new Date('2023-05-10T02:00:00'),
  location: '/backups/',
  destinationType: 'cloud' as 'local' | 'cloud' | 'ftp' | 'email',
  ftpHost: '',
  ftpUsername: '',
  ftpPassword: '',
  ftpPort: 21,
  ftpPath: '',
  emailRecipients: [] as string[],
  cloudProvider: 'google-drive' as 'google-drive' | 'dropbox' | 'onedrive',
  cloudAuthToken: '',
  cloudFolderId: '',
  cloudPath: '/backups/',
  encryptBackups: true,
  encryptBackup: true,
  encryptionPassword: '',
  compressionLevel: 'high' as 'none' | 'low' | 'medium' | 'high',
  includeAttachments: true,
  includeSettings: true,
  backupHistory: [],
  autoRestore: false,
  restorePoint: undefined,
  googleDriveAuth: {
    isAuthenticated: false,
    token: '',
    refreshToken: '',
    expiresAt: undefined,
    email: ''
  },
  autoCloudBackup: false,
  cloudBackupFormat: 'compressed' as 'compressed' | 'sql' | 'json',
  autoDownloadFromCloud: false
};
