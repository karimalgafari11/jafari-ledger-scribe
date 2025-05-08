
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/project-management";

interface ProjectKanbanProps {
  projectId?: string;
  projects?: Project[];
  onSelectProject?: React.Dispatch<React.SetStateAction<string | null>>;
  onUpdateProject?: (updatedProject: Project) => void;
}

export const ProjectKanban: React.FC<ProjectKanbanProps> = ({ projectId, projects, onSelectProject, onUpdateProject }) => {
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
