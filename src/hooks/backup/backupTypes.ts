
import { BackupSettings, BackupHistoryItem } from '@/types/settings';

export type BackupFormat = 'compressed' | 'original' | 'sql' | 'json';

export interface BackupState {
  settings: BackupSettings;
  isLoading: boolean;
  restoreProgress: number;
  backupProgress: number;
  isRestoring: boolean;
  isBackingUp: boolean;
  isConnectingGoogleDrive: boolean;
  isUploadingToGoogleDrive: boolean;
  uploadProgress: number;
  downloadFormat: BackupFormat;
}

export interface BackupActions {
  setDownloadFormat: (format: BackupFormat) => void;
  updateSetting: <K extends keyof BackupSettings>(key: K, value: BackupSettings[K]) => void;
  updateSettings: (updatedSettings: Partial<BackupSettings>) => void;
  saveSettings: () => Promise<boolean>;
  createManualBackup: (fileFormat?: BackupFormat) => Promise<boolean>;
  restoreBackup: (backupId: string) => Promise<boolean>;
  deleteBackup: (backupId: string) => Promise<boolean>;
  downloadBackup: (backupId: string, format?: BackupFormat) => void;
  downloadOriginalBackup: (backupId: string) => void;
  sendBackupByEmail: (backupId: string, email: string) => Promise<boolean>;
  connectGoogleDrive: () => Promise<boolean>;
  disconnectGoogleDrive: () => Promise<boolean>;
  uploadToGoogleDrive: (backupId: string) => Promise<boolean>;
  downloadFromGoogleDrive: (backupId: string) => Promise<boolean>;
}
