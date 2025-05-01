
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { SystemAlert } from "@/types/ai";

interface SystemAlertCardProps {
  alert: SystemAlert;
}

export const SystemAlertCard: React.FC<SystemAlertCardProps> = ({ alert }) => {
  const priorityColorClass = {
    high: "border-r-4 border-r-red-500 bg-red-50",
    medium: "border-r-4 border-r-amber-500 bg-amber-50",
    low: "border-r-4 border-r-green-500 bg-green-50",
  }[alert.priority];
  
  return (
    <Card className={`mb-2 ${priorityColorClass} border-0 shadow-sm`}>
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <AlertCircle className={`h-5 w-5 mt-1 ${
            alert.priority === "high" ? "text-red-500" : 
            alert.priority === "medium" ? "text-amber-500" : 
            "text-green-500"
          }`} />
          <div className="flex-1">
            <div className="font-medium text-gray-900">{alert.message}</div>
            <div className="text-xs text-gray-500 mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatDistanceToNow(alert.timestamp, { addSuffix: true, locale: ar })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
