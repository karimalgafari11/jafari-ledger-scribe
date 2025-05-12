
import { BackupState, BackupFormat } from './backupTypes';
import { BackupSettings } from '@/types/settings';
import { BackupService } from '@/services/backupService';
import { toast } from 'sonner';
import {
  connectGoogleDrive as connectGoogleDriveOperation,
  disconnectGoogleDrive as disconnectGoogleDriveOperation,
  uploadToGoogleDrive as uploadToGoogleDriveOperation,
  downloadFromGoogleDrive as downloadFromGoogleDriveOperation
} from './cloudOperations';

// Types for state updater functions
type StateUpdaters = {
  setLoading: (loading: boolean) => void;
  setBackupProgress: (progress: number) => void;
  setIsBackingUp: (isBackingUp: boolean) => void;
  setRestoreProgress: (progress: number) => void;
  setIsRestoring: (isRestoring: boolean) => void;
  setIsConnectingGoogleDrive: (isConnecting: boolean) => void;
  setUploadProgress: (progress: number) => void;
  setIsUploadingToGoogleDrive: (isUploading: boolean) => void;
  updateSettings: (updatedSettings: Partial<BackupSettings>) => void;
};

export const useBackupActions = (
  state: BackupState,
  stateUpdaters: StateUpdaters
) => {
  const { 
    settings,
  } = state;
  
  const {
    setLoading,
    setBackupProgress,
    setIsBackingUp,
    setRestoreProgress,
    setIsRestoring,
    setIsConnectingGoogleDrive,
    setUploadProgress,
    setIsUploadingToGoogleDrive,
    updateSettings
  } = stateUpdaters;

  // Save settings
  const saveSettings = async (): Promise<boolean> => {
    setLoading(true);
    try {
      // محاكاة حفظ الإعدادات في قاعدة البيانات
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success('تم حفظ إعدادات النسخ الاحتياطي بنجاح');
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء حفظ الإعدادات');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Create manual backup
  const createManualBackup = async (fileFormat: BackupFormat = 'compressed'): Promise<boolean> => {
    setIsBackingUp(true);
    setBackupProgress(0);
    
    try {
      const result = await BackupService.createBackup(
        settings, 
        fileFormat, 
        setBackupProgress
      );
      
      if (!result.success || !result.backupId) {
        throw new Error(result.error || 'فشل إنشاء النسخة الاحتياطية');
      }
      
      // إنشاء سجل النسخة الاحتياطية الجديدة
      const now = new Date();
      const newBackup = {
        id: result.backupId,
        createdAt: now,
        size: `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 90) + 10} MB`,
        path: `/backups/${now.getFullYear()}/${now.getMonth() + 1}/backup-${result.backupId}.${fileFormat}`,
        status: 'success' as 'success' | 'failed' | 'in-progress',
        type: 'manual' as 'auto' | 'manual',
        destination: settings.destinationType,
        fileFormat
      };
      
      // تحديث قائمة النسخ الاحتياطية وتاريخ آخر نسخة احتياطية
      updateSettings({
        lastBackup: now,
        backupHistory: [newBackup, ...(settings.backupHistory || [])]
      });
      
      toast.success('تم إنشاء النسخة الاحتياطية بنجاح');
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'فشل إنشاء النسخة الاحتياطية';
      toast.error(errorMessage);
      return false;
    } finally {
      setIsBackingUp(false);
      setBackupProgress(0);
    }
  };

  // Restore backup
  const restoreBackup = async (backupId: string): Promise<boolean> => {
    setIsRestoring(true);
    setRestoreProgress(0);
    
    try {
      // التحقق من وجود النسخة الاحتياطية
      const backup = settings.backupHistory.find(b => b.id === backupId);
      if (!backup) {
        throw new Error('لم يتم العثور على النسخة الاحتياطية');
      }
      
      // استعادة النسخة الاحتياطية
      const result = await BackupService.restoreBackup(
        backupId, 
        setRestoreProgress
      );
      
      if (!result.success) {
        throw new Error(result.error || 'فشل استعادة النسخة الاحتياطية');
      }
      
      toast.success(`تمت استعادة النسخة الاحتياطية بتاريخ ${new Date(backup.createdAt).toLocaleDateString('ar-SA')}`);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'فشلت عملية استعادة النسخة الاحتياطية';
      toast.error(errorMessage);
      return false;
    } finally {
      setIsRestoring(false);
      setRestoreProgress(0);
    }
  };

  // Delete backup
  const deleteBackup = async (backupId: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // حذف النسخة الاحتياطية
      const result = await BackupService.deleteBackup(backupId);
      
      if (!result.success) {
        throw new Error(result.error || 'فشل حذف النسخة الاحتياطية');
      }
      
      // تحديث قائمة النسخ الاحتياطية
      updateSettings({
        backupHistory: settings.backupHistory.filter(b => b.id !== backupId)
      });
      
      toast.success('تم حذف النسخة الاحتياطية');
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'فشل حذف النسخة الاحتياطية';
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Download backup
  const downloadBackup = async (backupId: string, format: BackupFormat = 'compressed'): Promise<boolean> => {
    try {
      // التحقق من وجود النسخة الاحتياطية
      const backup = settings.backupHistory.find(b => b.id === backupId);
      if (!backup) {
        toast.error('لم يتم العثور على النسخة الاحتياطية');
        return false;
      }
      
      // تنزيل النسخة الاحتياطية
      const result = await BackupService.downloadBackup(backupId, format);
      
      if (!result.success) {
        throw new Error(result.error || 'فشل تنزيل النسخة الاحتياطية');
      }
      
      toast.success('تم تنزيل النسخة الاحتياطية بنجاح');
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'فشل تنزيل النسخة الاحتياطية';
      toast.error(errorMessage);
      return false;
    }
  };

  // Download original backup
  const downloadOriginalBackup = async (backupId: string): Promise<boolean> => {
    return downloadBackup(backupId, 'original');
  };

  // Send backup by email
  const sendBackupByEmail = async (backupId: string, email: string): Promise<boolean> => {
    try {
      // التحقق من وجود النسخة الاحتياطية
      const backup = settings.backupHistory.find(b => b.id === backupId);
      if (!backup) {
        toast.error('لم يتم العثور على النسخة الاحتياطية');
        return false;
      }
      
      // إرسال النسخة الاحتياطية بالبريد الإلكتروني
      const result = await BackupService.sendBackupByEmail(backupId, email);
      
      if (!result.success) {
        throw new Error(result.error || 'فشل إرسال النسخة الاحتياطية');
      }
      
      toast.success(`تم إرسال النسخة الاحتياطية إلى ${email} بنجاح`);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'فشل إرسال النسخة الاحتياطية';
      toast.error(errorMessage);
      return false;
    }
  };

  // Connect to Google Drive
  const connectGoogleDrive = async (): Promise<boolean> => {
    // Store email temporarily in localStorage in case we need it during the authentication process
    if (settings.googleDriveAuth?.email) {
      localStorage.setItem('tempGoogleEmail', settings.googleDriveAuth.email);
    }
    
    return connectGoogleDriveOperation(setIsConnectingGoogleDrive, updateSettings);
  };

  // Disconnect from Google Drive
  const disconnectGoogleDrive = async (): Promise<boolean> => {
    return disconnectGoogleDriveOperation(updateSettings);
  };

  // Upload to Google Drive
  const uploadToGoogleDrive = async (backupId: string): Promise<boolean> => {
    return uploadToGoogleDriveOperation(
      backupId, 
      settings, 
      setIsUploadingToGoogleDrive, 
      setUploadProgress, 
      updateSettings
    );
  };

  // Download from Google Drive
  const downloadFromGoogleDrive = async (backupId: string): Promise<boolean> => {
    return downloadFromGoogleDriveOperation(backupId, settings);
  };

  // Upload backup from file
  const uploadBackupFromFile = async (file: File): Promise<boolean> => {
    setLoading(true);
    
    try {
      const result = await BackupService.uploadBackupFromFile(file, setBackupProgress);
      
      if (!result.success || !result.backupId) {
        throw new Error(result.error || 'فشل تحميل النسخة الاحتياطية');
      }
      
      // تحديد نوع الملف
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let fileFormat: BackupFormat = 'compressed';
      
      if (fileExtension === 'sql') fileFormat = 'sql';
      else if (fileExtension === 'json') fileFormat = 'json';
      
      // إنشاء سجل النسخة الاحتياطية الجديدة
      const now = new Date();
      const newBackup = {
        id: result.backupId,
        createdAt: now,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        path: `/backups/${now.getFullYear()}/${now.getMonth() + 1}/${file.name}`,
        status: 'success' as 'success' | 'failed' | 'in-progress',
        type: 'manual' as 'auto' | 'manual',
        destination: 'local',
        fileFormat
      };
      
      // تحديث قائمة النسخ الاحتياطية
      updateSettings({
        backupHistory: [newBackup, ...(settings.backupHistory || [])]
      });
      
      toast.success(`تم تحميل الملف "${file.name}" بنجاح`);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'فشل تحميل النسخة الاحتياطية';
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveSettings,
    createManualBackup,
    restoreBackup,
    deleteBackup,
    downloadBackup,
    downloadOriginalBackup,
    sendBackupByEmail,
    connectGoogleDrive,
    disconnectGoogleDrive,
    uploadToGoogleDrive,
    downloadFromGoogleDrive,
    uploadBackupFromFile
  };
};
