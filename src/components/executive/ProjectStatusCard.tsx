
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChartData } from '@/types/custom-reports';

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  overdueProjects: number;
  totalBudget: number;
  spentBudget: number;
  statusChart: ChartData;
  budgetChart: ChartData;
}

export interface ProjectStatusCardProps {
  totalProjects?: number;
  activeProjects?: number;
  completedProjects?: number;
  overdueProjects?: number;
  totalBudget?: number;
  spentBudget?: number;
  statusChart?: ChartData;
  budgetChart?: ChartData;
  stats?: ProjectStats;
  showDetails?: boolean;
}

export const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({
  stats,
  showDetails = false,
  ...props
}) => {
  // Combine props with stats if provided
  const totalProjects = stats?.totalProjects || props.totalProjects || 0;
  const activeProjects = stats?.activeProjects || props.activeProjects || 0;
  const completedProjects = stats?.completedProjects || props.completedProjects || 0;
  const overdueProjects = stats?.overdueProjects || props.overdueProjects || 0;
  const totalBudget = stats?.totalBudget || props.totalBudget || 0;
  const spentBudget = stats?.spentBudget || props.spentBudget || 0;

  const completionPercentage = totalProjects > 0 
    ? Math.round((completedProjects / totalProjects) * 100) 
    : 0;
  
  const budgetPercentage = totalBudget > 0 
    ? Math.round((spentBudget / totalBudget) * 100) 
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-lg font-medium">{completionPercentage}%</span>
          <span className="text-sm text-muted-foreground ml-1">اكتمال</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {completedProjects} / {totalProjects}
        </div>
      </div>
      
      <Progress value={completionPercentage} className="h-2" />
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="border rounded-md p-2 text-center">
          <div className="text-sm font-medium">{activeProjects}</div>
          <div className="text-xs text-muted-foreground">نشط</div>
        </div>
        <div className="border rounded-md p-2 text-center bg-green-50">
          <div className="text-sm font-medium">{completedProjects}</div>
          <div className="text-xs text-muted-foreground">مكتمل</div>
        </div>
        <div className="border rounded-md p-2 text-center bg-red-50">
          <div className="text-sm font-medium">{overdueProjects}</div>
          <div className="text-xs text-muted-foreground">متأخر</div>
        </div>
      </div>

      {showDetails && (
        <>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-lg font-medium">{budgetPercentage}%</span>
                <span className="text-sm text-muted-foreground ml-1">من الميزانية</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{(spentBudget / 1000).toFixed(0)}K</span>
                <span className="text-muted-foreground"> / {(totalBudget / 1000).toFixed(0)}K</span>
              </div>
            </div>
            <Progress value={budgetPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-sm font-medium mb-2">المشاريع حسب الحالة</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="bg-blue-50">قيد التنفيذ ({activeProjects})</Badge>
                <Badge variant="outline" className="bg-green-50">مكتملة ({completedProjects})</Badge>
                <Badge variant="outline" className="bg-red-50">متأخرة ({overdueProjects})</Badge>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">التكاليف</h4>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المخطط</span>
                  <span>{(totalBudget / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الفعلي</span>
                  <span>{(spentBudget / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
