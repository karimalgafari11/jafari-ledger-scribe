
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NotificationSettings, NotificationPriority } from "@/types/notifications";

interface EventsTabContentProps {
  notificationEvents: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
  }[];
  settings: NotificationSettings[];
  channelIcons: Record<string, React.ReactNode>;
  handleThresholdChange: (eventType: string, channel: string, threshold: NotificationPriority) => void;
  handleSaveSettings: () => void;
}

const EventsTabContent = ({
  notificationEvents,
  settings,
  channelIcons,
  handleThresholdChange,
  handleSaveSettings,
}: EventsTabContentProps) => {
  return (
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
                  const channelSetting = setting?.channels[channel];
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
                          channel, 
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
  );
};

export default EventsTabContent;
