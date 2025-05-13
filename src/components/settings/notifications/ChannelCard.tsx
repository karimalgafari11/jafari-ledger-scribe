
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTranslatedChannelName, getPriorityTranslation } from "@/hooks/notifications/notificationUtils";
import { NotificationPriority } from "@/types/notifications";

interface ChannelCardProps {
  channelId: string;
  channelName: string;
  icon: React.ReactNode;
  isEnabled: boolean;
  onToggle: () => void;
  threshold?: string;
  onThresholdChange?: (value: string) => void;
  description?: string;
  deliveryStats?: {
    sent: number;
    delivered: number;
    failed: number;
  };
}

const ChannelCard: React.FC<ChannelCardProps> = ({
  channelId,
  channelName,
  icon,
  isEnabled,
  onToggle,
  threshold,
  onThresholdChange,
  description,
  deliveryStats,
}) => {
  return (
    <Card className={`transition-all duration-200 ${isEnabled ? 'border-primary/30 bg-primary/5' : 'opacity-80'}`}>
      <CardContent className="p-5">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className={`p-2 rounded-lg ${isEnabled ? 'bg-primary/10 text-primary' : 'bg-muted'}`}>
                {icon}
              </div>
              <div>
                <h3 className="text-lg font-medium">{getTranslatedChannelName(channelName)}</h3>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
              </div>
            </div>
            <Switch checked={isEnabled} onCheckedChange={onToggle} />
          </div>

          {isEnabled && (
            <>
              {onThresholdChange && (
                <div className="pt-2">
                  <Label htmlFor={`threshold-${channelId}`} className="text-sm mb-1 block">
                    أولوية الإشعارات
                  </Label>
                  <Select 
                    value={threshold} 
                    onValueChange={onThresholdChange}
                  >
                    <SelectTrigger id={`threshold-${channelId}`}>
                      <SelectValue placeholder="حدد أولوية الإشعار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{getPriorityTranslation("low")}</SelectItem>
                      <SelectItem value="medium">{getPriorityTranslation("medium")}</SelectItem>
                      <SelectItem value="high">{getPriorityTranslation("high")}</SelectItem>
                      <SelectItem value="critical">{getPriorityTranslation("critical")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    إظهار الإشعارات بأولوية {getPriorityTranslation(threshold || "low")} أو أعلى فقط
                  </p>
                </div>
              )}

              {deliveryStats && (
                <div className="flex justify-between mt-3 pt-3 border-t border-border">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">تم الإرسال</p>
                    <Badge variant="outline" className="mt-1">{deliveryStats.sent}</Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">تم التسليم</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mt-1">
                      {deliveryStats.delivered}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">فشل</p>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 mt-1">
                      {deliveryStats.failed}
                    </Badge>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelCard;
