
import { useState, useCallback, useEffect } from 'react';
import { UserActivity, ActivityAction } from '@/types/permissions';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { mockUserActivities } from '@/data/mockPermissions';

// تعريف نوع المرشح للأنشطة
interface ActivityFilter {
  startDate?: Date;
  endDate?: Date;
  userId?: string;
  action?: string;
  module?: string;
  status?: string;
  searchText?: string;
}

export function useUserActivity() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<UserActivity[]>(mockUserActivities);
  const [filters, setFilters] = useState<ActivityFilter>({});
  const { user } = useAuth();
  
  // تحميل الأنشطة عند بدء التشغيل
  useEffect(() => {
    loadActivities();
  }, []);

  // تحميل الأنشطة من مصدر البيانات
  const loadActivities = async () => {
    setIsLoading(true);
    try {
      // هنا يمكن استبدال الأنشطة الوهمية بطلب API حقيقي
      setActivities(mockUserActivities);
    } catch (error) {
      console.error('فشل في تحميل سجل الأنشطة:', error);
      toast.error('فشل في تحميل سجل الأنشطة');
    } finally {
      setIsLoading(false);
    }
  };
  
  // تسجيل نشاط جديد
  const logActivity = useCallback(async (
    activityData: Omit<UserActivity, 'id' | 'timestamp' | 'ipAddress'>
  ) => {
    try {
      setLoading(true);
      
      // هنا يمكننا إضافة منطق لتسجيل النشاط في قاعدة البيانات
      // مثلاً استدعاء API أو استخدام Supabase
      
      console.log('تم تسجيل النشاط:', activityData);
      
      // إضافة النشاط الجديد للحالة المحلية
      const newActivity: UserActivity = {
        ...activityData,
        id: `activity-${Date.now()}`,
        timestamp: new Date(),
        ipAddress: '192.168.1.1' // يمكن استبداله بالعنوان الحقيقي
      };
      
      setActivities(prev => [newActivity, ...prev]);
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('فشل في تسجيل النشاط:', error);
      toast.error('فشل في تسجيل النشاط في السجل');
      setLoading(false);
      return false;
    }
  }, []);

  // استرجاع سجل أنشطة المستخدم
  const getUserActivities = useCallback(async (userId?: string, limit = 50) => {
    try {
      setLoading(true);
      
      // هنا يمكننا إضافة منطق لاسترجاع سجل أنشطة المستخدم
      // الافتراضي هو استرجاع سجل المستخدم الحالي
      const targetUserId = userId || user?.id;
      
      if (!targetUserId) {
        console.warn('لم يتم تحديد معرف المستخدم لاسترجاع سجل الأنشطة');
        setLoading(false);
        return [];
      }
      
      // هنا فقط نرجع الأنشطة من الحالة المحلية
      // في التطبيق الحقيقي، يمكن استبدالها باستدعاء API
      const filteredActivities = activities
        .filter(activity => activity.userId === targetUserId)
        .slice(0, limit);
      
      setLoading(false);
      return filteredActivities;
    } catch (error) {
      console.error('فشل في استرجاع سجل الأنشطة:', error);
      toast.error('فشل في استرجاع سجل الأنشطة');
      setLoading(false);
      return [];
    }
  }, [activities, user]);

  // تحديث المرشحات
  const updateFilter = useCallback((key: keyof ActivityFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // إعادة تعيين المرشحات
  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  // البحث في الأنشطة باستخدام المرشحات
  const searchActivities = useCallback(() => {
    setIsLoading(true);
    
    try {
      // تطبيق المرشحات على البيانات الوهمية
      // في التطبيق الحقيقي، يمكن إرسال المرشحات إلى الخادم
      const filtered = mockUserActivities.filter(activity => {
        // مرشحات التاريخ
        if (filters.startDate && new Date(activity.timestamp) < filters.startDate) return false;
        if (filters.endDate && new Date(activity.timestamp) > filters.endDate) return false;
        
        // مرشح المستخدم
        if (filters.userId && activity.userId !== filters.userId) return false;
        
        // مرشح الإجراء
        if (filters.action && activity.action !== filters.action) return false;
        
        // مرشح الوحدة
        if (filters.module && activity.module !== filters.module) return false;
        
        // مرشح الحالة
        if (filters.status && activity.status !== filters.status) return false;
        
        // مرشح النص البحثي
        if (
          filters.searchText && 
          !activity.details.toLowerCase().includes(filters.searchText.toLowerCase()) &&
          !activity.username.toLowerCase().includes(filters.searchText.toLowerCase())
        ) return false;
        
        return true;
      });
      
      setActivities(filtered);
      toast.info(`تم العثور على ${filtered.length} سجل`);
    } catch (error) {
      console.error('خطأ أثناء البحث:', error);
      toast.error('حدث خطأ أثناء البحث');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // تصدير الأنشطة
  const exportActivities = useCallback(() => {
    setIsLoading(true);
    
    try {
      // منطق تصدير البيانات
      // يمكن تصديرها إلى ملف CSV أو Excel
      
      toast.success('تم تصدير سجل الأنشطة بنجاح');
    } catch (error) {
      console.error('خطأ أثناء تصدير البيانات:', error);
      toast.error('فشل في تصدير سجل الأنشطة');
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
