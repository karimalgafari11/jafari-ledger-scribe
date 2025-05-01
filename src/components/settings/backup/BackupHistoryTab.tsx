
import React, { useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BackupSettings, BackupHistoryItem } from "@/types/settings";
import { BackupTableRow } from "./components/BackupTableRow";
import { BackupProgressIndicator } from "./components/BackupProgressIndicator";
import { BackupHistoryHeader } from "./components/BackupHistoryHeader";

interface BackupHistoryTabProps {
  settings: BackupSettings;
  isRestoring: boolean;
  isUploadingToGoogleDrive: boolean;
  restoreProgress: number;
  uploadProgress: number;
  restoreBackup: (backupId: string) => Promise<boolean>;
  deleteBackup: (backupId: string) => Promise<boolean>;
  downloadBackup: (backupId: string, format: 'compressed' | 'original' | 'sql' | 'json') => void;
  downloadOriginalBackup: (backupId: string) => void;
  sendBackupByEmail: (backupId: string, email: string) => Promise<boolean>;
  uploadToGoogleDrive: (backupId: string) => Promise<boolean>;
  downloadFromGoogleDrive: (backupId: string) => Promise<boolean>;
  uploadBackupFromFile: (file: File) => Promise<boolean>;
}

export const BackupHistoryTab: React.FC<BackupHistoryTabProps> = ({
  settings,
  isRestoring,
  isUploadingToGoogleDrive,
  restoreProgress,
  uploadProgress,
  restoreBackup,
  deleteBackup,
  downloadBackup,
  downloadOriginalBackup,
  sendBackupByEmail,
  uploadToGoogleDrive,
  downloadFromGoogleDrive,
  uploadBackupFromFile
}) => {
  const isGoogleDriveConnected = settings.googleDriveAuth?.isAuthenticated || false;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadBackupFromFile(file);
      // Reset the input value after upload
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const renderBackupHistory = () => {
    if (!settings.backupHistory || settings.backupHistory.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center py-6">
            لا توجد نسخ احتياطية متوفرة.
          </TableCell>
        </TableRow>
      );
    }

    return settings.backupHistory.map((backup: BackupHistoryItem) => (
      <BackupTableRow
        key={backup.id}
        backup={backup}
        isRestoring={isRestoring}
        isUploadingToGoogleDrive={isUploadingToGoogleDrive}
        isGoogleDriveConnected={isGoogleDriveConnected}
        onRestore={restoreBackup}
        onDelete={deleteBackup}
        onDownload={downloadBackup}
        onDownloadOriginal={downloadOriginalBackup}
        onSendByEmail={sendBackupByEmail}
        onUploadToGoogleDrive={uploadToGoogleDrive}
        onDownloadFromGoogleDrive={downloadFromGoogleDrive}
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <BackupHistoryHeader onTriggerFileUpload={triggerFileUpload} />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>التاريخ والوقت</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>الحجم</TableHead>
                <TableHead>الوجهة</TableHead>
                <TableHead>التنسيق</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderBackupHistory()}
            </TableBody>
          </Table>
        </div>
        
        <BackupProgressIndicator 
          isRestoring={isRestoring}
          isUploadingToGoogleDrive={isUploadingToGoogleDrive}
          restoreProgress={restoreProgress}
          uploadProgress={uploadProgress}
        />
        
        <div className="mt-6">
          <Alert>
            <AlertTitle>تنزيل النسخ الاحتياطية</AlertTitle>
            <AlertDescription>
              يمكنك تنزيل النسخ الاحتياطية بأكثر من تنسيق. استخدم أيقونة التنزيل للملفات المضغوطة وأيقونة الملف للنسخ الأصلية.
            </AlertDescription>
          </Alert>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".zip,.sql,.json"
          style={{ display: 'none' }}
        />
      </CardContent>
    </Card>
  );
};
