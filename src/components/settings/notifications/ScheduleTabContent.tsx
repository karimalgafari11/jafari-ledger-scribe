
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NotificationSettings } from '@/types/notifications';

interface ScheduleTabContentProps {
  notificationEvents: { id: string; name: string; description: string }[];
  settings: NotificationSettings[];
  handleQuietHoursToggle: (eventType: string) => void;
  handleQuietHoursChange: (eventType: string, field: "startTime" | "endTime", value: string) => void;
  handleSaveSettings: () => void;
}

const ScheduleTabContent: React.FC<ScheduleTabContentProps> = ({
  notificationEvents,
  settings,
  handleQuietHoursToggle,
  handleQuietHoursChange,
  handleSaveSettings
}) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">ساعات الهدوء</h2>
          <p className="text-muted-foreground">
            تكوين الفترات الزمنية التي لا يتم فيها إرسال الإشعارات. يمكنك تكوين ساعات الهدوء لكل نوع من أنواع الإشعارات.
          </p>
        </div>

        <div className="space-y-6">
          {notificationEvents.map((event) => {
            const setting = settings.find(s => s.eventType === event.id);
            const enabled = setting?.scheduleQuiet?.enabled || false;
            const startTime = setting?.scheduleQuiet?.startTime || "22:00";
            const endTime = setting?.scheduleQuiet?.endTime || "08:00";

            return (
              <div key={event.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={() => handleQuietHoursToggle(event.id)}
                  />
                </div>

                {enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium block">وقت البداية</label>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="time"
                          value={startTime}
                          onChange={(e) => handleQuietHoursChange(event.id, "startTime", e.target.value)}
                          className="max-w-[120px]"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium block">وقت الانتهاء</label>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="time"
                          value={endTime}
                          onChange={(e) => handleQuietHoursChange(event.id, "endTime", e.target.value)}
                          className="max-w-[120px]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  );
};

export default ScheduleTabContent;
