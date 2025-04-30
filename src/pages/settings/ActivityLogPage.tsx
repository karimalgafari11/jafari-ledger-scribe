
import { useState } from "react";
import { useUserActivity } from "@/hooks/useUserActivity";
import ActivityLogTable from "@/components/settings/activitylog/ActivityLogTable";
import ActivityLogFilters from "@/components/settings/activitylog/ActivityLogFilters";
import ActivityLogStats from "@/components/settings/activitylog/ActivityLogStats";
import { Card } from "@/components/ui/card";

const ActivityLogPage = () => {
  const { 
    activities, 
    isLoading, 
    filters,
    searchActivities,
    exportActivities,
    updateFilter,
    resetFilters
  } = useUserActivity();

  return (
    <div className="container mx-auto p-6 rtl">
      <h1 className="text-2xl font-bold mb-6">سجل الأحداث ومراقبة النشاطات</h1>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-4">
          <ActivityLogStats activities={activities} />
        </Card>

        <Card className="p-4">
          <ActivityLogFilters 
            filters={filters}
            onUpdateFilter={updateFilter}
            onResetFilters={resetFilters}
            onSearch={searchActivities}
            onExport={exportActivities}
            isLoading={isLoading}
          />
        </Card>

        <Card className="overflow-hidden">
          <ActivityLogTable 
            activities={activities}
            isLoading={isLoading}
          />
        </Card>
      </div>
    </div>
  );
};

export default ActivityLogPage;
