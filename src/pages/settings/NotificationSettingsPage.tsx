
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNotifications } from '@/hooks/useNotifications';
import { toast } from 'sonner';

const NotificationSettingsPage = () => {
  const { notificationSettings, templates, updateNotificationSettings } = useNotifications();
  
  // Group settings by event category
  const groupedSettings = notificationSettings.reduce((acc, setting) => {
    const category = setting.eventType.split('.')[0];
    
    if (!acc[category]) {
      acc[category] = [];
    }
    
    acc[category].push(setting);
    return acc;
  }, {} as Record<string, typeof notificationSettings>);
  
  return (
    <Layout>
      <div className="container mx-auto p-6 rtl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">إعدادات الإشعارات</h1>
            <p className="text-muted-foreground mt-1">
              تخصيص كيفية وصول الإشعارات إليك عبر مختلف القنوات
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الإشعارات حسب النوع</CardTitle>
                <CardDescription>
                  حدد أنواع الإشعارات التي تريد تلقيها وكيفية استلامها
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(groupedSettings).map(([category, settings]) => (
                    <AccordionItem key={category} value={category}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <span className="capitalize">
                            {translateCategory(category)}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {settings.map(setting => (
                            <NotificationSettingItem 
                              key={setting.id}
                              setting={setting}
                              onUpdate={updateNotificationSettings}
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات العامة</CardTitle>
                <CardDescription>
                  إعدادات تطبق على جميع أنواع الإشعارات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="quiet-hours">وقت الهدوء</Label>
                    <Switch id="quiet-hours" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    عدم إرسال إشعارات خلال ساعات محددة
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <Label htmlFor="from-time" className="text-xs">من</Label>
                      <Input type="time" id="from-time" defaultValue="22:00" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="to-time" className="text-xs">إلى</Label>
                      <Input type="time" id="to-time" defaultValue="08:00" className="mt-1" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mute-all">كتم جميع الإشعارات</Label>
                    <Switch id="mute-all" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    إيقاف جميع الإشعارات مؤقتاً في جميع القنوات
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>المنطقة الزمنية</Label>
                  <Select defaultValue="Asia/Riyadh">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المنطقة الزمنية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Riyadh">الرياض (GMT+3)</SelectItem>
                      <SelectItem value="Asia/Dubai">دبي (GMT+4)</SelectItem>
                      <SelectItem value="Asia/Baghdad">بغداد (GMT+3)</SelectItem>
                      <SelectItem value="Africa/Cairo">القاهرة (GMT+2)</SelectItem>
                      <SelectItem value="Africa/Casablanca">الدار البيضاء (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full mt-4">حفظ الإعدادات العامة</Button>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>قوالب الإشعارات</CardTitle>
                <CardDescription>
                  تخصيص محتوى الإشعارات المرسلة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  يمكنك تخصيص محتوى وتنسيق الإشعارات المرسلة عبر مختلف القنوات
                </p>
                
                <Button className="w-full" variant="outline">
                  إدارة قوالب الإشعارات
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Component for individual notification settings
interface NotificationSettingItemProps {
  setting: any;
  onUpdate: (setting: any) => Promise<boolean>;
}

const NotificationSettingItem = ({ setting, onUpdate }: NotificationSettingItemProps) => {
  const [updatedSetting, setUpdatedSetting] = useState(setting);
  
  const handleChannelToggle = (channel: string) => {
    const newSettings = { 
      ...updatedSetting,
      channels: {
        ...updatedSetting.channels,
        [channel]: {
          ...updatedSetting.channels[channel],
          enabled: !updatedSetting.channels[channel]?.enabled
        }
      }
    };
    
    setUpdatedSetting(newSettings);
    onUpdate(newSettings);
  };
  
  const handleThresholdChange = (channel: string, value: string) => {
    const newSettings = { 
      ...updatedSetting,
      channels: {
        ...updatedSetting.channels,
        [channel]: {
          ...updatedSetting.channels[channel],
          threshold: value
        }
      }
    };
    
    setUpdatedSetting(newSettings);
    onUpdate(newSettings);
  };
  
  return (
    <div className="bg-muted/30 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-medium">{translateEventType(setting.eventType)}</h4>
          <p className="text-xs text-muted-foreground mt-1">{getEventDescription(setting.eventType)}</p>
        </div>
        <div className="flex items-center gap-1">
          <Switch 
            checked={!updatedSetting.muted}
            onCheckedChange={() => {
              const newSettings = { ...updatedSetting, muted: !updatedSetting.muted };
              setUpdatedSetting(newSettings);
              onUpdate(newSettings);
            }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 mt-3">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <Label htmlFor={`email-${setting.id}`} className="text-xs">البريد الإلكتروني</Label>
            <Switch 
              id={`email-${setting.id}`}
              checked={updatedSetting.channels.email?.enabled}
              onCheckedChange={() => handleChannelToggle('email')}
              disabled={updatedSetting.muted}
            />
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <Label htmlFor={`sms-${setting.id}`} className="text-xs">الرسائل النصية</Label>
            <Switch 
              id={`sms-${setting.id}`}
              checked={updatedSetting.channels.sms?.enabled}
              onCheckedChange={() => handleChannelToggle('sms')}
              disabled={updatedSetting.muted}
            />
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <Label htmlFor={`inapp-${setting.id}`} className="text-xs">داخل التطبيق</Label>
            <Switch 
              id={`inapp-${setting.id}`}
              checked={updatedSetting.channels['in-app']?.enabled}
              onCheckedChange={() => handleChannelToggle('in-app')}
              disabled={updatedSetting.muted}
            />
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <Label htmlFor={`push-${setting.id}`} className="text-xs">إشعارات الجوال</Label>
            <Switch 
              id={`push-${setting.id}`}
              checked={updatedSetting.channels.push?.enabled}
              onCheckedChange={() => handleChannelToggle('push')}
              disabled={updatedSetting.muted}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-3">
        <Label className="text-xs mb-1 block">مستوى الأولوية</Label>
        <Select 
          value={updatedSetting.channels['in-app']?.threshold || 'low'}
          onValueChange={(value) => handleThresholdChange('in-app', value)}
          disabled={updatedSetting.muted}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">منخفضة</SelectItem>
            <SelectItem value="medium">متوسطة</SelectItem>
            <SelectItem value="high">عالية</SelectItem>
            <SelectItem value="critical">حرجة</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

// Helper functions for translations
function translateCategory(category: string): string {
  const categories: Record<string, string> = {
    'inventory': 'المخزون',
    'expenses': 'المصروفات',
    'invoices': 'الفواتير',
    'customer': 'العملاء',
    'system': 'النظام',
  };
  
  return categories[category] || category;
}

function translateEventType(eventType: string): string {
  const types: Record<string, string> = {
    'inventory.low_stock': 'مخزون منخفض',
    'inventory.out_of_stock': 'نفاد المخزون',
    'expenses.pending_approval': 'مصروف ينتظر الموافقة',
    'expenses.approved': 'تمت الموافقة على المصروف',
    'expenses.rejected': 'تم رفض المصروف',
    'invoices.created': 'إنشاء فاتورة جديدة',
    'invoices.paid': 'دفع فاتورة',
    'invoices.overdue': 'فاتورة متأخرة',
    'customer.payment_received': 'استلام دفعة من العميل',
    'customer.credit_limit_reached': 'وصول العميل للحد الائتماني',
    'system.backup_complete': 'اكتمال النسخ الاحتياطي',
    'system.backup_failed': 'فشل النسخ الاحتياطي',
    'system.login_failed': 'فشل تسجيل الدخول',
    'system.suspicious_activity': 'نشاط مشبوه',
  };
  
  return types[eventType] || eventType;
}

function getEventDescription(eventType: string): string {
  const descriptions: Record<string, string> = {
    'inventory.low_stock': 'إشعار عندما يصل مخزون منتج إلى الحد الأدنى',
    'inventory.out_of_stock': 'إشعار عندما ينفد مخزون منتج',
    'expenses.pending_approval': 'إشعار عند وجود مصروف جديد ينتظر الموافقة',
    'expenses.approved': 'إشعار عندما تتم الموافقة على مصروف',
    'expenses.rejected': 'إشعار عندما يتم رفض مصروف',
    'invoices.created': 'إشعار عند إنشاء فاتورة جديدة',
    'invoices.paid': 'إشعار عند دفع فاتورة',
    'invoices.overdue': 'إشعار عندما تصبح الفاتورة متأخرة',
    'customer.payment_received': 'إشعار عند استلام دفعة من العميل',
    'customer.credit_limit_reached': 'إشعار عندما يصل العميل للحد الائتماني',
    'system.backup_complete': 'إشعار عند اكتمال عملية النسخ الاحتياطي',
    'system.backup_failed': 'إشعار عند فشل عملية النسخ الاحتياطي',
    'system.login_failed': 'إشعار عند فشل محاولة تسجيل الدخول',
    'system.suspicious_activity': 'إشعار عند اكتشاف نشاط مشبوه',
  };
  
  return descriptions[eventType] || '';
}

export default NotificationSettingsPage;
