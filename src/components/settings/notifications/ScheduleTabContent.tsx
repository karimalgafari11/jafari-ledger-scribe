
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import { NotificationSettings } from "@/types/notifications";

interface ScheduleTabContentProps {
  notificationEvents: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
  }[];
  settings: NotificationSettings[];
  handleQuietHoursToggle: (eventType: string) => void;
  handleQuietHoursChange: (eventType: string, field: "startTime" | "endTime", value: string) => void;
  handleSaveSettings: () => void;
}

const ScheduleTabContent = ({
  notificationEvents,
  settings,
  handleQuietHoursToggle,
  handleQuietHoursChange,
  handleSaveSettings,
}: ScheduleTabContentProps) => {
  return (
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
                      value={quietHours.startTime}
                      onChange={(e) => handleQuietHoursChange(event.id, "startTime", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`end-${event.id}`} className="mb-1 block">وقت النهاية</Label>
                    <Input
                      id={`end-${event.id}`}
                      type="time"
                      value={quietHours.endTime}
                      onChange={(e) => handleQuietHoursChange(event.id, "endTime", e.target.value)}
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
  );
};

export default ScheduleTabContent;
