
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockSystemSettings } from '@/data/mockSettings';

const SystemSettingsPage = () => {
  const settings = mockSystemSettings;

  return (
    <div className="container mx-auto p-6 rtl">
      <h1 className="text-2xl font-bold mb-6">إعدادات النظام</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>معلومات الشركة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">اسم الشركة</Label>
              <Input id="companyName" defaultValue={settings.companyName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxNumber">الرقم الضريبي</Label>
              <Input id="taxNumber" defaultValue={settings.taxNumber} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input id="phone" defaultValue={settings.phone} dir="ltr" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" defaultValue={settings.email} dir="ltr" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">العنوان</Label>
              <Input id="address" defaultValue={settings.address} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettingsPage;
