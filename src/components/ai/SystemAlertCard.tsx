
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { SystemAlert } from "@/types/ai";

interface SystemAlertCardProps {
  alert?: SystemAlert;
  // For backward compatibility, also accept individual props
  title?: string;
  description?: string;
  severity?: string;
  timestamp?: Date;
  isRead?: boolean;
  source?: string;
  priority?: "high" | "medium" | "low";
  onMarkAsRead?: () => void;
  onDismiss?: () => void;
}

export const SystemAlertCard: React.FC<SystemAlertCardProps> = ({ 
  alert,
  title,
  description,
  severity,
  timestamp,
  isRead,
  source,
  priority,
  onMarkAsRead,
  onDismiss 
}) => {
  // Use alert properties if provided, otherwise use individual props
  const alertTitle = alert?.message || title || "";
  const alertPriority = alert?.priority || priority || "medium";
  const alertTime = alert?.timestamp || timestamp || new Date();
  
  const priorityColorClass = {
    high: "border-r-4 border-r-red-500 bg-red-50",
    medium: "border-r-4 border-r-amber-500 bg-amber-50",
    low: "border-r-4 border-r-green-500 bg-green-50",
  }[alertPriority];
  
  return (
    <Card className={`mb-2 ${priorityColorClass} border-0 shadow-sm`}>
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <AlertCircle className={`h-5 w-5 mt-1 ${
            alertPriority === "high" ? "text-red-500" : 
            alertPriority === "medium" ? "text-amber-500" : 
            "text-green-500"
          }`} />
          <div className="flex-1">
            <div className="font-medium text-gray-900">{alertTitle}</div>
            {(alert?.description || description) && (
              <div className="text-sm text-gray-600 mt-1">{alert?.description || description}</div>
            )}
            <div className="text-xs text-gray-500 mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatDistanceToNow(alertTime, { addSuffix: true, locale: ar })}
            </div>
            {(onMarkAsRead || onDismiss) && (
              <div className="flex gap-2 mt-2">
                {onMarkAsRead && (
                  <button 
                    className="text-xs text-blue-600 hover:underline"
                    onClick={onMarkAsRead}
                  >
                    تعليم كمقروء
                  </button>
                )}
                {onDismiss && (
                  <button 
                    className="text-xs text-red-600 hover:underline"
                    onClick={onDismiss}
                  >
                    تجاهل
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
