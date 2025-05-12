
import { useState, useCallback, useEffect } from 'react';
import { UserActivity, ActivityAction } from '@/types/permissions';
import { FiltersType } from '@/types/definitions';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { mockUserActivities } from '@/data/mockPermissions';

export function useUserActivity() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<UserActivity[]>(mockUserActivities);
  const [filters, setFilters] = useState<FiltersType>({userId: ''});
  const { user } = useAuth();
  
  // load activities at startup
  useEffect(() => {
    loadActivities();
  }, []);

  // load activities from data source
  const loadActivities = async () => {
    setIsLoading(true);
    try {
      // replace mock activities with real API call
      setActivities(mockUserActivities);
    } catch (error) {
      console.error('Failed to load activity log:', error);
      toast.error('Failed to load activity log');
    } finally {
      setIsLoading(false);
    }
  };
  
  // log new activity
  const logActivity = useCallback(async (
    activityData: Omit<UserActivity, 'id' | 'timestamp' | 'ipAddress'>
  ) => {
    try {
      setLoading(true);
      
      // add logic to log activity to database
      
      console.log('Activity logged:', activityData);
      
      // add new activity to local state
      const newActivity: UserActivity = {
        ...activityData,
        id: `activity-${Date.now()}`,
        timestamp: new Date(),
        ipAddress: '192.168.1.1' // replace with real IP
      };
      
      setActivities(prev => [newActivity, ...prev]);
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Failed to log activity:', error);
      toast.error('Failed to log activity');
      setLoading(false);
      return false;
    }
  }, []);

  // get user activity log
  const getUserActivities = useCallback(async (userId?: string, limit = 50) => {
    try {
      setLoading(true);
      
      // logic to retrieve user activity log
      const targetUserId = userId || user?.id;
      
      if (!targetUserId) {
        console.warn('No user ID specified for activity retrieval');
        setLoading(false);
        return [];
      }
      
      // return activities from local state
      const filteredActivities = activities
        .filter(activity => activity.userId === targetUserId)
        .slice(0, limit);
      
      setLoading(false);
      return filteredActivities;
    } catch (error) {
      console.error('Failed to retrieve activity log:', error);
      toast.error('Failed to retrieve activity log');
      setLoading(false);
      return [];
    }
  }, [activities, user]);

  // update filter
  const updateFilter = useCallback((key: keyof FiltersType, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // reset filters
  const resetFilters = useCallback(() => {
    setFilters({userId: ''});
  }, []);

  // search activities with filters
  const searchActivities = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // apply filters to mock data
      const filtered = mockUserActivities.filter(activity => {
        // date filters
        if (filters.startDate && new Date(activity.timestamp) < filters.startDate) return false;
        if (filters.endDate && new Date(activity.timestamp) > filters.endDate) return false;
        
        // user filter
        if (filters.userId && activity.userId !== filters.userId) return false;
        
        // action filter
        if (filters.action && activity.action !== filters.action) return false;
        
        // module filter
        if (filters.module && activity.module !== filters.module) return false;
        
        // status filter
        if (filters.status && activity.status !== filters.status) return false;
        
        // search text filter
        if (
          filters.searchText && 
          !activity.details.toLowerCase().includes(filters.searchText.toLowerCase()) &&
          !activity.username.toLowerCase().includes(filters.searchText.toLowerCase())
        ) return false;
        
        return true;
      });
      
      setActivities(filtered);
      toast.info(`Found ${filtered.length} records`);

      return Promise.resolve();
    } catch (error) {
      console.error('Error during search:', error);
      toast.error('Error during search');
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // export activities
  const exportActivities = useCallback(async (format: 'excel' | 'pdf' | 'csv' = 'excel') => {
    setIsLoading(true);
    
    try {
      // export logic
      console.log(`Exporting data in ${format} format`);
      
      toast.success('Activity log exported successfully');
      return Promise.resolve(true);
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export activity log');
      return Promise.resolve(false);
    } finally {
      setIsLoading(false);
    }
  }, [activities]);

  return {
    logActivity,
    getUserActivities,
    loading,
    activities,
    isLoading,
    filters,
    searchActivities,
    exportActivities,
    updateFilter,
    resetFilters
  };
}
