
import React from 'react';
import { Header } from '@/components/Header';
import ActivityLogTable from '@/components/settings/activitylog/ActivityLogTable';
import ActivityLogFilters from '@/components/settings/activitylog/ActivityLogFilters';
import ActivityLogStats from '@/components/settings/activitylog/ActivityLogStats';
import { useUserActivity } from '@/hooks/useUserActivity';
import { FiltersType } from '@/types/definitions';

const ActivityLogPage: React.FC = () => {
  const {
    activities,
    loading,
    filters,
    isLoading,
    updateFilter,
    resetFilters,
    searchActivities,
    exportActivities
  } = useUserActivity();

  const handleSearch = async () => {
    await searchActivities();
  };

  const handleExport = async (format: 'excel' | 'pdf' | 'csv') => {
    return await exportActivities(format);
  };

  const handleFilterChange = (newFilters: Partial<FiltersType>) => {
    for (const [key, value] of Object.entries(newFilters)) {
      updateFilter(key as keyof FiltersType, value);
    }
  };

  // Create simple stats object based on activities
  const stats = {
    total: activities.length,
    success: activities.filter(a => a.status === 'success').length,
    failed: activities.filter(a => a.status === 'failed').length,
    warning: activities.filter(a => a.status === 'warning').length
  };

  return (
    <div className="page-container">
      <Header title="سجل النشاط" showBack={true} />
      
      <div className="page-content">
        <ActivityLogStats stats={stats} />
        
        <ActivityLogFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onSearch={handleSearch} 
          onClear={resetFilters} 
          onExport={handleExport}
          isLoading={isLoading}
        />
        
        <ActivityLogTable 
          activities={activities} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default ActivityLogPage;
