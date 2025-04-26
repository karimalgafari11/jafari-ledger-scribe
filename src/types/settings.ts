
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
  role: 'admin' | 'manager' | 'accountant' | 'inventory' | 'sales';
  branch: string;
  phone: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export interface BackupSettings {
  id: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  keepBackups: number;
  lastBackup?: Date;
  location: string;
}
