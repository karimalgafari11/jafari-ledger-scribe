
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

// Upload backup from local file
export const uploadBackupFromFile = async (
  file: File,
  updateSettings: (settings: Partial<BackupSettings>) => void,
  settings: BackupSettings
): Promise<boolean> => {
  try {
    // Check if file is valid
    if (!file) {
      toast.error('لم يتم تحديد ملف');
      return false;
    }

    // Check file extension (can be .zip, .sql, .json, etc)
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    let fileFormat: BackupFormat = 'compressed';
    
    if (fileExtension === 'sql') fileFormat = 'sql';
    else if (fileExtension === 'json') fileFormat = 'json';
    else if (fileExtension !== 'zip') {
      toast.error('تنسيق الملف غير مدعوم. الملفات المدعومة هي: ZIP, SQL, JSON');
      return false;
    }
    
    // Simulate file upload and processing
    toast.loading('جاري تحميل النسخة الاحتياطية...');
    await simulateDelay(2000);

    // Create new backup history entry
    const now = new Date();
    const newBackup = {
      id: `backup-${Date.now()}`,
      createdAt: now,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      path: `/backups/${now.getFullYear()}/${now.getMonth() + 1}/${file.name}`,
      status: 'success' as 'success' | 'failed' | 'in-progress',
      type: 'manual' as 'auto' | 'manual',
      destination: 'local',
      fileFormat
    };

    // Update backup history
    updateSettings({
      backupHistory: [newBackup, ...(settings.backupHistory || [])]
    });

    toast.success(`تم تحميل الملف "${file.name}" بنجاح`);
    return true;
  } catch (error) {
    toast.error('فشل تحميل النسخة الاحتياطية');
    return false;
  }
};
