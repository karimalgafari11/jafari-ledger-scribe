
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NotificationSettings } from "@/types/notifications";

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
  handleSaveSettings: () => void;
}

const ChannelsTabContent = ({
  notificationEvents,
  settings,
  channelIcons,
  handleChannelToggle,
  handleSaveSettings,
}: ChannelsTabContentProps) => {
  return (
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
                      checked={setting?.channels[channel]?.enabled || false}
                      onCheckedChange={() => handleChannelToggle(event.id, channel)}
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
  );
};

export default ChannelsTabContent;
