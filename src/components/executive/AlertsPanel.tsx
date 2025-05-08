
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemAlert } from "@/types/ai";
import { SystemAlertCard } from "@/components/ai/SystemAlertCard";

interface AlertsPanelProps {
  alerts?: SystemAlert[];
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts = [] }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">التنبيهات</CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length > 0 ? (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <SystemAlertCard key={index} alert={alert} />
            ))}
          </div>
        ) : (
          <div className="text-center p-4">
            <p className="text-muted-foreground">
              لا توجد تنبيهات حالياً
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
