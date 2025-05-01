
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, UploadCloud } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { BackupSettings } from "@/types/settings";

interface ScheduleBackupTabProps {
  settings: BackupSettings;
  isLoading: boolean;
  isBackingUp: boolean;
  backupProgress: number;
  updateSetting: <K extends keyof BackupSettings>(key: K, value: BackupSettings[K]) => void;
  saveSettings: () => Promise<boolean>;
  createManualBackup: (format: 'compressed' | 'original' | 'sql' | 'json') => Promise<boolean>;
}

export const ScheduleBackupTab: React.FC<ScheduleBackupTabProps> = ({
  settings,
  isLoading,
  isBackingUp,
  backupProgress,
  updateSetting,
  saveSettings,
  createManualBackup
}) => {
  const [selectedBackupFormat, setSelectedBackupFormat] = useState<'compressed' | 'original' | 'sql' | 'json'>('compressed');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>جدولة النسخ الاحتياطي التلقائي</CardTitle>
          <CardDescription>
            ضبط توقيت وتكرار النسخ الاحتياطي التلقائي للبيانات
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">تكرار النسخ الاحتياطي</Label>
              <Select 
                defaultValue={settings.frequency}
                onValueChange={(value) => updateSetting("frequency", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر التكرار" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">يومي</SelectItem>
                  <SelectItem value="weekly">أسبوعي</SelectItem>
                  <SelectItem value="monthly">شهري</SelectItem>
                  <SelectItem value="manual">يدوي فقط</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">وقت النسخ الاحتياطي</Label>
              <Input 
                type="time" 
                id="time" 
                value={settings.time} 
                onChange={(e) => updateSetting("time", e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="keepBackups">عدد النسخ الاحتياطية للاحتفاظ بها</Label>
              <Input 
                type="number" 
                id="keepBackups" 
                value={settings.keepBackups} 
                min="1"
                max="100"
                onChange={(e) => updateSetting("keepBackups", parseInt(e.target.value))}
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="auto-restore">استعادة تلقائية عند الفشل</Label>
              <Switch 
                id="auto-restore"
                checked={settings.autoRestore}
                onCheckedChange={(checked) => updateSetting("autoRestore", checked)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={saveSettings} 
            disabled={isLoading}
            className="ml-2"
          >
            <Save className="ml-2 h-4 w-4" />
            حفظ الإعدادات
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>النسخ الاحتياطي اليدوي</CardTitle>
          <CardDescription>
            إنشاء نسخة احتياطية يدوية للنظام
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.lastBackup && (
            <div className="text-sm text-muted-foreground">
              آخر نسخة احتياطية: {format(new Date(settings.lastBackup), 'yyyy/MM/dd - HH:mm')}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="destinationType">وجهة النسخ الاحتياطي</Label>
            <Select 
              defaultValue={settings.destinationType}
              onValueChange={(value) => updateSetting("destinationType", value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الوجهة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">تخزين محلي</SelectItem>
                <SelectItem value="cloud">تخزين سحابي</SelectItem>
                <SelectItem value="email">إرسال بالبريد الإلكتروني</SelectItem>
                <SelectItem value="ftp">FTP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backupFormat">تنسيق النسخة الاحتياطية</Label>
            <Select 
              defaultValue={selectedBackupFormat}
              onValueChange={(value) => setSelectedBackupFormat(value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر تنسيق النسخة الاحتياطية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compressed">ملف مضغوط (ZIP)</SelectItem>
                <SelectItem value="original">ملف أصلي (غير مضغوط)</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {settings.destinationType === "email" && (
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني للإرسال</Label>
              <Input 
                type="email" 
                id="email"
                placeholder="example@example.com"
                value={settings.emailRecipients && settings.emailRecipients.length > 0 ? settings.emailRecipients[0] : ""}
                onChange={(e) => updateSetting("emailRecipients", [e.target.value])}
              />
            </div>
          )}
          
          {isBackingUp && (
            <div className="space-y-2 py-2">
              <Label>تقدم النسخ الاحتياطي</Label>
              <Progress value={backupProgress} className="w-full" />
              <div className="text-xs text-center text-muted-foreground">
                {backupProgress}%
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => createManualBackup(selectedBackupFormat)} 
            disabled={isBackingUp}
            className="w-full"
            variant="default"
          >
            <UploadCloud className="ml-2 h-4 w-4" />
            {isBackingUp ? "جاري النسخ..." : "إنشاء نسخة احتياطية الآن"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
