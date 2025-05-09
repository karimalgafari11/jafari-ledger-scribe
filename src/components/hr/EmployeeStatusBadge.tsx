
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/types/hr";

interface EmployeeStatusBadgeProps {
  status: Employee["status"];
}

const EmployeeStatusBadge: React.FC<EmployeeStatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    'active': {
      label: "نشط",
      variant: "success" as const,
    },
    'vacation': {
      label: "إجازة",
      variant: "warning" as const,
    },
    'terminated': {
      label: "منتهي العقد",
      variant: "destructive" as const,
    },
    'sick-leave': {
      label: "إجازة مرضية",
      variant: "outline" as const,
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>{config.label}</Badge>
  );
};

export default EmployeeStatusBadge;
