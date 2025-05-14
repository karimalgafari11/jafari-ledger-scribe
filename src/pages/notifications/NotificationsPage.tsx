
import React, { useState, useEffect, useMemo } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationFilters from '@/components/notifications/NotificationFilters';
import NotificationStatsCards from '@/components/notifications/NotificationStatsCards';
import NotificationsList from '@/components/notifications/NotificationsList';
import NotificationBulkActions from '@/components/notifications/NotificationBulkActions';
import { Button } from '@/components/ui/button';
import { Bell, Loader2, MessageSquarePlus, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Notification } from '@/types/notifications';

const NotificationsPage = () => {
  const { notifications, isLoading } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  // Clear selection when filters change
  useEffect(() => {
    setSelectedIds([]);
  }, [searchQuery, priorityFilter, categoryFilter, readFilter]);
  
  // Handle manual refresh
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh (in a real app, this would call a function to fetch new data)
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  // Handle toggle select for notifications
  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setPriorityFilter('all');
    setCategoryFilter('all');
    setReadFilter('all');
  };
  
  // Filter notifications based on all criteria
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification: Notification) => {
      // Search query filter
      const matchesSearch = searchQuery
        ? notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notification.message.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      // Priority filter
      const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter;
      
      // Category filter
      const matchesCategory = categoryFilter === 'all' || notification.eventType.startsWith(categoryFilter);
      
      // Read status filter
      const matchesReadStatus = 
        readFilter === 'all' ||
        (readFilter === 'read' && notification.read) ||
        (readFilter === 'unread' && !notification.read);
      
      return matchesSearch && matchesPriority && matchesCategory && matchesReadStatus;
    });
  }, [notifications, searchQuery, priorityFilter, categoryFilter, readFilter]);
  
  return (
    <PageContainer title="الإشعارات" showBack={true}>
      <div className="p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <Bell className="ml-2 h-5 w-5" />
            <h1 className="text-2xl font-bold">إدارة الإشعارات</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing || isLoading}
            >
              {refreshing || isLoading ? (
                <Loader2 className="h-4 w-4 ml-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 ml-2" />
              )}
              تحديث
            </Button>
            
            <Button size="sm" asChild>
              <Link to="/settings/notifications">
                <Bell className="h-4 w-4 ml-2" />
                إعدادات الإشعارات
              </Link>
            </Button>
            
            <Button size="sm" asChild>
              <Link to="/settings/send-notification">
                <MessageSquarePlus className="h-4 w-4 ml-2" />
                إرسال إشعار
              </Link>
            </Button>
          </div>
        </div>
        
        <NotificationStatsCards notifications={notifications} />
        
        <div className="space-y-4">
          <NotificationFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            readFilter={readFilter}
            setReadFilter={setReadFilter}
            onClearFilters={handleClearFilters}
          />
          
          <NotificationBulkActions 
            selectedIds={selectedIds} 
            onSelectionClear={() => setSelectedIds([])} 
          />
          
          {isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
              <p className="mt-2 text-muted-foreground">جاري تحميل الإشعارات...</p>
            </div>
          ) : (
            <NotificationsList 
              notifications={filteredNotifications} 
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default NotificationsPage;
