
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SystemAlertCard } from "@/components/ai/SystemAlertCard";
import { useSystemAlerts } from "@/hooks/useSystemAlerts";

export const AiSystemAlerts: React.FC = () => {
  const { alerts } = useSystemAlerts();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">تنبيهات النظام</CardTitle>
        <CardDescription>
          التنبيهات الذكية التي تم اكتشافها من قبل النظام
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.slice(0, 3).map((alert) => (
            <SystemAlertCard key={alert.id} alert={alert} />
          ))}
          {alerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              لا توجد تنبيهات حالية
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" onClick={() => {}}>
          عرض جميع التنبيهات
        </Button>
      </CardFooter>
    </Card>
  );
};
