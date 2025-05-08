
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, ProjectTask } from "@/types/project-management";

interface ProjectCalendarProps {
  projectId?: string;
  projects?: Project[];
  tasks?: ProjectTask[];
  onSelectProject?: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ProjectCalendar: React.FC<ProjectCalendarProps> = ({ projectId, projects, tasks, onSelectProject }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تقويم المشروع</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8">
          <p className="text-muted-foreground">
            سيتم تطوير تقويم المشاريع قريباً
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
