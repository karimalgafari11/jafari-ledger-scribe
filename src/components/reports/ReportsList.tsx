
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Report } from "@/types/custom-reports";

interface ReportsListProps {
  reports: Report[];
  onSelectReport?: (reportId: string) => void;
  onToggleFavorite?: (reportId: string) => void;
  onDeleteReport?: (reportId: string) => void;
  showActions?: boolean;
  isSelectable?: boolean;
}

export const ReportsList: React.FC<ReportsListProps> = ({ 
  reports, 
  onSelectReport, 
  onToggleFavorite, 
  onDeleteReport,
  showActions = true,
  isSelectable = true
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">التقارير المخصصة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">لا توجد تقارير مخصصة</div>
          ) : (
            reports.map((report) => (
              <div 
                key={report.id} 
                className={`p-4 border rounded-lg ${isSelectable ? 'hover:bg-accent/50 cursor-pointer' : ''} transition-colors`}
                onClick={() => isSelectable && onSelectReport && onSelectReport(report.id)}
              >
                {/* Rest of report rendering */}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
