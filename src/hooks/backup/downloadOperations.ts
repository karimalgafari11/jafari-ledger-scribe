
import { toast } from 'sonner';
import { BackupSettings } from '@/types/settings';
import { BackupFormat } from './backupTypes';
import { simulateDelay } from './backupUtils';

// Download backup
export const downloadBackup = (
  backupId: string, 
  format: BackupFormat,
  settings: BackupSettings
): void => {
  const backup = settings.backupHistory.find(b => b.id === backupId);
  if (!backup) {
    toast.error('لم يتم العثور على النسخة الاحتياطية');
    return;
  }

  // Simulate download
  toast.success(`جاري تنزيل النسخة الاحتياطية بتنسيق ${
    format === 'compressed' ? 'مضغوط' : 
    format === 'original' ? 'أصلي' : 
    format === 'sql' ? 'SQL' : 'JSON'
  }...`);
  
  setTimeout(() => {
    toast.success('تم تنزيل النسخة الاحتياطية بنجاح');
  }, 2000);
};

// Download original backup
export const downloadOriginalBackup = (
  backupId: string,
  settings: BackupSettings
): void => {
  const backup = settings.backupHistory.find(b => b.id === backupId);
  if (!backup) {
    toast.error('لم يتم العثور على النسخة الاحتياطية');
    return;
  }

  toast.success('جاري تنزيل النسخة الاحتياطية الأصلية...');
  setTimeout(() => {
    toast.success('تم تنزيل النسخة الاحتياطية الأصلية بنجاح');
  }, 2500);
};

// Send backup by email
export const sendBackupByEmail = async (
  backupId: string, 
  email: string,
  settings: BackupSettings
): Promise<boolean> => {
  try {
    const backup = settings.backupHistory.find(b => b.id === backupId);
    if (!backup) {
      toast.error('لم يتم العثور على النسخة الاحتياطية');
      return false;
    }

    // Simulate email sending
    await simulateDelay(1500);
    toast.success(`تم إرسال النسخة الاحتياطية إلى ${email} بنجاح`);
    return true;
  } catch (error) {
    toast.error('فشل إرسال النسخة الاحتياطية');
    return false;
  }
};
