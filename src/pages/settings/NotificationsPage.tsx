
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notificationEvents } from "@/components/settings/notifications/NotificationEventsData";
import { channelIcons } from "@/components/settings/notifications/ChannelIcons";
import { useNotifications } from "@/hooks/useNotifications";
import ChannelsTabContent from "@/components/settings/notifications/ChannelsTabContent";
import EventsTabContent from "@/components/settings/notifications/EventsTabContent";
import TemplatesTabContent from "@/components/settings/notifications/TemplatesTabContent";
import ScheduleTabContent from "@/components/settings/notifications/ScheduleTabContent";
import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const {
    notificationSettings,
    templates,
    updateNotificationSettings,
    updateTemplate,
  } = useNotifications();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("channels");

  const handleChannelToggle = (eventType: string, channel: string) => {
    const setting = notificationSettings.find(s => s.eventType === eventType);
    if (setting) {
      const updatedSetting = {
        ...setting,
        channels: {
          ...setting.channels,
          [channel]: {
            ...setting.channels[channel],
            enabled: !setting.channels[channel]?.enabled
          }
        }
      };
      updateNotificationSettings(updatedSetting);
    }
  };

  const handleThresholdChange = (eventType: string, channel: string, threshold: string) => {
    const setting = notificationSettings.find(s => s.eventType === eventType);
    if (setting) {
      const updatedSetting = {
        ...setting,
        channels: {
          ...setting.channels,
          [channel]: {
            ...setting.channels[channel],
            threshold: threshold as any
          }
        }
      };
      updateNotificationSettings(updatedSetting);
    }
  };

  const handleQuietHoursToggle = (eventType: string) => {
    const setting = notificationSettings.find(s => s.eventType === eventType);
    if (setting) {
      const updatedSetting = {
        ...setting,
        scheduleQuiet: {
          ...setting.scheduleQuiet || { start: "22:00", end: "08:00", timezone: "Asia/Riyadh" },
          enabled: !setting.scheduleQuiet?.enabled
        }
      };
      updateNotificationSettings(updatedSetting);
    }
  };

  const handleQuietHoursChange = (eventType: string, field: "start" | "end", value: string) => {
    const setting = notificationSettings.find(s => s.eventType === eventType);
    if (setting) {
      const updatedSetting = {
        ...setting,
        scheduleQuiet: {
          ...setting.scheduleQuiet || { start: "22:00", end: "08:00", timezone: "Asia/Riyadh", enabled: false },
          [field]: value
        }
      };
      updateNotificationSettings(updatedSetting);
    }
  };

  const handleSaveSettings = () => {
    toast.success("تم حفظ إعدادات الإشعارات بنجاح");
  };

  const navigateToDetailSettings = () => {
    navigate("/settings/notification-settings");
  };

  return (
    <PageContainer title="إعدادات الإشعارات" showBack={true}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة الإشعارات</h1>
          <div className="space-x-2 flex">
            <Button 
              variant="outline" 
              onClick={() => navigate("/settings/send-notification")}
            >
              <Bell className="ml-2 h-4 w-4" />
              إرسال إشعار
            </Button>
            <Button onClick={navigateToDetailSettings}>
              <Settings className="ml-2 h-4 w-4" />
              إعدادات متقدمة
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="channels" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="channels">قنوات الإشعارات</TabsTrigger>
            <TabsTrigger value="events">أحداث الإشعارات</TabsTrigger>
            <TabsTrigger value="templates">قوالب الإشعارات</TabsTrigger>
            <TabsTrigger value="schedule">جدولة الإشعارات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="channels">
            <ChannelsTabContent 
              notificationEvents={notificationEvents}
              settings={notificationSettings}
              channelIcons={channelIcons}
              handleChannelToggle={handleChannelToggle}
              handleSaveSettings={handleSaveSettings}
            />
          </TabsContent>
          
          <TabsContent value="events">
            <EventsTabContent 
              notificationEvents={notificationEvents}
              settings={notificationSettings}
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
              settings={notificationSettings}
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

export default NotificationsPage;
