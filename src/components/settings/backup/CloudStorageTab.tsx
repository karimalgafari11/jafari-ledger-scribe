
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Cloud, CloudDownload, File, LogIn } from "lucide-react";
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
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("");
  const [googlePassword, setGooglePassword] = useState("");

  const handleGoogleDriveConnect = async () => {
    if (googleEmail.trim() === "") {
      toast.error("يرجى إدخال البريد الإلكتروني لحساب Google");
      return;
    }
    
    setShowAuthDialog(false);
    const result = await connectGoogleDrive();
    if (result) {
      toast.success(`تم الاتصال بحساب Google Drive: ${googleEmail}`);
    }
  };
  
  const handleAutoBackupToggle = (checked: boolean) => {
    updateSetting("autoCloudBackup", checked);
  };

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
                
                <div className="space-y-2">
                  <Label>مسار التخزين السحابي</Label>
                  <Input 
                    type="text"
                    placeholder="مسار التخزين في Google Drive"
                    value={settings.cloudPath || ""}
                    onChange={e => updateSetting("cloudPath", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    على سبيل المثال: /نسخ-احتياطي/اسم-الشركة/
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
                
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">إعدادات السحابة</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    قم بربط حساب Google Drive للاستفادة من خدمات النسخ الاحتياطي السحابي، مما يوفر لك مساحة تخزين آمنة ويتيح لك الوصول إلى بياناتك من أي مكان.
                  </p>
                  <Button 
                    onClick={() => setShowAuthDialog(true)}
                    className="w-full"
                    variant="outline"
                  >
                    <LogIn className="ml-2 h-4 w-4" />
                    تسجيل الدخول إلى Google Drive
                  </Button>
                </div>
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
                onClick={() => setShowAuthDialog(true)}
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
                checked={settings.autoCloudBackup || false}
                onCheckedChange={handleAutoBackupToggle}
                disabled={!isGoogleDriveConnected}
              />
            </div>
            
            <div className="space-y-2">
              <Label>تنسيق النسخ الاحتياطي</Label>
              <Select 
                defaultValue={settings.cloudBackupFormat || "compressed"} 
                onValueChange={(value) => updateSetting("cloudBackupFormat", value as any)}
                disabled={!isGoogleDriveConnected}
              >
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
            
            <div className="space-y-2">
              <Label>وجهة النسخ الاحتياطي</Label>
              <Select 
                defaultValue={settings.destinationType} 
                onValueChange={(value) => updateSetting("destinationType", value as "local" | "cloud" | "ftp" | "email")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الوجهة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">محلي</SelectItem>
                  <SelectItem value="cloud">سحابي (Google Drive)</SelectItem>
                  <SelectItem value="ftp">FTP</SelectItem>
                  <SelectItem value="email">بريد إلكتروني</SelectItem>
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
              disabled={!isGoogleDriveConnected && settings.destinationType === "cloud"}
              className="w-full"
              onClick={saveSettings}
            >
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

      {/* Google Drive Authentication Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="max-w-md rtl">
          <DialogHeader>
            <DialogTitle>تسجيل الدخول إلى Google Drive</DialogTitle>
            <DialogDescription>
              قم بإدخال بيانات حساب Google Drive للربط مع النظام
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="google-email">البريد الإلكتروني</Label>
              <Input
                id="google-email"
                placeholder="أدخل بريدك الإلكتروني"
                value={googleEmail}
                onChange={(e) => setGoogleEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="google-password">كلمة المرور</Label>
              <Input
                id="google-password"
                type="password"
                placeholder="أدخل كلمة المرور"
                value={googlePassword}
                onChange={(e) => setGooglePassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                لن يتم تخزين كلمة المرور الخاصة بك، سيتم استخدامها فقط للحصول على رمز الوصول.
              </p>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="default"
              onClick={handleGoogleDriveConnect}
              disabled={isConnectingGoogleDrive}
            >
              {isConnectingGoogleDrive ? "جاري التسجيل..." : "تسجيل الدخول"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAuthDialog(false)}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
