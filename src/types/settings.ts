
export interface SystemSettings {
  id: string;
  companyName: string;
  taxNumber: string;
  currency: string;
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  fiscalYearStart: Date;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  timezone?: string;
  dateFormat?: string;
  numberFormat?: string;
  fontSize?: 'small' | 'medium' | 'large';
  density?: 'compact' | 'comfortable' | 'spacious';
  invoicePrefix?: string;
  invoiceStartNumber?: number;
  lockPeriod?: 'day' | 'week' | 'month' | 'quarter';
  autoSave?: boolean;
  notifications?: boolean;
  darkMode?: boolean;
  compactMode?: boolean;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  isActive: boolean;
  isMainBranch: boolean;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string; // تغيير النوع ليتوافق مع معرفات (IDs) الأدوار
  branch: string; // تغيير النوع ليتوافق مع معرفات (IDs) الفروع
  phone: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export interface BackupSettings {
  id: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'manual';
  time: string;
  keepBackups: number;
  lastBackup?: Date;
  location: string;
  destinationType: 'local' | 'cloud' | 'ftp' | 'email';
  ftpHost?: string;
  ftpUsername?: string;
  ftpPassword?: string;
  ftpPort?: number;
  ftpPath?: string;
  emailRecipients?: string[];
  cloudProvider?: 'google-drive' | 'dropbox' | 'onedrive';
  cloudAuthToken?: string;
  cloudFolderId?: string;
  cloudPath?: string;
  encryptBackups: boolean;
  encryptBackup?: boolean; // Alias for encryptBackups
  encryptionPassword?: string;
  compressionLevel: 'none' | 'low' | 'medium' | 'high';
  includeAttachments: boolean;
  includeSettings: boolean;
  backupHistory: BackupHistoryItem[];
  autoRestore: boolean;
  restorePoint?: Date;
  googleDriveAuth?: {
    isAuthenticated: boolean;
    token?: string;
    refreshToken?: string;
    expiresAt?: Date;
    email?: string;
  };
  autoCloudBackup?: boolean;
  cloudBackupFormat?: 'compressed' | 'sql' | 'json';
  autoDownloadFromCloud?: boolean;
}

export interface BackupHistoryItem {
  id: string;
  createdAt: Date;
  size: string;
  path: string;
  status: 'success' | 'failed' | 'in-progress';
  type: 'auto' | 'manual';
  destination: string;
  fileFormat?: 'compressed' | 'original' | 'sql' | 'json';
  googleDriveFileId?: string;
}
