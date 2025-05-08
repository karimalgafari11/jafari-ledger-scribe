
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectCalendarProps {
  projectId?: string;
}

export const ProjectCalendar: React.FC<ProjectCalendarProps> = ({ projectId }) => {
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
