
import { useState, useMemo } from 'react';
import { Notification } from '@/types/notifications';

export function useNotificationFiltering(notifications: Notification[]) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Define notification categories
  const notificationCategories = [
    { id: 'inventory', label: 'المخزون' },
    { id: 'invoices', label: 'الفواتير' },
    { id: 'expenses', label: 'المصروفات' },
    { id: 'customers', label: 'العملاء' },
    { id: 'system', label: 'النظام' },
  ];

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      // Filter by tab
      if (activeTab === 'unread' && notification.read) return false;
      if (activeTab === 'read' && !notification.read) return false;
      
      // Filter by priority
      if (priorityFilter !== 'all' && notification.priority !== priorityFilter) return false;
      
      // Filter by category 
      if (categoryFilter !== 'all') {
        const notificationCategory = notification.eventType.split('.')[0];
        if (notificationCategory !== categoryFilter) return false;
      }
      
      // Filter by time
      if (timeFilter !== 'all') {
        const now = new Date();
        const notifDate = new Date(notification.createdAt);
        const diffTime = Math.abs(now.getTime() - notifDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (timeFilter === 'today' && diffDays > 1) return false;
        if (timeFilter === 'week' && diffDays > 7) return false;
        if (timeFilter === 'month' && diffDays > 30) return false;
      }
      
      // Filter by search query
      if (searchQuery && 
        !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !notification.message.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [notifications, activeTab, priorityFilter, categoryFilter, timeFilter, searchQuery]);

  // Get stats
  const stats = useMemo(() => {
    const unreadCount = notifications.filter(n => !n.read).length;
    const criticalCount = notifications.filter(n => n.priority === 'critical' || n.priority === 'high').length;
    
    return {
      total: notifications.length,
      unreadCount,
      readCount: notifications.length - unreadCount,
      criticalCount
    };
  }, [notifications]);
  
  // Clear all filters
  const handleClearFilters = () => {
    setPriorityFilter('all');
    setTimeFilter('all');
    setCategoryFilter('all');
    setSearchQuery('');
  };

  return {
    activeTab,
    setActiveTab,
    priorityFilter,
    setPriorityFilter,
    searchQuery,
    setSearchQuery,
    timeFilter,
    setTimeFilter,
    categoryFilter,
    setCategoryFilter,
    notificationCategories,
    filteredNotifications,
    stats,
    handleClearFilters
  };
}
