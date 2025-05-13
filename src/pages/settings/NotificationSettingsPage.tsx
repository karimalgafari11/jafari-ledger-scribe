
import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockNotificationSettings, mockNotificationTemplates } from "@/data/mockNotifications";
import { NotificationChannel, NotificationPriority } from "@/types/notifications";
import { notificationEvents } from "@/components/settings/notifications/NotificationEventsData";
import { channelIcons } from "@/components/settings/notifications/ChannelIcons";
import { toast } from "sonner";
import ChannelsTabContent from "@/components/settings/notifications/ChannelsTabContent";
import EventsTabContent from "@/components/settings/notifications/EventsTabContent";
import TemplatesTabContent from "@/components/settings/notifications/TemplatesTabContent";
import ScheduleTabContent from "@/components/settings/notifications/ScheduleTabContent";
import NotificationChannelStats from "@/components/settings/notifications/NotificationChannelStats";
import { Card } from "@/components/ui/card";

const NotificationSettingsPage = () => {
  const [settings, setSettings] = useState(mockNotificationSettings);
  const [templates, setTemplates] = useState(mockNotificationTemplates);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaving, setIsSaving] = useState(false);

  // Stats for the overview tab
  const channelStats = {
    email: { total: 185, delivered: 176, failed: 9 },
    sms: { total: 97, delivered: 92, failed: 5 },
    inApp: { total: 453, delivered: 453, failed: 0 },
    push: { total: 214, delivered: 205, failed: 9 },
    slack: { total: 48, delivered: 47, failed: 1 },
    webhook: { total: 76, delivered: 73, failed: 3 }
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
                ...setting.scheduleQuiet || { startTime: "22:00", endTime: "08:00", timezone: "Asia/Riyadh" },
                enabled: !setting.scheduleQuiet?.enabled
              }
            }
          : setting
      )
    );
  };

  const handleQuietHoursChange = (eventType: string, field: "startTime" | "endTime", value: string) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.eventType === eventType 
          ? {
              ...setting,
              scheduleQuiet: {
                ...setting.scheduleQuiet || { startTime: "22:00", endTime: "08:00", timezone: "Asia/Riyadh", enabled: false },
                [field]: value
              }
            }
          : setting
      )
    );
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("تم حفظ الإعدادات بنجاح");
    } catch (error) {
      toast.error("حدث خطأ أثناء حفظ الإعدادات");
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle tab auto-switch on first load
  useEffect(() => {
    // Auto-select the "channels" tab after 1.5 seconds to demonstrate the UI
    const timer = setTimeout(() => {
      setActiveTab("channels");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageContainer title="إعدادات الإشعارات" showBack={true}>
      <div className="container p-6 mx-auto">
        <h1 className="text-2xl font-bold mb-6">إدارة قنوات الإشعارات</h1>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="channels">قنوات الإشعارات</TabsTrigger>
            <TabsTrigger value="events">أحداث الإشعارات</TabsTrigger>
            <TabsTrigger value="templates">قوالب الإشعارات</TabsTrigger>
            <TabsTrigger value="schedule">جدولة الإشعارات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-6">
              <NotificationChannelStats stats={channelStats} />
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">تكوين قنوات الإشعارات</h3>
                <p className="text-muted-foreground mb-3">
                  يمكنك تكوين قنوات الإشعارات المختلفة وإعدادات كل منها من خلال الانتقال إلى التبويبات أعلاه.
                </p>
                <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground mb-4">
                  <li><strong>قنوات الإشعارات:</strong> تكوين قنوات الإشعارات لكل نوع من أحداث النظام.</li>
                  <li><strong>أحداث الإشعارات:</strong> تكوين مستويات أولوية الإشعارات لكل حدث.</li>
                  <li><strong>قوالب الإشعارات:</strong> إدارة قوالب الإشعارات لكل نوع من الإشعارات.</li>
                  <li><strong>جدولة الإشعارات:</strong> تكوين ساعات الهدوء وجدولة الإشعارات.</li>
                </ul>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="channels">
            <ChannelsTabContent 
              notificationEvents={notificationEvents}
              settings={settings}
              channelIcons={channelIcons}
              handleChannelToggle={handleChannelToggle}
              handleThresholdChange={handleThresholdChange}
              handleSaveSettings={handleSaveSettings}
            />
          </TabsContent>
          
          <TabsContent value="events">
            <EventsTabContent 
              notificationEvents={notificationEvents}
              settings={settings}
              channelIcons={channelIcons}
              handleThresholdChange={handleThresholdChange}
              handleSaveSettings={handleSaveSettings}
            />
          </TabsContent>
          
          <TabsContent value="templates">
            <TemplatesTabContent 
              templates={templates}
              channelIcons={channelIcons}
            />
          </TabsContent>
          
          <TabsContent value="schedule">
            <ScheduleTabContent 
              notificationEvents={notificationEvents}
              settings={settings}
              handleQuietHoursToggle={handleQuietHoursToggle}
              handleQuietHoursChange={handleQuietHoursChange}
              handleSaveSettings={handleSaveSettings}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default NotificationSettingsPage;
