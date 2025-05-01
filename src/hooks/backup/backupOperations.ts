
import { toast } from 'sonner';
import { BackupSettings } from '@/types/settings';
import { BackupFormat } from './backupTypes';
import { createBackupHistoryItem, simulateDelay, simulateProgressUpdate } from './backupUtils';

// Create manual backup
export const createBackup = async (
  settings: BackupSettings,
  fileFormat: BackupFormat,
  setIsBackingUp: (value: boolean) => void,
  setBackupProgress: (value: number) => void,
  updateSettings: (settings: Partial<BackupSettings>) => void
): Promise<boolean> => {
  setIsBackingUp(true);
  setBackupProgress(0);

  try {
    // Simulate backup creation process
    await simulateProgressUpdate(setBackupProgress);

    const newBackup = createBackupHistoryItem(fileFormat, settings.destinationType);

    updateSettings({
      lastBackup: new Date(),
      backupHistory: [newBackup, ...(settings.backupHistory || [])]
    });

    toast.success('تم إنشاء النسخة الاحتياطية بنجاح');
    return true;
  } catch (error) {
    toast.error('فشل إنشاء النسخة الاحتياطية');
    return false;
  } finally {
    setIsBackingUp(false);
    setBackupProgress(0);
  }
};

// Restore backup
export const restoreBackup = async (
  settings: BackupSettings,
  backupId: string,
  setIsRestoring: (value: boolean) => void,
  setRestoreProgress: (value: number) => void
): Promise<boolean> => {
  setIsRestoring(true);
  setRestoreProgress(0);

  try {
    // Find the backup to restore
    const backup = settings.backupHistory.find(b => b.id === backupId);
    if (!backup) {
      throw new Error('لم يتم العثور على النسخة الاحتياطية');
    }

    // Simulate restore process
    await simulateProgressUpdate(setRestoreProgress, 10, 400);

    toast.success(`تمت استعادة النسخة الاحتياطية بتاريخ ${new Date(backup.createdAt).toLocaleDateString('ar-SA')}`);
    return true;
  } catch (error) {
    toast.error('فشلت عملية استعادة النسخة الاحتياطية');
    return false;
  } finally {
    setIsRestoring(false);
    setRestoreProgress(0);
  }
};

// Delete backup
export const deleteBackup = (
  backupId: string,
  updateSettings: (settings: Partial<BackupSettings>) => void,
  settings: BackupSettings
): Promise<boolean> => {
  try {
    updateSettings({
      backupHistory: settings.backupHistory.filter(b => b.id !== backupId)
    });

    toast.success('تم حذف النسخة الاحتياطية');
    return Promise.resolve(true);
  } catch (error) {
    toast.error('فشل حذف النسخة الاحتياطية');
    return Promise.resolve(false);
  }
};

// Save settings
export const saveSettings = async (): Promise<boolean> => {
  try {
    // Simulate API call
    await simulateDelay(800);
    toast.success('تم حفظ إعدادات النسخ الاحتياطي بنجاح');
    return true;
  } catch (error) {
    toast.error('حدث خطأ أثناء حفظ الإعدادات');
    return false;
  }
};
