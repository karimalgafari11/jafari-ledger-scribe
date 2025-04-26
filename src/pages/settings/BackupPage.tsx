
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockBackupSettings } from '@/data/mockSettings';
import { DatabaseBackup } from 'lucide-react';

const BackupPage = () => {
  const settings = mockBackupSettings;

  return (
    <div className="container mx-auto p-6 rtl">
      <h1 className="text-2xl font-bold mb-6">النسخ الاحتياطي</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DatabaseBackup className="h-6 w-6" />
            <span>إعدادات النسخ الاحتياطي</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">تكرار النسخ الاحتياطي</Label>
              <Input id="frequency" defaultValue={settings.frequency} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">وقت النسخ الاحتياطي</Label>
              <Input id="time" defaultValue={settings.time} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keepBackups">عدد النسخ المحفوظة</Label>
              <Input id="keepBackups" type="number" defaultValue={settings.keepBackups} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastBackup">آخر نسخة احتياطية</Label>
              <Input 
                id="lastBackup" 
                defaultValue={settings.lastBackup ? new Date(settings.lastBackup).toLocaleString('ar-SA') : '-'} 
                readOnly 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupPage;
