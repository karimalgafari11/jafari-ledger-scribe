
import React, { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  RefreshCw, Download, Trash2, Mail, File, CloudUpload, CloudDownload, Cloud, Upload
} from "lucide-react";
import { format } from "date-fns";
import { BackupSettings, BackupHistoryItem } from "@/types/settings";

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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>سجل النسخ الاحتياطية</CardTitle>
            <CardDescription>
              عرض وإدارة النسخ الاحتياطية المتوفرة
            </CardDescription>
          </div>
          <div>
            <Button
              onClick={triggerFileUpload}
              variant="outline"
              className="flex items-center gap-1"
            >
              <Upload className="h-4 w-4" />
              تحميل نسخة احتياطية
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".zip,.sql,.json"
              style={{ display: 'none' }}
            />
          </div>
        </div>
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
              {settings.backupHistory && settings.backupHistory.length > 0 ? (
                settings.backupHistory.map((backup) => (
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
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => restoreBackup(backup.id)}
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
                                onClick={() => downloadBackup(backup.id, backup.fileFormat || 'compressed')}
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
                                onClick={() => downloadOriginalBackup(backup.id)}
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
                                  onClick={() => uploadToGoogleDrive(backup.id)}
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
                                  onClick={() => downloadFromGoogleDrive(backup.id)}
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
                                  if (email) sendBackupByEmail(backup.id, email);
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
                                onClick={() => deleteBackup(backup.id)}
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
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    لا توجد نسخ احتياطية متوفرة.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {isRestoring && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <Label>جاري استعادة النسخة الاحتياطية...</Label>
              <span className="text-xs">{restoreProgress}%</span>
            </div>
            <Progress value={restoreProgress} className="w-full" />
          </div>
        )}

        {isUploadingToGoogleDrive && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <Label>جاري التحميل إلى Google Drive...</Label>
              <span className="text-xs">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}
        
        <div className="mt-6">
          <Alert>
            <AlertTitle>تنزيل النسخ الاحتياطية</AlertTitle>
            <AlertDescription>
              يمكنك تنزيل النسخ الاحتياطية بأكثر من تنسيق. استخدم أيقونة التنزيل للملفات المضغوطة وأيقونة الملف للنسخ الأصلية.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};
