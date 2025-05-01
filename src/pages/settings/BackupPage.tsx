import React from "react";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBackupSettings } from "@/hooks/useBackupSettings";
import { ScheduleBackupTab } from "@/components/settings/backup/ScheduleBackupTab";
import { BackupHistoryTab } from "@/components/settings/backup/BackupHistoryTab";
import { CloudStorageTab } from "@/components/settings/backup/CloudStorageTab";
import { AdvancedSettingsTab } from "@/components/settings/backup/AdvancedSettingsTab";

const BackupPage = () => {
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
  
  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="النسخ الاحتياطي واستعادة البيانات" />

      <Tabs defaultValue="schedule" className="mt-6">
        <TabsList className="mb-6">
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
    </div>
  );
};

export default BackupPage;
