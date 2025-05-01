
import { useState, useEffect } from 'react';
import { UserActivity, ActivityAction } from '@/types/permissions';
import { mockUserActivities } from '@/data/mockPermissions';
import { useNotifications } from '@/hooks/useNotifications';
import { toast } from 'sonner';

export type UserActivityFilters = {
  userId: string;
  action: ActivityAction | '';
  module: string;
  startDate: Date | null;
  endDate: Date | null;
  status: 'success' | 'failed' | 'warning' | 'info' | '';
};

export function useUserActivity() {
  const [activities, setActivities] = useState<UserActivity[]>(mockUserActivities);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<UserActivityFilters>({
    userId: '',
    action: '' as ActivityAction | '',
    module: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    status: '' as 'success' | 'failed' | 'warning' | 'info' | '',
  });
  
  // استخدام نظام الإشعارات للأنشطة المهمة
  const { sendNotification } = useNotifications();
  
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
      
      // إرسال إشعار للأنشطة المهمة (الفاشلة أو التحذيرات)
      if (activity.status === 'failed' || activity.status === 'warning') {
        const priority = activity.status === 'failed' ? 'high' : 'medium';
        
        await sendNotification(
          'user1', // المستخدم الحالي
          'system.suspicious_activity', 
          priority,
          {
            title: `نشاط ${activity.status === 'failed' ? 'فاشل' : 'مشبوه'}: ${activity.action}`,
            message: activity.details,
            entityId: newActivity.id,
            entityType: 'activity',
          }
        );
      }
      
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
  
  // تحليل الأنشطة للكشف عن أنماط مشبوهة
  const analyzeActivities = (): { suspiciousActivities: UserActivity[], patterns: string[] } => {
    // هنا يمكن إضافة خوارزميات تحليلية متقدمة للكشف عن أنماط مشبوهة
    // مثل عمليات تسجيل الدخول المتكررة الفاشلة، أو الوصول غير المعتاد، الخ
    
    // مثال بسيط: البحث عن عمليات فاشلة متتالية
    const failedActivities = activities.filter(a => a.status === 'failed');
    const suspiciousPatterns: string[] = [];
    
    // فحص عمليات تسجيل الدخول الفاشلة
    const failedLogins = failedActivities.filter(a => a.action === 'login');
    if (failedLogins.length >= 3) {
      suspiciousPatterns.push(`تم اكتشاف ${failedLogins.length} محاولات تسجيل دخول فاشلة`);
    }
    
    // فحص عمليات الوصول غير المصرح بها
    const unauthorizedAccess = failedActivities.filter(a => 
      a.details.includes('غير مصرح') || a.details.includes('unauthorized')
    );
    
    if (unauthorizedAccess.length > 0) {
      suspiciousPatterns.push(`تم اكتشاف ${unauthorizedAccess.length} محاولات وصول غير مصرح بها`);
    }
    
    return {
      suspiciousActivities: [...failedLogins, ...unauthorizedAccess],
      patterns: suspiciousPatterns
    };
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
  const updateFilter = <K extends keyof UserActivityFilters>(
    key: K,
    value: UserActivityFilters[K]
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
    analyzeActivities,
  };
}
