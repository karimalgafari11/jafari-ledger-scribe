
import { SystemSettings, Branch, User, BackupSettings, BackupHistoryItem } from "@/types/settings";

export const mockSystemSettings: SystemSettings = {
  id: "1",
  companyName: "شركة قطع غيار السيارات",
  taxNumber: "123456789",
  currency: "SAR",
  language: "ar",
  theme: "light",
  fiscalYearStart: new Date(2025, 0, 1),
  address: "الرياض - المملكة العربية السعودية",
  phone: "966500000000",
  email: "info@autoparts.com"
};

export const mockBranches: Branch[] = [
  {
    id: "1",
    name: "الفرع الرئيسي",
    code: "HQ",
    address: "الرياض - شارع العليا",
    phone: "966500000001",
    email: "main@autoparts.com",
    manager: "أحمد محمد",
    isActive: true,
    isMainBranch: true
  },
  {
    id: "2",
    name: "فرع جدة",
    code: "JED",
    address: "جدة - شارع التحلية",
    phone: "966500000002",
    email: "jeddah@autoparts.com",
    manager: "خالد عبدالله",
    isActive: true,
    isMainBranch: false
  },
  {
    id: "3",
    name: "فرع الدمام",
    code: "DMM",
    address: "الدمام - شارع الملك فهد",
    phone: "966500000003",
    email: "dammam@autoparts.com",
    manager: "عمر سعيد",
    isActive: true,
    isMainBranch: false
  }
];

export const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    fullName: "مدير النظام",
    email: "admin@autoparts.com",
    role: "admin",
    branch: "الفرع الرئيسي",
    phone: "966500000010",
    isActive: true,
    createdAt: new Date(2024, 0, 1)
  },
  {
    id: "2",
    username: "accountant1",
    fullName: "محمد المحاسب",
    email: "accountant@autoparts.com",
    role: "accountant",
    branch: "الفرع الرئيسي",
    phone: "966500000011",
    isActive: true,
    lastLogin: new Date(2025, 3, 25),
    createdAt: new Date(2024, 1, 1)
  },
  {
    id: "3",
    username: "inventory1",
    fullName: "سعد المخزن",
    email: "inventory@autoparts.com",
    role: "inventory",
    branch: "فرع جدة",
    phone: "966500000012",
    isActive: true,
    lastLogin: new Date(2025, 3, 26),
    createdAt: new Date(2024, 2, 1)
  }
];

const backupHistoryItems: BackupHistoryItem[] = [
  {
    id: "bk1",
    createdAt: new Date(2025, 3, 25, 23, 0),
    size: "42.5 MB",
    path: "/backups/backup-2025-04-25.zip",
    status: "success",
    type: "auto",
    destination: "local",
    fileFormat: "compressed"
  },
  {
    id: "bk2",
    createdAt: new Date(2025, 3, 18, 23, 0),
    size: "41.2 MB",
    path: "/backups/backup-2025-04-18.zip",
    status: "success",
    type: "auto",
    destination: "local",
    fileFormat: "compressed"
  },
  {
    id: "bk3",
    createdAt: new Date(2025, 3, 10, 12, 30),
    size: "40.7 MB",
    path: "/backups/backup-2025-04-10.zip", 
    status: "success",
    type: "manual",
    destination: "local",
    fileFormat: "compressed"
  },
  {
    id: "bk4",
    createdAt: new Date(2025, 3, 5, 14, 15),
    size: "85.3 MB",
    path: "/backups/backup-2025-04-05.sql",
    status: "success",
    type: "manual",
    destination: "local",
    fileFormat: "sql"
  },
  {
    id: "bk5",
    createdAt: new Date(2025, 3, 1, 9, 0),
    size: "36.8 MB",
    path: "/backups/backup-2025-04-01.json",
    status: "success",
    type: "manual",
    destination: "cloud",
    fileFormat: "json",
    googleDriveFileId: "1Ab2Cd3Ef4Gh5Ij6Kl7Mn8Op9"
  }
];

export const mockBackupSettings: BackupSettings = {
  id: "1",
  frequency: "daily",
  time: "23:00",
  keepBackups: 30,
  lastBackup: new Date(2025, 3, 25, 23, 0),
  location: "/backups/",
  destinationType: "local",
  encryptBackup: false,
  compressionLevel: "medium",
  includeAttachments: true,
  includeSettings: true,
  backupHistory: backupHistoryItems,
  autoRestore: false,
  cloudProvider: "google-drive",
  googleDriveAuth: {
    isAuthenticated: false,
    email: ''
  }
};
