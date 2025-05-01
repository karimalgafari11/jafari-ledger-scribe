
import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  RefreshCw, Download, Trash2, Mail, File, CloudUpload, CloudDownload
} from "lucide-react";

interface BackupActionButtonsProps {
  backup: {
    id: string;
    status: string;
    destination: string;
    googleDriveFileId?: string;
    fileFormat?: 'compressed' | 'original' | 'sql' | 'json';
  };
  isRestoring: boolean;
  isUploadingToGoogleDrive: boolean;
  isGoogleDriveConnected: boolean;
  onRestore: (backupId: string) => Promise<boolean>;
  onDelete: (backupId: string) => Promise<boolean>;
  onDownload: (backupId: string, format: 'compressed' | 'original' | 'sql' | 'json') => void;
  onDownloadOriginal: (backupId: string) => void;
  onSendByEmail: (backupId: string, email: string) => Promise<boolean>;
  onUploadToGoogleDrive: (backupId: string) => Promise<boolean>;
  onDownloadFromGoogleDrive: (backupId: string) => Promise<boolean>;
}

export const BackupActionButtons: React.FC<BackupActionButtonsProps> = ({
  backup,
  isRestoring,
  isUploadingToGoogleDrive,
  isGoogleDriveConnected,
  onRestore,
  onDelete,
  onDownload,
  onDownloadOriginal,
  onSendByEmail,
  onUploadToGoogleDrive,
  onDownloadFromGoogleDrive
}) => {
  return (
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onRestore(backup.id)}
              disabled={isRestoring || backup.status !== 'success'}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>استعادة النسخة الاحتياطية</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDownload(backup.id, backup.fileFormat || 'compressed')}
            >
              <Download className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>تنزيل النسخة الاحتياطية</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDownloadOriginal(backup.id)}
            >
              <File className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>تنزيل النسخة الأصلية</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isGoogleDriveConnected && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onUploadToGoogleDrive(backup.id)}
                disabled={isUploadingToGoogleDrive || backup.destination === 'cloud'}
              >
                <CloudUpload className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>تحميل إلى Google Drive</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {backup.googleDriveFileId && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDownloadFromGoogleDrive(backup.id)}
              >
                <CloudDownload className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>تنزيل من Google Drive</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                const email = window.prompt("أدخل البريد الإلكتروني:");
                if (email) onSendByEmail(backup.id, email);
              }}
            >
              <Mail className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>إرسال بالبريد الإلكتروني</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(backup.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>حذف النسخة الاحتياطية</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
