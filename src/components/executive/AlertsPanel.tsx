
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  BellRing, 
  CheckCircle, 
  ChevronRight, 
  Clock, 
  Info
} from "lucide-react";
import { SystemAlert } from '@/types/ai';
import { formatDateTime } from '@/utils/formatters';

interface AlertsPanelProps {
  alerts: SystemAlert[];
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'default';
      default:
        return 'secondary';
    }
  };
  
  const getAlertIcon = (type: string, severity: string) => {
    if (severity === 'high') {
      return <AlertTriangle className="h-5 w-5 text-destructive" />;
    }
    
    switch (type) {
      case 'inventory':
      case 'budget':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'financial':
        return <BellRing className="h-5 w-5 text-amber-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-lg font-medium">لا توجد تنبيهات حالية</h3>
          <p className="text-sm text-muted-foreground mt-1">
            كل شيء يعمل بشكل جيد. سيتم إظهار التنبيهات هنا عندما تظهر.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 ${alert.read ? '' : 'bg-muted'}`}>
              <div className="flex gap-3">
                <div className="shrink-0 mt-1">
                  {getAlertIcon(alert.type, alert.severity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-medium">{alert.title}</h4>
                    <Badge variant={getSeverityColor(alert.severity)}>
                      {alert.severity === 'high' ? 'عالي' : alert.severity === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm">{alert.message}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(alert.timestamp.toISOString())}
                    </span>
                    {alert.actionRequired && (
                      <Button variant="link" size="sm" asChild className="p-0 h-auto">
                        <a href={alert.actionLink}>
                          اتخاذ إجراء <ChevronRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
