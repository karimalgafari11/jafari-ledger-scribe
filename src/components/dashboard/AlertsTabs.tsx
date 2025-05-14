
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemAlert } from "@/types/ai";
import { SystemAlertCard } from "@/components/ai/SystemAlertCard";
import { Badge } from "@/components/ui/badge";

interface AlertsTabsProps {
  alerts?: SystemAlert[];
}

export const AlertsTabs: React.FC<AlertsTabsProps> = ({ alerts = [] }) => {
  // Make sure we're working with a valid array by providing a default value
  const safeAlerts = Array.isArray(alerts) ? alerts : [];
  
  const highPriorityAlerts = safeAlerts.filter(alert => 
    alert && (alert.priority === "high" || alert.severity === "high")
  );
  
  const mediumPriorityAlerts = safeAlerts.filter(alert => 
    alert && (alert.priority === "medium" || alert.severity === "medium")
  );
  
  const lowPriorityAlerts = safeAlerts.filter(alert => 
    alert && (alert.priority === "low" || alert.severity === "low")
  );
  
  return (
    <Tabs defaultValue="all">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="all">
          الكل <Badge variant="outline" className="mr-2">{safeAlerts.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="high">
          عالية <Badge variant="outline" className="mr-2">{highPriorityAlerts.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="medium">
          متوسطة <Badge variant="outline" className="mr-2">{mediumPriorityAlerts.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="low">
          منخفضة <Badge variant="outline" className="mr-2">{lowPriorityAlerts.length}</Badge>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="space-y-4">
        {safeAlerts.length === 0 ? (
          <div className="text-center p-4">
            <p className="text-muted-foreground">لا توجد تنبيهات</p>
          </div>
        ) : (
          safeAlerts.map((alert, index) => (
            <SystemAlertCard key={alert.id || index} alert={alert} />
          ))
        )}
      </TabsContent>
      
      <TabsContent value="high" className="space-y-4">
        {highPriorityAlerts.length === 0 ? (
          <div className="text-center p-4">
            <p className="text-muted-foreground">لا توجد تنبيهات عالية الأولوية</p>
          </div>
        ) : (
          highPriorityAlerts.map((alert, index) => (
            <SystemAlertCard key={alert.id || index} alert={alert} />
          ))
        )}
      </TabsContent>
      
      <TabsContent value="medium" className="space-y-4">
        {mediumPriorityAlerts.length === 0 ? (
          <div className="text-center p-4">
            <p className="text-muted-foreground">لا توجد تنبيهات متوسطة الأولوية</p>
          </div>
        ) : (
          mediumPriorityAlerts.map((alert, index) => (
            <SystemAlertCard key={alert.id || index} alert={alert} />
          ))
        )}
      </TabsContent>
      
      <TabsContent value="low" className="space-y-4">
        {lowPriorityAlerts.length === 0 ? (
          <div className="text-center p-4">
            <p className="text-muted-foreground">لا توجد تنبيهات منخفضة الأولوية</p>
          </div>
        ) : (
          lowPriorityAlerts.map((alert, index) => (
            <SystemAlertCard key={alert.id || index} alert={alert} />
          ))
        )}
      </TabsContent>
    </Tabs>
  );
};
