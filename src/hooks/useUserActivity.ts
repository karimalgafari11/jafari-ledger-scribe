
import { useState } from 'react';
import { UserActivity, ActivityAction } from '@/types/permissions';
import { mockUserActivities } from '@/data/mockPermissions';
import { toast } from 'sonner';

export function useUserActivity() {
  const [activities, setActivities] = useState<UserActivity[]>(mockUserActivities);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    userId: '',
    action: '' as ActivityAction | '',
    module: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    status: '' as 'success' | 'failed' | 'warning' | 'info' | '',
  });
  
  // إضافة نشاط جديد
  const logActivity = async (
    activity: Omit<UserActivity, 'id' | 'timestamp' | 'ipAddress'>
  ) => {
    try {
      const newActivity: UserActivity = {
        ...activity,
        id: `act-${Date.now()}`,
        timestamp: new Date(),
        ipAddress: '127.0.0.1', // في الواقع هذا سيأتي من الواجهة الخلفية
      };
      
      setActivities(prev => [newActivity, ...prev]);
      return newActivity;
    } catch (error) {
      console.error('فشل تسجيل النشاط:', error);
      return null;
    }
  };
  
  // البحث في سجل الأنشطة
  const searchActivities = async () => {
    setIsLoading(true);
    
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // تصفية الأنشطة حسب المعايير
      const filteredActivities = mockUserActivities.filter(activity => {
        // تصفية حسب المستخدم
        if (filters.userId && activity.userId !== filters.userId) {
          return false;
        }
        
        // تصفية حسب نوع النشاط
        if (filters.action && activity.action !== filters.action) {
          return false;
        }
        
        // تصفية حسب الوحدة
        if (filters.module && activity.module !== filters.module) {
          return false;
        }
        
        // تصفية حسب الحالة
        if (filters.status && activity.status !== filters.status) {
          return false;
        }
        
        // تصفية حسب التاريخ
        if (filters.startDate && activity.timestamp < filters.startDate) {
          return false;
        }
        
        if (filters.endDate) {
          const endDateWithTime = new Date(filters.endDate);
          endDateWithTime.setHours(23, 59, 59, 999);
          if (activity.timestamp > endDateWithTime) {
            return false;
          }
        }
        
        return true;
      });
      
      setActivities(filteredActivities);
      return filteredActivities;
    } catch (error) {
      toast.error('حدث خطأ أثناء البحث في سجل الأنشطة');
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  // تصدير سجل الأنشطة
  const exportActivities = async (format: 'pdf' | 'excel' | 'csv') => {
    setIsLoading(true);
    
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`تم تصدير سجل الأنشطة بتنسيق ${format} بنجاح`);
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء تصدير سجل الأنشطة');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // تحديث المرشحات
  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: typeof filters[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // إعادة تعيين المرشحات
  const resetFilters = () => {
    setFilters({
      userId: '',
      action: '',
      module: '',
      startDate: null,
      endDate: null,
      status: '',
    });
    
    // إعادة تحميل جميع الأنشطة
    setActivities(mockUserActivities);
  };

  return {
    activities,
    isLoading,
    filters,
    logActivity,
    searchActivities,
    exportActivities,
    updateFilter,
    resetFilters,
  };
}
