
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Cloud, File, CloudDownload } from "lucide-react";
import { BackupSettings } from "@/types/settings";

interface CloudStorageTabProps {
  settings: BackupSettings;
  isConnectingGoogleDrive: boolean;
  downloadFormat: 'compressed' | 'original' | 'sql' | 'json';
  setDownloadFormat: (format: 'compressed' | 'original' | 'sql' | 'json') => void;
  updateSetting: <K extends keyof BackupSettings>(key: K, value: BackupSettings[K]) => void;
  saveSettings: () => Promise<boolean>;
  connectGoogleDrive: () => Promise<boolean>;
  disconnectGoogleDrive: () => Promise<boolean>;
}

export const CloudStorageTab: React.FC<CloudStorageTabProps> = ({
  settings,
  isConnectingGoogleDrive,
  downloadFormat,
  setDownloadFormat,
  updateSetting,
  saveSettings,
  connectGoogleDrive,
  disconnectGoogleDrive
}) => {
  const isGoogleDriveConnected = settings.googleDriveAuth?.isAuthenticated || false;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ربط حساب Google Drive</CardTitle>
            <CardDescription>
              استخدم حساب Google Drive لتخزين النسخ الاحتياطية وتنزيلها
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isGoogleDriveConnected ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Cloud className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900">متصل بحساب Google Drive</h4>
                    <p className="text-sm text-green-700">{settings.googleDriveAuth?.email}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>المجلد المستهدف</Label>
                  <Input 
                    type="text"
                    placeholder="معرف مجلد Google Drive"
                    value={settings.cloudFolderId || ""}
                    onChange={e => updateSetting("cloudFolderId", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    اترك هذا الحقل فارغًا لاستخدام المجلد الرئيسي
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Alert variant="outline" className="border-amber-200 bg-amber-50">
                  <AlertTitle className="text-amber-800">غير متصل</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    لم يتم الاتصال بحساب Google Drive بعد. اضغط على زر "اتصال بـ Google Drive" أدناه لإجراء الاتصال.
                  </AlertDescription>
                </Alert>
              </div>
            )}
            
            {isConnectingGoogleDrive && (
              <div className="mt-4">
                <Progress value={70} className="w-full mb-2" />
                <p className="text-center text-sm text-muted-foreground">
                  جاري الاتصال بـ Google Drive...
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {isGoogleDriveConnected ? (
              <Button 
                onClick={disconnectGoogleDrive}
                className="w-full"
                variant="outline"
              >
                <Cloud className="ml-2 h-4 w-4" />
                قطع الاتصال بـ Google Drive
              </Button>
            ) : (
              <Button 
                onClick={connectGoogleDrive}
                className="w-full"
                variant="default"
                disabled={isConnectingGoogleDrive}
              >
                <Cloud className="ml-2 h-4 w-4" />
                {isConnectingGoogleDrive ? "جاري الاتصال..." : "اتصال بـ Google Drive"}
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>النسخ الاحتياطي التلقائي إلى السحابة</CardTitle>
            <CardDescription>
              إعداد نسخ احتياطي تلقائي إلى حساب Google Drive الخاص بك
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-cloud-backup">نسخ احتياطي تلقائي إلى السحابة</Label>
              <Switch 
                id="auto-cloud-backup"
                disabled={!isGoogleDriveConnected}
              />
            </div>
            
            <div className="space-y-2">
              <Label>تنسيق النسخ الاحتياطي</Label>
              <Select defaultValue="compressed" disabled={!isGoogleDriveConnected}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر التنسيق" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compressed">ملف مضغوط (ZIP)</SelectItem>
                  <SelectItem value="sql">SQL</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Alert>
              <AlertTitle>معلومات مهمة</AlertTitle>
              <AlertDescription>
                سيتم نسخ البيانات احتياطيًا إلى Google Drive تلقائيًا بعد كل نسخ احتياطي محلي إذا تم تفعيل هذه الميزة.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button 
              disabled={!isGoogleDriveConnected}
              className="w-full"
              onClick={saveSettings}
            >
              <Save className="ml-2 h-4 w-4" />
              حفظ إعدادات السحابة
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>تفضيلات تنزيل النسخ الاحتياطية</CardTitle>
          <CardDescription>
            اختر التنسيق المفضل لتنزيل الملفات
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>تنسيق التنزيل الافتراضي</Label>
              <Select 
                defaultValue={downloadFormat}
                onValueChange={(value) => setDownloadFormat(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر التنسيق" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compressed">ملف مضغوط (ZIP)</SelectItem>
                  <SelectItem value="original">ملف أصلي (غير مضغوط)</SelectItem>
                  <SelectItem value="sql">SQL</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse gap-2">
              <Button className="flex-1" variant="outline">
                <File className="ml-2 h-4 w-4" />
                تنزيل أحدث نسخة احتياطية
              </Button>
              <Button className="flex-1" variant="outline" disabled={!isGoogleDriveConnected}>
                <CloudDownload className="ml-2 h-4 w-4" />
                تنزيل من السحابة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
