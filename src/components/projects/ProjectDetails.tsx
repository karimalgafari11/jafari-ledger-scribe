
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectDetailsProps {
  projectId?: string;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectId }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تفاصيل المشروع</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8">
          <p className="text-muted-foreground">
            سيتم تطوير صفحة تفاصيل المشاريع قريباً
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
