
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, ProjectTask } from "@/types/project-management";

interface ProjectTasksProps {
  projectId?: string;
  projects?: Project[];
  tasks?: ProjectTask[];
}

export const ProjectTasks: React.FC<ProjectTasksProps> = ({ projectId, projects, tasks }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>مهام المشروع</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8">
          <p className="text-muted-foreground">
            سيتم تطوير قائمة مهام المشاريع قريباً
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
