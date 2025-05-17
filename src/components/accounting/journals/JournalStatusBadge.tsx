
import React from "react";
import { Badge } from "@/components/ui/badge";
import { JournalStatus } from "@/types/journal";

interface JournalStatusBadgeProps {
  status: JournalStatus;
  size?: "sm" | "md" | "lg";
}

export const JournalStatusBadge: React.FC<JournalStatusBadgeProps> = ({
  status,
  size = "md",
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case "approved":
        return {
          color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
          label: "معتمد",
          icon: "✓",
        };
      case "pending":
        return {
          color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
          label: "معلق",
          icon: "⌛",
        };
      case "canceled":
        return {
          color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800",
          label: "ملغي",
          icon: "✕",
        };
      case "draft":
      default:
        return {
          color: "bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
          label: "مسودة",
          icon: "◯",
        };
    }
  };

  const { color, label, icon } = getStatusConfig();
  
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5 rounded",
    md: "text-sm px-2 py-1 rounded-md",
    lg: "text-base px-3 py-1.5 rounded-lg",
  };

  return (
    <Badge
      variant="outline"
      className={`font-medium border ${color} ${sizeClasses[size]} transition-all`}
    >
      <span className="ml-1">{icon}</span>
      {label}
    </Badge>
  );
};
