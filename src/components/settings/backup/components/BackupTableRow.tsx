
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Cloud } from "lucide-react";
import { BackupHistoryItem } from "@/types/settings";
import { BackupActionButtons } from "./BackupActionButtons";

interface BackupTableRowProps {
  backup: BackupHistoryItem;
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

export const BackupTableRow: React.FC<BackupTableRowProps> = ({
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
    <TableRow key={backup.id}>
      <TableCell>{format(new Date(backup.createdAt), 'yyyy/MM/dd - HH:mm')}</TableCell>
      <TableCell>
        {backup.type === 'auto' ? 'تلقائي' : 'يدوي'}
      </TableCell>
      <TableCell>{backup.size}</TableCell>
      <TableCell>
        {backup.destination === 'local' ? 'محلي' :
         backup.destination === 'cloud' ? (
           <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
             <Cloud className="h-3 w-3" /> سحابي
           </Badge>
         ) : 
         backup.destination === 'email' ? 'بريد إلكتروني' : 'FTP'}
      </TableCell>
      <TableCell>
        <Badge variant={backup.fileFormat === 'compressed' ? 'default' : 
                     backup.fileFormat === 'original' ? 'secondary' :
                     backup.fileFormat === 'sql' ? 'secondary' : 'destructive'}>
          {backup.fileFormat === 'compressed' ? 'مضغوط' : 
           backup.fileFormat === 'original' ? 'أصلي' : 
           backup.fileFormat === 'sql' ? 'SQL' : 'JSON'}
        </Badge>
      </TableCell>
      <TableCell>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${
          backup.status === 'success' ? 'bg-green-100 text-green-800' : 
          backup.status === 'failed' ? 'bg-red-100 text-red-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          {backup.status === 'success' ? 'ناجح' : 
           backup.status === 'failed' ? 'فشل' : 
           'جاري التنفيذ'}
        </span>
      </TableCell>
      <TableCell>
        <BackupActionButtons 
          backup={backup}
          isRestoring={isRestoring}
          isUploadingToGoogleDrive={isUploadingToGoogleDrive}
          isGoogleDriveConnected={isGoogleDriveConnected}
          onRestore={onRestore}
          onDelete={onDelete}
          onDownload={onDownload}
          onDownloadOriginal={onDownloadOriginal}
          onSendByEmail={onSendByEmail}
          onUploadToGoogleDrive={onUploadToGoogleDrive}
          onDownloadFromGoogleDrive={onDownloadFromGoogleDrive}
        />
      </TableCell>
    </TableRow>
  );
};
