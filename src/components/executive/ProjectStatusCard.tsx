
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  overdueProjects: number;
  totalBudget: number;
  spentBudget: number;
  statusChart: any;
  budgetChart: any;
}

interface ProjectStatusCardProps {
  stats: ProjectStats;
  showDetails?: boolean;
}

export const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({ stats, showDetails = false }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="text-sm text-muted-foreground">المشاريع النشطة</div>
          <div className="text-2xl font-medium">{stats.activeProjects}</div>
          <div className="text-xs text-muted-foreground">
            {Math.round((stats.activeProjects / stats.totalProjects) * 100)}% من المجموع
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">المشاريع المكتملة</div>
          <div className="text-2xl font-medium">{stats.completedProjects}</div>
          <div className="text-xs text-muted-foreground">
            {Math.round((stats.completedProjects / stats.totalProjects) * 100)}% من المجموع
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">المشاريع المتأخرة</div>
          <div className="text-2xl font-medium text-red-500">{stats.overdueProjects}</div>
          <div className="text-xs text-muted-foreground">
            {Math.round((stats.overdueProjects / stats.totalProjects) * 100)}% من المجموع
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">نسبة استهلاك الميزانية</div>
          <div className="text-2xl font-medium">
            {Math.round((stats.spentBudget / stats.totalBudget) * 100)}%
          </div>
          <div className="text-xs text-muted-foreground">
            {new Intl.NumberFormat('ar-SA').format(stats.spentBudget)} / {new Intl.NumberFormat('ar-SA').format(stats.totalBudget)} ر.س
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>نسبة اكتمال المشاريع</span>
              <span>{Math.round((stats.completedProjects / stats.totalProjects) * 100)}%</span>
            </div>
            <Progress value={(stats.completedProjects / stats.totalProjects) * 100} />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>نسبة استهلاك الميزانية</span>
              <span>{Math.round((stats.spentBudget / stats.totalBudget) * 100)}%</span>
            </div>
            <Progress value={(stats.spentBudget / stats.totalBudget) * 100} />
          </div>
        </div>
      )}
    </div>
  );
};
