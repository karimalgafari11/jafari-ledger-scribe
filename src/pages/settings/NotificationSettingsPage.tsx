
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockNotificationSettings, mockNotificationTemplates } from "@/data/mockNotifications";
import { NotificationChannel, NotificationEvent, NotificationPriority } from "@/types/notifications";
import { notificationEvents } from "@/components/settings/notifications/NotificationEventsData";
import { channelIcons } from "@/components/settings/notifications/ChannelIcons";
import ChannelsTabContent from "@/components/settings/notifications/ChannelsTabContent";
import EventsTabContent from "@/components/settings/notifications/EventsTabContent";
import TemplatesTabContent from "@/components/settings/notifications/TemplatesTabContent";
import ScheduleTabContent from "@/components/settings/notifications/ScheduleTabContent";

const NotificationSettingsPage = () => {
  const [settings, setSettings] = useState(mockNotificationSettings);
  const [templates, setTemplates] = useState(mockNotificationTemplates);
  const [activeTab, setActiveTab] = useState("channels");

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
          <ChannelsTabContent 
            notificationEvents={notificationEvents}
            settings={settings}
            channelIcons={channelIcons}
            handleChannelToggle={handleChannelToggle}
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
  );
};

export default NotificationSettingsPage;
