
import { useState } from 'react';
import { BackupSettings } from '@/types/settings';
import { mockBackupSettings } from '@/data/mockSettings';
import { BackupFormat, BackupState } from './backupTypes';

// تهيئة حالة النسخ الاحتياطي بالقيم الافتراضية من البيانات الوهمية
export const useBackupState = (): [
  BackupState,
  {
    setState: React.Dispatch<React.SetStateAction<BackupState>>,
    updateSetting: <K extends keyof BackupSettings>(key: K, value: BackupSettings[K]) => void,
    updateSettings: (updatedSettings: Partial<BackupSettings>) => void,
    setLoading: (loading: boolean) => void,
    setBackupProgress: (progress: number) => void,
    setIsBackingUp: (isBackingUp: boolean) => void,
    setRestoreProgress: (progress: number) => void,
    setIsRestoring: (isRestoring: boolean) => void,
    setIsConnectingGoogleDrive: (isConnecting: boolean) => void,
    setUploadProgress: (progress: number) => void,
    setIsUploadingToGoogleDrive: (isUploading: boolean) => void,
    setDownloadFormat: (format: BackupFormat) => void
  }
] => {
  // تهيئة الحالة بالقيم الافتراضية
  const [state, setState] = useState<BackupState>({
    settings: {
      ...mockBackupSettings,
      backupHistory: mockBackupSettings.backupHistory || [],
      encryptBackup: mockBackupSettings.encryptBackup || false,
      compressionLevel: mockBackupSettings.compressionLevel || 'medium',
      includeAttachments: mockBackupSettings.includeAttachments || true,
      includeSettings: mockBackupSettings.includeSettings || true,
      autoRestore: mockBackupSettings.autoRestore || false,
      destinationType: mockBackupSettings.destinationType || 'local',
      googleDriveAuth: mockBackupSettings.googleDriveAuth || { isAuthenticated: false },
      autoCloudBackup: mockBackupSettings.autoCloudBackup || false,
      cloudBackupFormat: mockBackupSettings.cloudBackupFormat || 'compressed',
      cloudPath: mockBackupSettings.cloudPath || '/backups/',
      // إضافة صراحة لمنع أخطاء التحقق من النوع
      autoDownloadFromCloud: mockBackupSettings.autoDownloadFromCloud || false
    },
    isLoading: false,
    restoreProgress: 0,
    backupProgress: 0,
    isRestoring: false,
    isBackingUp: false,
    isConnectingGoogleDrive: false,
    isUploadingToGoogleDrive: false,
    uploadProgress: 0,
    downloadFormat: 'compressed'
  });

  // تحديث إعداد واحد
  const updateSetting = <K extends keyof BackupSettings>(
    key: K,
    value: BackupSettings[K]
  ) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value
      }
    }));
  };

  // تحديث عدة إعدادات دفعة واحدة
  const updateSettings = (updatedSettings: Partial<BackupSettings>) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...updatedSettings
      }
    }));
  };

  // ضبط علامة التحميل
  const setLoading = (loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading
    }));
  };

  // تحديث تقدم النسخ الاحتياطي
  const setBackupProgress = (progress: number) => {
    setState(prev => ({ ...prev, backupProgress: progress }));
  };

  // تحديث علامة عملية النسخ الاحتياطي
  const setIsBackingUp = (isBackingUp: boolean) => {
    setState(prev => ({ ...prev, isBackingUp }));
  };

  // تحديث تقدم الاستعادة
  const setRestoreProgress = (progress: number) => {
    setState(prev => ({ ...prev, restoreProgress: progress }));
  };

  // تحديث علامة الاستعادة
  const setIsRestoring = (isRestoring: boolean) => {
    setState(prev => ({ ...prev, isRestoring }));
  };

  // تحديث علامة الاتصال بـ Google Drive
  const setIsConnectingGoogleDrive = (isConnecting: boolean) => {
    setState(prev => ({ ...prev, isConnectingGoogleDrive: isConnecting }));
  };

  // تحديث تقدم التحميل
  const setUploadProgress = (progress: number) => {
    setState(prev => ({ ...prev, uploadProgress: progress }));
  };

  // تحديث علامة التحميل
  const setIsUploadingToGoogleDrive = (isUploading: boolean) => {
    setState(prev => ({ ...prev, isUploadingToGoogleDrive: isUploading }));
  };

  // ضبط تنسيق التنزيل
  const setDownloadFormat = (format: BackupFormat) => {
    setState(prev => ({ ...prev, downloadFormat: format }));
  };

  return [
    state,
    {
      setState,
      updateSetting,
      updateSettings,
      setLoading,
      setBackupProgress,
      setIsBackingUp,
      setRestoreProgress,
      setIsRestoring,
      setIsConnectingGoogleDrive,
      setUploadProgress,
      setIsUploadingToGoogleDrive,
      setDownloadFormat
    }
  ];
};
