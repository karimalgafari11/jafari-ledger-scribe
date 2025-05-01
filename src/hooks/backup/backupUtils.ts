
import { v4 as uuid } from 'uuid';

// Helper for simulating delays
export const simulateDelay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper for simulating progress updates
export const simulateProgressUpdate = async (
  updateProgress: (progress: number) => void,
  startValue: number = 0,
  delayPerStep: number = 200
): Promise<void> => {
  for (let i = startValue; i <= 100; i += 10) {
    updateProgress(i);
    await simulateDelay(delayPerStep);
  }
};

// Create a backup history item for mock data
export const createBackupHistoryItem = (fileFormat: 'compressed' | 'original' | 'sql' | 'json' = 'compressed', destination: string = 'local') => {
  const now = new Date();
  return {
    id: `backup-${uuid().substring(0, 8)}`,
    createdAt: now,
    size: `${Math.floor(Math.random() * 100) / 10 + 1} MB`,
    path: `/backups/${now.getFullYear()}/${now.getMonth() + 1}/${uuid().substring(0, 8)}${
      fileFormat === 'compressed' ? '.zip' :
      fileFormat === 'original' ? '.bak' :
      fileFormat === 'sql' ? '.sql' : '.json'
    }`,
    status: 'success' as 'success' | 'failed' | 'in-progress',
    type: Math.random() > 0.3 ? 'auto' : 'manual' as 'auto' | 'manual',
    destination,
    fileFormat
  };
};

// Validate backup settings
export const validateBackupSettings = (settings: any): { isValid: boolean, errors: string[] } => {
  const errors: string[] = [];
  
  if (!settings) {
    errors.push('إعدادات النسخ الاحتياطي غير موجودة');
    return { isValid: false, errors };
  }
  
  if (!settings.frequency) {
    errors.push('يجب تحديد تكرار النسخ الاحتياطي');
  }
  
  if (settings.frequency !== 'manual' && !settings.time) {
    errors.push('يجب تحديد وقت النسخ الاحتياطي');
  }
  
  if (!settings.keepBackups || settings.keepBackups <= 0) {
    errors.push('يجب تحديد عدد صحيح للنسخ الاحتياطية للاحتفاظ بها');
  }
  
  if (!settings.destinationType) {
    errors.push('يجب تحديد وجهة النسخ الاحتياطي');
  }
  
  // Check destination-specific settings
  if (settings.destinationType === 'ftp') {
    if (!settings.ftpHost) errors.push('يجب تحديد عنوان خادم FTP');
    if (!settings.ftpPort) errors.push('يجب تحديد منفذ خادم FTP');
    if (!settings.ftpUsername) errors.push('يجب تحديد اسم مستخدم خادم FTP');
  } else if (settings.destinationType === 'email' && settings.frequency !== 'manual') {
    if (!settings.emailRecipients || settings.emailRecipients.length === 0) {
      errors.push('يجب تحديد مستلم واحد على الأقل للبريد الإلكتروني');
    }
  }
  
  // Check encryption settings
  if (settings.encryptBackup && !settings.encryptionPassword) {
    errors.push('يجب تحديد كلمة مرور للتشفير');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Check if the system is ready for backups
export const isBackupSystemReady = (settings: any): boolean => {
  const validation = validateBackupSettings(settings);
  return validation.isValid;
};
