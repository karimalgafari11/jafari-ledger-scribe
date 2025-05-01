
import { toast } from 'sonner';

/**
 * مساعد لاختبار النسخ الاحتياطي
 * يقدم وظائف لتتبع عمليات النسخ الاحتياطي واختبارها
 */
export const logBackupOperation = (operation: string, details?: any) => {
  console.log(`[Backup Operation] ${operation}`, details || '');
  
  // يمكننا إظهار إشعارات للمستخدم أيضًا لتتبع العمليات
  if (details?.showToast) {
    toast.info(`تم تنفيذ: ${operation}`);
  }
};

/**
 * تشغيل اختبار تلقائي لعمليات النسخ الاحتياطي الأساسية
 * يقوم بتنفيذ سلسلة من العمليات للتأكد من أن النظام يعمل بشكل صحيح
 */
export const runBackupSystemTest = async (
  backupActions: {
    createManualBackup: (format: 'compressed' | 'original' | 'sql' | 'json') => Promise<boolean>;
    saveSettings: () => Promise<boolean>;
    connectGoogleDrive?: () => Promise<boolean>;
  }
) => {
  try {
    // اختبار إنشاء نسخة احتياطية
    logBackupOperation('بدء اختبار النسخ الاحتياطي التلقائي');
    
    // إنشاء نسخة احتياطية مضغوطة
    logBackupOperation('إنشاء نسخة احتياطية مضغوطة');
    await backupActions.createManualBackup('compressed');
    
    // حفظ الإعدادات
    logBackupOperation('حفظ إعدادات النسخ الاحتياطي');
    await backupActions.saveSettings();
    
    // اختبار الاتصال بـ Google Drive (إذا كان متاحًا)
    if (backupActions.connectGoogleDrive) {
      logBackupOperation('اختبار الاتصال بـ Google Drive');
      await backupActions.connectGoogleDrive();
    }
    
    // إنشاء نسخة احتياطية بتنسيق SQL
    logBackupOperation('إنشاء نسخة احتياطية بتنسيق SQL');
    await backupActions.createManualBackup('sql');
    
    logBackupOperation('انتهاء اختبار النسخ الاحتياطي التلقائي بنجاح');
    return true;
  } catch (error) {
    console.error('خطأ في اختبار النسخ الاحتياطي:', error);
    toast.error('فشل اختبار النسخ الاحتياطي');
    return false;
  }
};

/**
 * التحقق من حالة النسخ الاحتياطية
 * يعرض معلومات عن حالة النظام والنسخ المتوفرة
 */
export const verifyBackupStatus = (backupSettings: any) => {
  const status = {
    totalBackups: backupSettings.backupHistory?.length || 0,
    lastBackup: backupSettings.lastBackup ? new Date(backupSettings.lastBackup).toLocaleString() : 'لا يوجد',
    cloudConnected: backupSettings.googleDriveAuth?.isAuthenticated || false,
    scheduledBackups: backupSettings.frequency !== 'manual',
    encryptionEnabled: backupSettings.encryptBackup || false,
  };
  
  console.log('[Backup Status]', status);
  return status;
};
