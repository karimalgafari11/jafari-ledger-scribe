
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, FileUp } from "lucide-react";
import { BackupSettings } from "@/types/settings";

interface AdvancedSettingsTabProps {
  settings: BackupSettings;
  isLoading: boolean;
  updateSetting: <K extends keyof BackupSettings>(key: K, value: BackupSettings[K]) => void;
  saveSettings: () => Promise<boolean>;
  connectGoogleDrive: () => Promise<boolean>;
}

export const AdvancedSettingsTab: React.FC<AdvancedSettingsTabProps> = ({
  settings,
  isLoading,
  updateSetting,
  saveSettings,
  connectGoogleDrive
}) => {
  const [sendEmailTo, setSendEmailTo] = useState("");
  const isGoogleDriveConnected = settings.googleDriveAuth?.isAuthenticated || false;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات النسخ الاحتياطي المتقدمة</CardTitle>
          <CardDescription>
            ضبط الخيارات المتقدمة لعمليات النسخ الاحتياطي
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="encryptBackup">تشفير النسخة الاحتياطية</Label>
            <Switch 
              id="encryptBackup"
              checked={settings.encryptBackup}
              onCheckedChange={(checked) => updateSetting("encryptBackup", checked)}
            />
          </div>
          
          {settings.encryptBackup && (
            <div className="space-y-2">
              <Label htmlFor="encryptionPassword">كلمة مرور التشفير</Label>
              <Input 
                type="password" 
                id="encryptionPassword"
                value={settings.encryptionPassword || ""}
                onChange={(e) => updateSetting("encryptionPassword", e.target.value)}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="compressionLevel">مستوى الضغط</Label>
            <Select 
              defaultValue={settings.compressionLevel}
              onValueChange={(value) => updateSetting("compressionLevel", value as any)}
            >
              <SelectTrigger id="compressionLevel">
                <SelectValue placeholder="اختر مستوى الضغط" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">بدون ضغط</SelectItem>
                <SelectItem value="low">منخفض</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="high">عالي</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="include-attachments">تضمين المرفقات</Label>
            <Switch 
              id="include-attachments"
              checked={settings.includeAttachments}
              onCheckedChange={(checked) => updateSetting("includeAttachments", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="include-settings">تضمين الإعدادات</Label>
            <Switch 
              id="include-settings"
              checked={settings.includeSettings}
              onCheckedChange={(checked) => updateSetting("includeSettings", checked)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={saveSettings} 
            disabled={isLoading}
          >
            <Save className="ml-2 h-4 w-4" />
            حفظ الإعدادات المتقدمة
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>إعدادات وجهة النسخ الاحتياطي</CardTitle>
          <CardDescription>
            ضبط إعدادات وجهات النسخ الاحتياطي المختلفة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.destinationType === "ftp" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="ftpHost">عنوان الخادم</Label>
                <Input 
                  id="ftpHost"
                  value={settings.ftpHost || ""}
                  onChange={(e) => updateSetting("ftpHost", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ftpPort">رقم المنفذ</Label>
                <Input 
                  id="ftpPort"
                  type="number"
                  value={settings.ftpPort || 21}
                  min="1"
                  max="65535"
                  onChange={(e) => updateSetting("ftpPort", parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ftpUsername">اسم المستخدم</Label>
                <Input 
                  id="ftpUsername"
                  value={settings.ftpUsername || ""}
                  onChange={(e) => updateSetting("ftpUsername", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ftpPassword">كلمة المرور</Label>
                <Input 
                  id="ftpPassword"
                  type="password"
                  value={settings.ftpPassword || ""}
                  onChange={(e) => updateSetting("ftpPassword", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ftpPath">مسار التخزين</Label>
                <Input 
                  id="ftpPath"
                  value={settings.ftpPath || "/backups"}
                  onChange={(e) => updateSetting("ftpPath", e.target.value)}
                />
              </div>
            </>
          )}
          
          {settings.destinationType === "cloud" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cloudProvider">مزود الخدمة السحابية</Label>
                <Select 
                  defaultValue={settings.cloudProvider}
                  onValueChange={(value) => updateSetting("cloudProvider", value as any)}
                >
                  <SelectTrigger id="cloudProvider">
                    <SelectValue placeholder="اختر مزود الخدمة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google-drive">Google Drive</SelectItem>
                    <SelectItem value="dropbox">Dropbox</SelectItem>
                    <SelectItem value="onedrive">OneDrive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cloudFolderId">معرف المجلد</Label>
                <Input 
                  id="cloudFolderId"
                  value={settings.cloudFolderId || ""}
                  onChange={(e) => updateSetting("cloudFolderId", e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={connectGoogleDrive}
                disabled={isGoogleDriveConnected}
              >
                <FileUp className="ml-2 h-4 w-4" />
                {isGoogleDriveConnected ? 
                  'تم الاتصال بالخدمة السحابية' : 
                  'تكوين الاتصال بالخدمة السحابية'}
              </Button>
            </>
          )}
          
          {settings.destinationType === "local" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="location">مسار التخزين المحلي</Label>
                <Input 
                  id="location"
                  value={settings.location}
                  onChange={(e) => updateSetting("location", e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                يمكنك تحديد مسار مجلد على جهاز الخادم لتخزين النسخ الاحتياطية فيه.
              </p>
            </>
          )}
          
          {settings.destinationType === "email" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="emailRecipients">البريد الإلكتروني للمستلمين</Label>
                <div className="flex gap-2">
                  <Input
                    type="email" 
                    id="emailRecipients"
                    value={sendEmailTo}
                    onChange={(e) => setSendEmailTo(e.target.value)}
                    placeholder="email@example.com"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (sendEmailTo) {
                        const currentRecipients = settings.emailRecipients || [];
                        updateSetting("emailRecipients", [...currentRecipients, sendEmailTo]);
                        setSendEmailTo("");
                      }
                    }}
                  >
                    إضافة
                  </Button>
                </div>
              </div>
              
              {settings.emailRecipients && settings.emailRecipients.length > 0 && (
                <div className="space-y-2">
                  <Label>المستلمون</Label>
                  <div className="flex flex-wrap gap-2">
                    {settings.emailRecipients.map((email, index) => (
                      <div key={index} className="bg-gray-100 text-gray-800 text-sm rounded-full px-3 py-1 flex items-center">
                        {email}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updatedRecipients = [...settings.emailRecipients || []];
                            updatedRecipients.splice(index, 1);
                            updateSetting("emailRecipients", updatedRecipients);
                          }}
                          className="ml-1 h-4 w-4 p-0 text-gray-500 hover:text-gray-700"
                        >
                          &times;
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={saveSettings} 
            disabled={isLoading}
          >
            <Save className="ml-2 h-4 w-4" />
            حفظ إعدادات الوجهة
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
