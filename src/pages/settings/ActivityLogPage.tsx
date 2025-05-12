
import React from 'react';
import { Header } from '@/components/Header';
import { ActivityLogTable } from '@/components/settings/activitylog/ActivityLogTable';
import { ActivityLogFilters } from '@/components/settings/activitylog/ActivityLogFilters';
import { ActivityLogStats } from '@/components/settings/activitylog/ActivityLogStats';
import { useUserActivity } from '@/hooks/useUserActivity';
import { FiltersType } from '@/types/definitions';

const ActivityLogPage: React.FC = () => {
  const {
    activities,
    loading,
    filters,
    stats,
    setFilters,
    clearFilters,
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
    setFilters({ ...filters, ...newFilters });
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
          onClear={clearFilters} 
          onExport={handleExport}
        />
        
        <ActivityLogTable 
          activities={activities} 
          loading={loading} 
        />
      </div>
    </div>
  );
};

export default ActivityLogPage;
