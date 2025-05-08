
import React from "react";

interface ProjectStatusCardProps {
  stats?: any;
  showDetails?: boolean;
}

export const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({ stats, showDetails }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-muted rounded p-3">
          <p className="text-sm text-muted-foreground">Active Projects</p>
          <p className="text-2xl font-bold">{stats?.activeProjects || 0}</p>
        </div>
        <div className="bg-muted rounded p-3">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold">{stats?.completedProjects || 0}</p>
        </div>
        <div className="bg-muted rounded p-3">
          <p className="text-sm text-muted-foreground">Budget Usage</p>
          <p className="text-2xl font-bold">
            {stats ? Math.round((stats.spentBudget / stats.totalBudget) * 100) : 0}%
          </p>
        </div>
        <div className="bg-muted rounded p-3">
          <p className="text-sm text-muted-foreground">Overdue</p>
          <p className="text-2xl font-bold">{stats?.overdueProjects || 0}</p>
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Project Budget Overview</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Budget</span>
              <span className="font-medium">${stats?.totalBudget?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Spent</span>
              <span className="font-medium">${stats?.spentBudget?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Remaining</span>
              <span className="font-medium">${(stats?.totalBudget - stats?.spentBudget)?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
