
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectKanbanProps {
  projectId?: string;
}

export const ProjectKanban: React.FC<ProjectKanbanProps> = ({ projectId }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>لوحة كانبان المشروع</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8">
          <p className="text-muted-foreground">
            سيتم تطوير لوحة كانبان المشاريع قريباً
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
