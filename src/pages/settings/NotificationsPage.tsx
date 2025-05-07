
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Bell, Settings, Archive } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useNotificationFiltering } from '@/hooks/notifications/useNotificationFiltering';
import NotificationFilters from '@/components/notifications/NotificationFilters';
import NotificationStatsCards from '@/components/notifications/NotificationStatsCards';
import NotificationBulkActions from '@/components/notifications/NotificationBulkActions';
import NotificationsList from '@/components/notifications/NotificationsList';

const NotificationsPage = () => {
  const { 
    notifications, 
    markAllAsRead, 
    isLoading,
    deleteNotification
  } = useNotifications();
  
  const {
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
  } = useNotificationFiltering(notifications);
  
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  // Select/deselect notifications
  const toggleSelectNotification = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };
  
  const selectAllVisible = () => {
    setSelectedNotifications(filteredNotifications.map(n => n.id));
  };
  
  const deselectAll = () => {
    setSelectedNotifications([]);
  };
  
  // Bulk actions
  const handleBulkMarkAsRead = async () => {
    if (selectedNotifications.length === 0) return;
    
    let success = true;
    for (const id of selectedNotifications) {
      const result = await markAllAsRead();
      if (!result) success = false;
    }
    
    if (success) {
      toast.success(`تم تعيين ${selectedNotifications.length} إشعارات كمقروءة`);
      deselectAll();
    } else {
      toast.error('حدث خطأ أثناء تعيين بعض الإشعارات كمقروءة');
    }
  };
  
  const handleBulkDelete = async () => {
    if (selectedNotifications.length === 0) return;
    
    let success = true;
    for (const id of selectedNotifications) {
      const result = await deleteNotification(id);
      if (!result) success = false;
    }
    
    if (success) {
      toast.success(`تم حذف ${selectedNotifications.length} إشعارات`);
      deselectAll();
    } else {
      toast.error('حدث خطأ أثناء حذف بعض الإشعارات');
    }
  };

  // تعيين كل الإشعارات كمقروءة
  const handleMarkAllAsRead = async () => {
    const success = await markAllAsRead();
    if (success) {
      toast.success('تم تعيين جميع الإشعارات كمقروءة');
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto p-6 rtl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">إدارة الإشعارات</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href="/settings/notification-settings">
                <Settings className="h-4 w-4 ml-2" />
                الإعدادات
              </a>
            </Button>
            
            <Button 
              variant="default" 
              onClick={handleMarkAllAsRead} 
              disabled={stats.unreadCount === 0 || isLoading}
            >
              <Archive className="h-4 w-4 ml-2" />
              تعيين الكل كمقروء
            </Button>
          </div>
        </div>
        
        <NotificationStatsCards 
          total={stats.total} 
          unread={stats.unreadCount} 
          critical={stats.criticalCount} 
        />

        <NotificationFilters
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleClearFilters={handleClearFilters}
          notificationCategories={notificationCategories}
        />
        
        <Card className="overflow-hidden">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b">
              <TabsList>
                <TabsTrigger value="all" className="relative">
                  جميع الإشعارات 
                  <Badge className="mr-2 bg-muted text-foreground">{stats.total}</Badge>
                </TabsTrigger>
                <TabsTrigger value="unread" className="relative">
                  غير المقروءة 
                  <Badge className="mr-2 bg-amber-500">{stats.unreadCount}</Badge>
                </TabsTrigger>
                <TabsTrigger value="read" className="relative">
                  المقروءة 
                  <Badge className="mr-2 bg-muted text-foreground">{stats.readCount}</Badge>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <NotificationBulkActions 
              selectedCount={selectedNotifications.length}
              onDeselectAll={deselectAll}
              onMarkAsRead={handleBulkMarkAsRead}
              onDelete={handleBulkDelete}
              isLoading={isLoading}
            />
            
            <TabsContent value="all" className="m-0">
              <NotificationsList 
                notifications={filteredNotifications} 
                selectedIds={selectedNotifications}
                onToggleSelect={toggleSelectNotification}
              />
            </TabsContent>
            
            <TabsContent value="unread" className="m-0">
              <NotificationsList 
                notifications={filteredNotifications} 
                selectedIds={selectedNotifications}
                onToggleSelect={toggleSelectNotification}
              />
            </TabsContent>
            
            <TabsContent value="read" className="m-0">
              <NotificationsList 
                notifications={filteredNotifications} 
                selectedIds={selectedNotifications}
                onToggleSelect={toggleSelectNotification}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default NotificationsPage;
