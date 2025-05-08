
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/project-management";

interface ProjectStatusCardProps {
  projects?: Project[];
}

export const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({ projects = [] }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">حالة المشاريع</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-4">
          <p className="text-muted-foreground">
            سيتم تطوير بطاقة حالة المشاريع قريباً
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
