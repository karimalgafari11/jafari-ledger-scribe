
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/project-management";

interface ProjectDetailsProps {
  projectId?: string;
  project?: Project;
  onBack?: () => void;
  onUpdate?: (updatedProject: Project) => void;
  onDelete?: () => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectId, project, onBack, onUpdate, onDelete }) => {
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
