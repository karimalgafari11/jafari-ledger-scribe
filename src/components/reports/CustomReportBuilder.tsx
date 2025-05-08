
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomReportBuilderProps {
  onSaveReport?: (reportData: any) => void;
}

const CustomReportBuilder: React.FC<CustomReportBuilderProps> = ({ onSaveReport }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إنشاء تقرير مخصص</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8">
          <p className="text-muted-foreground">
            سيتم تطوير أداة إنشاء التقارير المخصصة قريباً
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomReportBuilder;
