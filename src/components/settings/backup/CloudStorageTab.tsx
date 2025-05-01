
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Cloud, CloudDownload, Download, Folder, Search, Info } from "lucide-react";
import { BackupSettings } from "@/types/settings";
import { BackupFormat } from "@/hooks/backup/backupTypes";

interface CloudStorageTabProps {
  settings: BackupSettings;
  isConnectingGoogleDrive: boolean;
  downloadFormat: BackupFormat;
  setDownloadFormat: (format: BackupFormat) => void;
  updateSetting: <K extends keyof BackupSettings>(key: K, value: BackupSettings[K]) => void;
  saveSettings: () => Promise<boolean>;
  connectGoogleDrive: () => Promise<boolean>;
  disconnectGoogleDrive: () => Promise<boolean>;
  downloadFromGoogleDrive: (backupId?: string) => Promise<boolean>;
}

export function CloudStorageTab({
  settings,
  isConnectingGoogleDrive,
  downloadFormat,
  setDownloadFormat,
  updateSetting,
  saveSettings,
  connectGoogleDrive,
  disconnectGoogleDrive,
  downloadFromGoogleDrive
}: CloudStorageTabProps) {
  const isAuthenticated = settings?.googleDriveAuth?.isAuthenticated || false;
  const [isViewingFiles, setIsViewingFiles] = useState(false);
  
  const handleFormatChange = (value: string) => {
    setDownloadFormat(value as BackupFormat);
  };
  
  const handleAutoDownloadChange = (checked: boolean) => {
    updateSetting("autoDownloadFromCloud", checked);
    saveSettings().then(success => {
      if (success) {
        toast.success(checked ? "تم تفعيل التنزيل التلقائي بنجاح" : "تم إيقاف التنزيل التلقائي بنجاح");
      }
    });
  };

  const handleConnect = async () => {
    try {
      const success = await connectGoogleDrive();
      if (success) {
        toast.success("تم الاتصال بنجاح بـ Google Drive");
      }
    } catch (error) {
      console.error("خطأ في الاتصال:", error);
      toast.error("حدث خطأ أثناء الاتصال بـ Google Drive");
    }
  };

  const handleDisconnect = async () => {
    try {
      const success = await disconnectGoogleDrive();
      if (success) {
        toast.success("تم قطع الاتصال بنجاح");
      }
    } catch (error) {
      console.error("خطأ في قطع الاتصال:", error);
      toast.error("حدث خطأ أثناء قطع الاتصال بـ Google Drive");
    }
  };
  
  const handleBrowseGoogleDrive = async () => {
    if (isViewingFiles) {
      return; // تجنب تشغيل العملية مرة أخرى إذا كانت قيد التنفيذ
    }
    
    setIsViewingFiles(true);
    try {
      await downloadFromGoogleDrive();
    } catch (error) {
      console.error("خطأ في تصفح الملفات:", error);
      toast.error("حدث خطأ أثناء محاولة تصفح الملفات");
    } finally {
      setIsViewingFiles(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle>تخزين سحابي</CardTitle>
        <CardDescription>
          إعدادات التخزين السحابي والاتصال بخدمات التخزين السحابي مثل Google Drive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">حساب Google Drive</h3>
            {isAuthenticated && (
              <Badge variant="success" className="py-1">متصل</Badge>
            )}
          </div>
          
          {isAuthenticated ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border p-3 rounded-md bg-slate-50">
                <div>
                  <p className="font-medium">{settings.googleDriveAuth?.email}</p>
                  <p className="text-sm text-muted-foreground">متصل بنجاح</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleDisconnect}
                >
                  قطع الاتصال
                </Button>
              </div>
              
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>تنزيل النسخ الاحتياطية تلقائيًا</Label>
                    <p className="text-sm text-muted-foreground">
                      تنزيل النسخ الاحتياطية الجديدة تلقائيًا من Google Drive
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoDownloadFromCloud || false}
                    onCheckedChange={handleAutoDownloadChange}
                  />
                </div>

                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-1">
                    <Label>تنسيق التنزيل</Label>
                    <Select value={downloadFormat} onValueChange={handleFormatChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر تنسيق التنزيل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compressed">مضغوط (ZIP)</SelectItem>
                        <SelectItem value="sql">SQL</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    className="w-full" 
                    onClick={handleBrowseGoogleDrive}
                    disabled={isViewingFiles}
                  >
                    {isViewingFiles ? (
                      <>
                        <Search className="ml-2 h-4 w-4 animate-spin" />
                        جاري تصفح الملفات...
                      </>
                    ) : (
                      <>
                        <Cloud className="ml-2 h-4 w-4" />
                        تصفح ملفات Google Drive
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm">
                قم بربط حساب Google Drive لاستخدامه لتخزين النسخ الاحتياطية واستعادتها
              </p>
              <Button 
                onClick={handleConnect} 
                disabled={isConnectingGoogleDrive}
              >
                <Cloud className="ml-2 h-4 w-4" />
                {isConnectingGoogleDrive ? "جاري الاتصال..." : "الاتصال بـ Google Drive"}
              </Button>
              
              <div className="flex items-center text-sm bg-blue-50 p-3 rounded-md text-blue-700">
                <Info className="h-4 w-4 ml-2" />
                <span>اتصال Google Drive يتيح لك تخزين واسترجاع النسخ الاحتياطية بشكل آمن من السحابة</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
