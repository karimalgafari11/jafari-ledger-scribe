
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface NotificationCategoryProps {
  eventType: string;
}

const NotificationCategory = ({ eventType }: NotificationCategoryProps) => {
  const category = eventType.split('.')[0]; // Get first part of event type
  
  let badgeStyle = "";
  let badgeText = "";
  
  switch (category) {
    case "inventory":
      badgeStyle = "bg-blue-100 text-blue-700 hover:bg-blue-100";
      badgeText = "المخزون";
      break;
    case "invoices":
      badgeStyle = "bg-green-100 text-green-700 hover:bg-green-100";
      badgeText = "الفواتير";
      break;
    case "expenses":
      badgeStyle = "bg-amber-100 text-amber-700 hover:bg-amber-100";
      badgeText = "المصروفات";
      break;
    case "customer":
      badgeStyle = "bg-purple-100 text-purple-700 hover:bg-purple-100";
      badgeText = "العملاء";
      break;
    case "system":
      badgeStyle = "bg-gray-100 text-gray-700 hover:bg-gray-100";
      badgeText = "النظام";
      break;
    default:
      badgeStyle = "bg-gray-100 text-gray-700 hover:bg-gray-100";
      badgeText = category;
  }
  
  return (
    <Badge variant="outline" className={`text-xs font-normal py-0 px-2 ${badgeStyle}`}>
      {badgeText}
    </Badge>
  );
};

export default NotificationCategory;
