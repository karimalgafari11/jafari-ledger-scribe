
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NotificationSettings } from "@/types/notifications";
import NotificationEventCard from "./NotificationEventCard";

interface ChannelsTabContentProps {
  notificationEvents: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
  }[];
  settings: NotificationSettings[];
  channelIcons: Record<string, React.ReactNode>;
  handleChannelToggle: (eventType: string, channel: string) => void;
  handleThresholdChange: (eventType: string, channel: string, threshold: string) => void;
  handleSaveSettings: () => void;
}

const ChannelsTabContent = ({
  notificationEvents,
  settings,
  handleChannelToggle,
  handleThresholdChange,
  handleSaveSettings,
}: ChannelsTabContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إعدادات قنوات الإشعارات</CardTitle>
        <p className="text-gray-500 mt-1">تحديد كيفية استلام الإشعارات لكل نوع من الأحداث</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {notificationEvents.map(event => {
          const setting = settings.find(s => s.eventType === event.id) || settings[0];
          
          return (
            <NotificationEventCard 
              key={event.id}
              event={event}
              settings={setting}
              onChannelToggle={(channel) => handleChannelToggle(event.id, channel)}
              onThresholdChange={(channel, threshold) => handleThresholdChange(event.id, channel, threshold)}
            />
          );
        })}
        
        <div className="flex justify-end mt-6">
          <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelsTabContent;
