
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { DonutChart } from "@tremor/react";

interface NotificationChannelStatsProps {
  stats: {
    email: ChannelStat;
    sms: ChannelStat;
    inApp: ChannelStat;
    push: ChannelStat;
    slack: ChannelStat;
    webhook: ChannelStat;
  }
}

interface ChannelStat {
  total: number;
  delivered: number;
  failed: number;
}

const NotificationChannelStats: React.FC<NotificationChannelStatsProps> = ({ stats }) => {
  const channelColors = {
    email: "#8B5CF6", // Purple
    sms: "#F59E0B", // Amber
    inApp: "#10B981", // Green
    push: "#3B82F6", // Blue
    slack: "#EC4899", // Pink
    webhook: "#6366F1", // Indigo
  };
  
  const valueFormatter = (number: number) => {
    return `${number} إشعار`;
  };
  
  const getDeliveryRate = (channelStat: ChannelStat): number => {
    if (channelStat.total === 0) return 0;
    return Math.round((channelStat.delivered / channelStat.total) * 100);
  };
  
  const totalChartData = [
    { name: "البريد الإلكتروني", value: stats.email.total, color: channelColors.email },
    { name: "الرسائل النصية", value: stats.sms.total, color: channelColors.sms },
    { name: "داخل التطبيق", value: stats.inApp.total, color: channelColors.inApp },
    { name: "إشعارات الجوال", value: stats.push.total, color: channelColors.push },
    { name: "سلاك", value: stats.slack.total, color: channelColors.slack },
    { name: "ويب هوك", value: stats.webhook.total, color: channelColors.webhook },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">إحصائيات القنوات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <DonutChart
              data={totalChartData}
              category="value"
              index="name"
              valueFormatter={valueFormatter}
              colors={["indigo", "violet", "fuchsia", "rose", "cyan", "amber"]}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">أداء قنوات الإشعارات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                        <Mail size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium">البريد الإلكتروني</h4>
                        <p className="text-sm text-muted-foreground">
                          {stats.email.delivered} تم التسليم من {stats.email.total}
                        </p>
                      </div>
                    </div>
                    <Badge className={getDeliveryRate(stats.email) > 90 ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}>
                      {getDeliveryRate(stats.email)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                        <Smartphone size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium">الرسائل النصية</h4>
                        <p className="text-sm text-muted-foreground">
                          {stats.sms.delivered} تم التسليم من {stats.sms.total}
                        </p>
                      </div>
                    </div>
                    <Badge className={getDeliveryRate(stats.sms) > 90 ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}>
                      {getDeliveryRate(stats.sms)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg text-green-600">
                        <Bell size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium">داخل التطبيق</h4>
                        <p className="text-sm text-muted-foreground">
                          {stats.inApp.delivered} تم التسليم من {stats.inApp.total}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {getDeliveryRate(stats.inApp)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        <Bell size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium">إشعارات الجوال</h4>
                        <p className="text-sm text-muted-foreground">
                          {stats.push.delivered} تم التسليم من {stats.push.total}
                        </p>
                      </div>
                    </div>
                    <Badge className={getDeliveryRate(stats.push) > 90 ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}>
                      {getDeliveryRate(stats.push)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between mt-4 px-1">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm">معدل تسليم الإشعارات</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {Math.round((
                    stats.email.delivered + 
                    stats.sms.delivered +
                    stats.inApp.delivered +
                    stats.push.delivered +
                    stats.slack.delivered +
                    stats.webhook.delivered
                  ) / (
                    stats.email.total + 
                    stats.sms.total +
                    stats.inApp.total +
                    stats.push.total +
                    stats.slack.total +
                    stats.webhook.total
                  ) * 100)}%
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-red-500" />
                <span className="text-sm">معدل فشل الإشعارات</span>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  {Math.round((
                    stats.email.failed + 
                    stats.sms.failed +
                    stats.inApp.failed +
                    stats.push.failed +
                    stats.slack.failed +
                    stats.webhook.failed
                  ) / (
                    stats.email.total + 
                    stats.sms.total +
                    stats.inApp.total +
                    stats.push.total +
                    stats.slack.total +
                    stats.webhook.total
                  ) * 100)}%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationChannelStats;
