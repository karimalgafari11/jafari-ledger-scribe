
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChannelCardProps {
  channelId: string;
  channelName: string;
  icon: React.ReactNode;
  isEnabled: boolean;
  threshold?: string;
  onToggle: () => void;
  onThresholdChange: (threshold: string) => void;
  deliveryStats?: {
    sent: number;
    delivered: number;
    failed: number;
  };
}

const ChannelCard = ({
  channelId,
  channelName,
  icon,
  isEnabled,
  threshold,
  onToggle,
  onThresholdChange,
  deliveryStats
}: ChannelCardProps) => {
  const getChannelLabel = (channel: string) => {
    switch (channel) {
      case "email": return "البريد الإلكتروني";
      case "sms": return "الرسائل النصية";
      case "in-app": return "داخل التطبيق";
      case "push": return "إشعارات الجوال";
      case "slack": return "سلاك";
      case "webhook": return "Webhook";
      default: return channel;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {icon}
            <Label htmlFor={channelId} className="font-medium">
              {getChannelLabel(channelName)}
            </Label>
          </div>
          <Switch
            id={channelId}
            checked={isEnabled}
            onCheckedChange={onToggle}
          />
        </div>
        
        {isEnabled && (
          <div className="mt-3">
            <Label htmlFor={`${channelId}-threshold`} className="text-xs mb-1 block">
              مستوى الأولوية
            </Label>
            <Select
              value={threshold || "low"}
              onValueChange={onThresholdChange}
              disabled={!isEnabled}
            >
              <SelectTrigger id={`${channelId}-threshold`} className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">منخفض</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="high">عالي</SelectItem>
                <SelectItem value="critical">حرج</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {isEnabled && deliveryStats && (
          <div className="mt-3 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>تم الإرسال: {deliveryStats.sent}</span>
              <span>فشل: {deliveryStats.failed}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChannelCard;
