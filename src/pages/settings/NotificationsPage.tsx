
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Settings, Archive, Filter, CheckCheck, Clock, Calendar, X, Search } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import NotificationItem from '@/components/notifications/NotificationItem';
import { NotificationPriority } from '@/types/notifications';
import { toast } from 'sonner';

const NotificationsPage = () => {
  const { 
    notifications, 
    markAllAsRead, 
    isLoading,
    deleteNotification
  } = useNotifications();
  
  const [activeTab, setActiveTab] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // نظام تصنيفات الإشعارات
  const notificationCategories = [
    { id: 'inventory', label: 'المخزون' },
    { id: 'invoices', label: 'الفواتير' },
    { id: 'expenses', label: 'المصروفات' },
    { id: 'customers', label: 'العملاء' },
    { id: 'system', label: 'النظام' },
  ];

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
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
  
  // Get stats
  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical' || n.priority === 'high').length;
  
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
  
  // تصفية الإشعارات
  const handleClearFilters = () => {
    setPriorityFilter('all');
    setTimeFilter('all');
    setCategoryFilter('all');
    setSearchQuery('');
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
              disabled={unreadCount === 0 || isLoading}
            >
              <Archive className="h-4 w-4 ml-2" />
              تعيين الكل كمقروء
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">إجمالي الإشعارات</p>
              <p className="text-2xl font-bold mt-1">{notifications.length}</p>
            </div>
            <Bell className="h-8 w-8 text-blue-500 opacity-80" />
          </Card>
          
          <Card className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">الإشعارات غير المقروءة</p>
              <p className="text-2xl font-bold mt-1">{unreadCount}</p>
            </div>
            <Bell className="h-8 w-8 text-amber-500 opacity-80" />
          </Card>
          
          <Card className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">الإشعارات الهامة</p>
              <p className="text-2xl font-bold mt-1">{criticalCount}</p>
            </div>
            <Bell className="h-8 w-8 text-red-500 opacity-80" />
          </Card>
        </div>

        {/* نظام التصفية المتقدم */}
        <Card className="mb-6 overflow-hidden">
          <CardHeader className="bg-muted/50 pb-2">
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 ml-2" />
              خيارات التصفية المتقدمة
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">الوقت</label>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="جميع الأوقات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأوقات</SelectItem>
                    <SelectItem value="today">اليوم</SelectItem>
                    <SelectItem value="week">هذا الأسبوع</SelectItem>
                    <SelectItem value="month">هذا الشهر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">الفئة</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="جميع الفئات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    {notificationCategories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">الأولوية</label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="جميع الأولويات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأولويات</SelectItem>
                    <SelectItem value="critical">حرجة</SelectItem>
                    <SelectItem value="high">عالية</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="low">منخفضة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">بحث</label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="بحث في الإشعارات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={handleClearFilters} size="sm">
                <X className="h-4 w-4 ml-1" />
                مسح التصفية
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b">
              <TabsList>
                <TabsTrigger value="all" className="relative">
                  جميع الإشعارات 
                  <Badge className="mr-2 bg-muted text-foreground">{notifications.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="unread" className="relative">
                  غير المقروءة 
                  <Badge className="mr-2 bg-amber-500">{unreadCount}</Badge>
                </TabsTrigger>
                <TabsTrigger value="read" className="relative">
                  المقروءة 
                  <Badge className="mr-2 bg-muted text-foreground">{notifications.length - unreadCount}</Badge>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* خيارات العمليات الجماعية */}
            {selectedNotifications.length > 0 && (
              <div className="flex items-center justify-between bg-muted/30 p-3 border-b">
                <div className="flex items-center">
                  <CheckCheck className="h-4 w-4 ml-2 text-muted-foreground" />
                  <span>تم تحديد {selectedNotifications.length} إشعارات</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={deselectAll}
                  >
                    إلغاء التحديد
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleBulkMarkAsRead}
                    disabled={isLoading}
                  >
                    تعيين كمقروءة
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={handleBulkDelete}
                    disabled={isLoading}
                  >
                    حذف المحدد
                  </Button>
                </div>
              </div>
            )}
            
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

// Sub-component for rendering notifications list
interface NotificationsListProps {
  notifications: any[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}

const NotificationsList = ({ notifications, selectedIds, onToggleSelect }: NotificationsListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        لا توجد إشعارات لعرضها
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-[600px]">
      <div>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <div className="flex items-start p-0">
              <div className="p-4 flex items-start">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(notification.id)}
                  onChange={() => onToggleSelect(notification.id)}
                  className="ml-3 mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <NotificationItem 
                  notification={notification} 
                  showActions={true} 
                />
              </div>
            </div>
            {index < notifications.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
};

export default NotificationsPage;
