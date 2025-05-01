
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBackupSettings } from "@/hooks/useBackupSettings";
import { ScheduleBackupTab } from "@/components/settings/backup/ScheduleBackupTab";
import { BackupHistoryTab } from "@/components/settings/backup/BackupHistoryTab";
import { CloudStorageTab } from "@/components/settings/backup/CloudStorageTab";
import { AdvancedSettingsTab } from "@/components/settings/backup/AdvancedSettingsTab";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Bug } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BackupPage = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const {
    settings,
    isLoading,
    isBackingUp,
    isRestoring,
    isConnectingGoogleDrive,
    isUploadingToGoogleDrive,
    backupProgress,
    restoreProgress,
    uploadProgress,
    downloadFormat,
    setDownloadFormat,
    updateSetting,
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
  } = useBackupSettings();
  
  // تتبع ما إذا كانت هناك عمليات قيد التنفيذ
  const isOperationInProgress = isBackingUp || isRestoring || isConnectingGoogleDrive || isUploadingToGoogleDrive;
  
  // إضافة تأثير لفحص تنزيل النسخ الاحتياطية التلقائي عند تحميل الصفحة
  useEffect(() => {
    if (settings && settings.googleDriveAuth?.isAuthenticated && settings.autoDownloadFromCloud) {
      checkForNewBackups();
    }
  }, [settings?.googleDriveAuth?.isAuthenticated, settings?.autoDownloadFromCloud]);
  
  // التحقق من وجود نسخ احتياطية جديدة
  const checkForNewBackups = async () => {
    try {
      if (settings?.googleDriveAuth?.isAuthenticated && settings?.autoDownloadFromCloud) {
        toast.info("جاري التحقق من وجود نسخ احتياطية جديدة...");
        await downloadFromGoogleDrive();
      }
    } catch (error) {
      console.error("خطأ في التحقق من النسخ الاحتياطية الجديدة:", error);
    }
  };
  
  // معالجة تغيير التبويب النشط
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="النسخ الاحتياطي واستعادة البيانات" />

      <div className="mb-6 flex justify-between items-center">
        <div>
          {isOperationInProgress && (
            <Alert variant="default" className="max-w-lg">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>معلومات</AlertTitle>
              <AlertDescription>
                {isBackingUp && `جاري إنشاء نسخة احتياطية... ${backupProgress}%`}
                {isRestoring && `جاري استعادة النسخة الاحتياطية... ${restoreProgress}%`}
                {isConnectingGoogleDrive && "جاري الاتصال بـ Google Drive..."}
                {isUploadingToGoogleDrive && `جاري التحميل إلى Google Drive... ${uploadProgress}%`}
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <Button variant="outline" className="gap-1" asChild>
          <Link to="/settings/backup-test">
            <Bug className="h-4 w-4 ml-1" />
            اختبار النظام
          </Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
        <TabsList className="mb-6 grid grid-cols-4 md:w-auto w-full">
          <TabsTrigger value="schedule">جدولة النسخ الاحتياطي</TabsTrigger>
          <TabsTrigger value="backups">النسخ الاحتياطية</TabsTrigger>
          <TabsTrigger value="cloud">تخزين سحابي</TabsTrigger>
          <TabsTrigger value="settings">إعدادات متقدمة</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <ScheduleBackupTab
            settings={settings}
            isLoading={isLoading}
            isBackingUp={isBackingUp}
            backupProgress={backupProgress}
            updateSetting={updateSetting}
            saveSettings={saveSettings}
            createManualBackup={createManualBackup}
          />
        </TabsContent>

        <TabsContent value="backups">
          <BackupHistoryTab
            settings={settings}
            isRestoring={isRestoring}
            isUploadingToGoogleDrive={isUploadingToGoogleDrive}
            restoreProgress={restoreProgress}
            uploadProgress={uploadProgress}
            restoreBackup={restoreBackup}
            deleteBackup={deleteBackup}
            downloadBackup={downloadBackup}
            downloadOriginalBackup={downloadOriginalBackup}
            sendBackupByEmail={sendBackupByEmail}
            uploadToGoogleDrive={uploadToGoogleDrive}
            downloadFromGoogleDrive={downloadFromGoogleDrive}
            uploadBackupFromFile={uploadBackupFromFile}
          />
        </TabsContent>

        <TabsContent value="cloud">
          <CloudStorageTab
            settings={settings}
            isConnectingGoogleDrive={isConnectingGoogleDrive}
            downloadFormat={downloadFormat}
            setDownloadFormat={setDownloadFormat}
            updateSetting={updateSetting}
            saveSettings={saveSettings}
            connectGoogleDrive={connectGoogleDrive}
            disconnectGoogleDrive={disconnectGoogleDrive}
            downloadFromGoogleDrive={downloadFromGoogleDrive}
          />
        </TabsContent>

        <TabsContent value="settings">
          <AdvancedSettingsTab
            settings={settings}
            isLoading={isLoading}
            updateSetting={updateSetting}
            saveSettings={saveSettings}
            connectGoogleDrive={connectGoogleDrive}
          />
        </TabsContent>
      </Tabs>

      {!settings ? (
        <Card className="mt-6">
          <CardContent className="py-4">
            <CardDescription className="text-center text-red-500">
              لا يمكن تحميل إعدادات النسخ الاحتياطي. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.
            </CardDescription>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default BackupPage;
