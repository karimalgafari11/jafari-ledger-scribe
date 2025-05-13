
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ChannelCard from "./ChannelCard";
import { channelIcons } from "./ChannelIcons";
import { NotificationSettings } from "@/types/notifications";

interface NotificationEventCardProps {
  event: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
  };
  settings: NotificationSettings;
  onChannelToggle: (channel: string) => void;
  onThresholdChange: (channel: string, threshold: string) => void;
}

const NotificationEventCard: React.FC<NotificationEventCardProps> = ({
  event,
  settings,
  onChannelToggle,
  onThresholdChange,
}) => {
  const channelDeliveryStats = {
    email: { sent: 28, delivered: 26, failed: 2 },
    sms: { sent: 12, delivered: 11, failed: 1 },
    "in-app": { sent: 45, delivered: 45, failed: 0 },
    push: { sent: 32, delivered: 30, failed: 2 },
    slack: { sent: 5, delivered: 5, failed: 0 },
    webhook: { sent: 8, delivered: 7, failed: 1 },
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {event.icon}
          <CardTitle className="text-lg font-medium">{event.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
        
        <Accordion type="single" collapsible defaultValue="channels" className="w-full">
          <AccordionItem value="channels">
            <AccordionTrigger className="text-md font-medium py-2">قنوات الإشعارات</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {Object.entries(channelIcons).map(([channel, icon]) => {
                  const channelSettings = settings.channels[channel] || { enabled: false };
                  
                  return (
                    <ChannelCard
                      key={channel}
                      channelId={`${event.id}-${channel}`}
                      channelName={channel}
                      icon={icon}
                      isEnabled={channelSettings.enabled || false}
                      threshold={channelSettings.threshold}
                      onToggle={() => onChannelToggle(channel)}
                      onThresholdChange={(value) => onThresholdChange(channel, value)}
                      deliveryStats={channelDeliveryStats[channel]}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default NotificationEventCard;
