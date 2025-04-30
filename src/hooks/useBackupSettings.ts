
import { useState } from 'react';
import { BackupSettings, BackupHistoryItem } from '@/types/settings';
import { mockBackupSettings } from '@/data/mockSettings';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';

export function useBackupSettings() {
  const [settings, setSettings] = useState<BackupSettings>({
    ...mockBackupSettings,
    backupHistory: mockBackupSettings.backupHistory || [],
    encryptBackup: mockBackupSettings.encryptBackup || false,
    compressionLevel: mockBackupSettings.compressionLevel || 'medium',
    includeAttachments: mockBackupSettings.includeAttachments || true,
    includeSettings: mockBackupSettings.includeSettings || true,
    autoRestore: mockBackupSettings.autoRestore || false,
    destinationType: mockBackupSettings.destinationType || 'local'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [restoreProgress, setRestoreProgress] = useState(0);
  const [backupProgress, setBackupProgress] = useState(0);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // تحديث إعداد محدد
  const updateSetting = <K extends keyof BackupSettings>(
    key: K,
    value: BackupSettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // تحديث عدة إعدادات في وقت واحد
  const updateSettings = (updatedSettings: Partial<BackupSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...updatedSettings
    }));
  };

  // حفظ الإعدادات
  const saveSettings = async () => {
    setIsLoading(true);

    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success('تم حفظ إعدادات النسخ الاحتياطي بنجاح');
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء حفظ الإعدادات');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // إنشاء نسخة احتياطية يدوية
  const createManualBackup = async () => {
    setIsBackingUp(true);
    setBackupProgress(0);

    try {
      // محاكاة عملية النسخ الاحتياطي
      for (let i = 1; i <= 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setBackupProgress(i * 10);
      }

      const newBackup: BackupHistoryItem = {
        id: uuid(),
        createdAt: new Date(),
        size: `${Math.floor(Math.random() * 100) + 10} MB`,
        path: `/backups/backup-${new Date().toISOString().split('T')[0]}.zip`,
        status: 'success',
        type: 'manual',
        destination: settings.destinationType
      };

      setSettings(prev => ({
        ...prev,
        lastBackup: new Date(),
        backupHistory: [newBackup, ...prev.backupHistory]
      }));

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

  // استعادة نسخة احتياطية
  const restoreBackup = async (backupId: string) => {
    setIsRestoring(true);
    setRestoreProgress(0);

    try {
      // البحث عن النسخة المطلوبة
      const backup = settings.backupHistory.find(b => b.id === backupId);
      if (!backup) {
        throw new Error('لم يتم العثور على النسخة الاحتياطية');
      }

      // محاكاة عملية الاستعادة
      for (let i = 1; i <= 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setRestoreProgress(i * 10);
      }

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

  // حذف نسخة احتياطية
  const deleteBackup = async (backupId: string) => {
    try {
      setSettings(prev => ({
        ...prev,
        backupHistory: prev.backupHistory.filter(b => b.id !== backupId)
      }));

      toast.success('تم حذف النسخة الاحتياطية');
      return true;
    } catch (error) {
      toast.error('فشل حذف النسخة الاحتياطية');
      return false;
    }
  };

  // تنزيل نسخة احتياطية
  const downloadBackup = (backupId: string) => {
    const backup = settings.backupHistory.find(b => b.id === backupId);
    if (!backup) {
      toast.error('لم يتم العثور على النسخة الاحتياطية');
      return;
    }

    // محاكاة التنزيل
    toast.success('جاري تنزيل النسخة الاحتياطية...');
    setTimeout(() => {
      toast.success('تم تنزيل النسخة الاحتياطية بنجاح');
    }, 2000);
  };

  // إرسال النسخة الاحتياطية بالبريد الإلكتروني
  const sendBackupByEmail = async (backupId: string, email: string) => {
    try {
      const backup = settings.backupHistory.find(b => b.id === backupId);
      if (!backup) {
        toast.error('لم يتم العثور على النسخة الاحتياطية');
        return false;
      }

      // محاكاة الإرسال
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`تم إرسال النسخة الاحتياطية إلى ${email} بنجاح`);
      return true;
    } catch (error) {
      toast.error('فشل إرسال النسخة الاحتياطية');
      return false;
    }
  };

  return {
    settings,
    isLoading,
    isRestoring,
    isBackingUp,
    restoreProgress,
    backupProgress,
    updateSetting,
    updateSettings,
    saveSettings,
    createManualBackup,
    restoreBackup,
    deleteBackup,
    downloadBackup,
    sendBackupByEmail
  };
}
