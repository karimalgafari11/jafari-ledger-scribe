import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { mockNotificationSettings, mockNotificationTemplates } from "@/data/mockNotifications";
import { NotificationChannel, NotificationEvent, NotificationPriority } from "@/types/notifications";
import { Bell, Mail, MessageSquare, Smartphone, Clock, AlertTriangle } from "lucide-react";

const NotificationSettingsPage = () => {
  const [settings, setSettings] = useState(mockNotificationSettings);
  const [templates, setTemplates] = useState(mockNotificationTemplates);
  const [activeTab, setActiveTab] = useState("channels");

  const notificationEvents: { id: NotificationEvent; name: string; description: string; icon: React.ReactNode }[] = [
    { id: "inventory.low_stock", name: "مخزون منخفض", description: "عند وصول مخزون منتج إلى مستوى منخفض", icon: <AlertTriangle size={16} /> },
    { id: "inventory.out_of_stock", name: "نفاد المخزون", description: "عند نفاد مخزون منتج", icon: <AlertTriangle size={16} /> },
    { id: "expenses.pending_approval", name: "مصروف ينتظر الموافقة", description: "عند إنشاء مصروف جديد يحتاج موافقة", icon: <AlertTriangle size={16} /> },
    { id: "invoices.overdue", name: "فاتورة متأخرة", description: "عند تأخر سداد فاتورة عن موعدها", icon: <AlertTriangle size={16} /> },
    { id: "customer.credit_limit_reached", name: "تجاوز الحد الائتماني", description: "عند وصول عميل إلى حد الائتمان المسموح", icon: <AlertTriangle size={16} /> },
  ];

  const channelIcons: Record<NotificationChannel, React.ReactNode> = {
    "email": <Mail size={16} />,
    "sms": <Smartphone size={16} />,
    "in-app": <Bell size={16} />,
    "push": <Bell size={16} />,
    "slack": <MessageSquare size={16} />,
    "webhook": <MessageSquare size={16} />,
  };

  const handleChannelToggle = (eventType: string, channel: NotificationChannel) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.eventType === eventType 
          ? {
              ...setting,
              channels: {
                ...setting.channels,
                [channel]: {
                  ...setting.channels[channel],
                  enabled: !setting.channels[channel]?.enabled
                }
              }
            }
          : setting
      )
    );
  };

  const handleThresholdChange = (eventType: string, channel: NotificationChannel, threshold: NotificationPriority) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.eventType === eventType 
          ? {
              ...setting,
              channels: {
                ...setting.channels,
                [channel]: {
                  ...setting.channels[channel],
                  threshold
                }
              }
            }
          : setting
      )
    );
  };

  const handleQuietHoursToggle = (eventType: string) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.eventType === eventType 
          ? {
              ...setting,
              scheduleQuiet: {
                ...setting.scheduleQuiet || { start: "22:00", end: "08:00", timezone: "Asia/Riyadh" },
                enabled: !setting.scheduleQuiet?.enabled
              }
            }
          : setting
      )
    );
  };

  const handleQuietHoursChange = (eventType: string, field: "start" | "end", value: string) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.eventType === eventType 
          ? {
              ...setting,
              scheduleQuiet: {
                ...setting.scheduleQuiet || { start: "22:00", end: "08:00", timezone: "Asia/Riyadh", enabled: false },
                [field]: value
              }
            }
          : setting
      )
    );
  };

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log("Saving notification settings:", settings);
    // Show success message
    alert("تم حفظ الإعدادات بنجاح");
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-6">إعدادات الإشعارات</h1>
      
      <Tabs defaultValue="channels" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="channels">قنوات الإشعارات</TabsTrigger>
          <TabsTrigger value="events">أحداث الإشعارات</TabsTrigger>
          <TabsTrigger value="templates">قوالب الإشعارات</TabsTrigger>
          <TabsTrigger value="schedule">جدولة الإشعارات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="channels">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات قنوات الإشعارات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-6">تحديد كيفية استلام الإشعارات لكل نوع من الأحداث</p>
              
              {notificationEvents.map(event => {
                const setting = settings.find(s => s.eventType === event.id);
                
                return (
                  <div key={event.id} className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      {event.icon}
                      <h3 className="text-lg font-medium">{event.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(channelIcons).map(([channel, icon]) => (
                        <div key={channel} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-2">
                            {icon}
                            <Label htmlFor={`${event.id}-${channel}`}>
                              {channel === "email" && "البريد الإلكتروني"}
                              {channel === "sms" && "الرسائل النصية"}
                              {channel === "in-app" && "داخل التطبيق"}
                              {channel === "push" && "إشعارات الجوال"}
                              {channel === "slack" && "سلاك"}
                              {channel === "webhook" && "ويب هوك"}
                            </Label>
                          </div>
                          <Switch
                            id={`${event.id}-${channel}`}
                            checked={setting?.channels[channel as NotificationChannel]?.enabled || false}
                            onCheckedChange={() => handleChannelToggle(event.id, channel as NotificationChannel)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات أحداث الإشعارات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-6">تحديد مستوى الأولوية لكل نوع من أنواع الإشعارات</p>
              
              {notificationEvents.map(event => {
                const setting = settings.find(s => s.eventType === event.id);
                
                return (
                  <div key={event.id} className="mb-6 p-4 border rounded-md">
                    <div className="flex items-center gap-2 mb-3">
                      {event.icon}
                      <h3 className="text-lg font-medium">{event.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(channelIcons).map(([channel, icon]) => {
                        const channelSetting = setting?.channels[channel as NotificationChannel];
                        if (!channelSetting?.enabled) return null;
                        
                        return (
                          <div key={channel} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {icon}
                              <Label>
                                {channel === "email" && "مستوى أولوية البريد الإلكتروني"}
                                {channel === "sms" && "مستوى أولوية الرسائل النصية"}
                                {channel === "in-app" && "مستوى أولوية إشعارات التطبيق"}
                                {channel === "push" && "مستوى أولوية إشعارات الجوال"}
                                {channel === "slack" && "مستوى أولوية سلاك"}
                                {channel === "webhook" && "مستوى أولوية ويب هوك"}
                              </Label>
                            </div>
                            <Select
                              value={channelSetting?.threshold || "low"}
                              onValueChange={(value) => handleThresholdChange(
                                event.id, 
                                channel as NotificationChannel, 
                                value as NotificationPriority
                              )}
                            >
                              <SelectTrigger className="w-32">
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
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>قوالب الإشعارات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-6">تخصيص محتوى الإشعارات لكل نوع من الأحداث</p>
              
              {templates.map(template => (
                <div key={template.id} className="mb-6 p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">{template.name}</h3>
                  
                  <div className="mb-4">
                    <Label htmlFor={`subject-${template.id}`} className="mb-1 block">عنوان الإشعار</Label>
                    <Input id={`subject-${template.id}`} defaultValue={template.subject} />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor={`content-${template.id}`} className="mb-1 block">محتوى الإشعار</Label>
                    <textarea
                      id={`content-${template.id}`}
                      className="w-full min-h-[150px] p-2 border rounded-md"
                      defaultValue={template.content}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Label className="mb-1 block">المتغيرات المتاحة</Label>
                    <div className="flex flex-wrap gap-2">
                      {template.variables.map(variable => (
                        <span key={variable} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                          {`{{${variable}}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label className="mb-1 block">قنوات الإرسال</Label>
                    <div className="flex flex-wrap gap-2">
                      {template.channels.map(channel => (
                        <div key={channel} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md">
                          {channelIcons[channel]}
                          <span className="text-sm">
                            {channel === "email" && "البريد الإلكتروني"}
                            {channel === "sms" && "الرسائل النصية"}
                            {channel === "in-app" && "داخل التطبيق"}
                            {channel === "push" && "إشعارات الجوال"}
                            {channel === "slack" && "سلاك"}
                            {channel === "webhook" && "ويب هوك"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" className="mr-2">إعادة تعيين</Button>
                    <Button>حفظ القالب</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>جدولة الإشعارات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-6">تحديد أوقات الهدوء وجدولة الإشعارات</p>
              
              {notificationEvents.map(event => {
                const setting = settings.find(s => s.eventType === event.id);
                const quietHours = setting?.scheduleQuiet;
                
                return (
                  <div key={event.id} className="mb-6 p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {event.icon}
                        <h3 className="text-lg font-medium">{event.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <Label htmlFor={`quiet-${event.id}`}>تفعيل أوقات الهدوء</Label>
                        <Switch
                          id={`quiet-${event.id}`}
                          checked={quietHours?.enabled || false}
                          onCheckedChange={() => handleQuietHoursToggle(event.id)}
                        />
                      </div>
                    </div>
                    
                    {quietHours?.enabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor={`start-${event.id}`} className="mb-1 block">وقت البداية</Label>
                          <Input
                            id={`start-${event.id}`}
                            type="time"
                            value={quietHours.start}
                            onChange={(e) => handleQuietHoursChange(event.id, "start", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`end-${event.id}`} className="mb-1 block">وقت النهاية</Label>
                          <Input
                            id={`end-${event.id}`}
                            type="time"
                            value={quietHours.end}
                            onChange={(e) => handleQuietHoursChange(event.id, "end", e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              <Separator className="my-6" />
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">إعدادات عامة للإشعارات</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <Label htmlFor="digest-emails">تجميع الإشعارات في رسالة واحدة</Label>
                  <Switch id="digest-emails" />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <Label htmlFor="realtime-critical">إرسال الإشعارات الحرجة فوراً</Label>
                  <Switch id="realtime-critical" defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationSettingsPage;
