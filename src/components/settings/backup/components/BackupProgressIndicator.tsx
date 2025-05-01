
import React from "react";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface BackupProgressIndicatorProps {
  isRestoring: boolean;
  isUploadingToGoogleDrive: boolean;
  restoreProgress: number;
  uploadProgress: number;
}

export const BackupProgressIndicator: React.FC<BackupProgressIndicatorProps> = ({
  isRestoring,
  isUploadingToGoogleDrive,
  restoreProgress,
  uploadProgress
}) => {
  if (!isRestoring && !isUploadingToGoogleDrive) return null;
  
  return (
    <div className="mt-4 space-y-2">
      {isRestoring && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>جاري استعادة النسخة الاحتياطية...</Label>
            <span className="text-xs">{restoreProgress}%</span>
          </div>
          <Progress value={restoreProgress} className="w-full" />
        </div>
      )}

      {isUploadingToGoogleDrive && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>جاري التحميل إلى Google Drive...</Label>
            <span className="text-xs">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}
    </div>
  );
};
