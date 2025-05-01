
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Settings, Archive, Filter } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import NotificationItem from '@/components/notifications/NotificationItem';
import { NotificationPriority } from '@/types/notifications';

const NotificationsPage = () => {
  const { notifications, markAllAsRead, isLoading } = useNotifications();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    // Filter by tab
    if (activeTab === 'unread' && notification.read) return false;
    if (activeTab === 'read' && !notification.read) return false;
    
    // Filter by priority
    if (priorityFilter !== 'all' && notification.priority !== priorityFilter) return false;
    
    // Filter by search query
    if (searchQuery && !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
       !notification.message.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Get stats
  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical' || n.priority === 'high').length;
  
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
              onClick={() => markAllAsRead()} 
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
        
        <Card className="overflow-hidden">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b">
              <TabsList>
                <TabsTrigger value="all">
                  جميع الإشعارات ({notifications.length})
                </TabsTrigger>
                <TabsTrigger value="unread">
                  غير المقروءة ({unreadCount})
                </TabsTrigger>
                <TabsTrigger value="read">
                  المقروءة ({notifications.length - unreadCount})
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 ml-2 text-muted-foreground" />
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="الأولوية" />
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
                
                <Input
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[200px]"
                />
              </div>
            </div>
            
            <TabsContent value="all" className="m-0">
              <NotificationsList notifications={filteredNotifications} />
            </TabsContent>
            
            <TabsContent value="unread" className="m-0">
              <NotificationsList notifications={filteredNotifications} />
            </TabsContent>
            
            <TabsContent value="read" className="m-0">
              <NotificationsList notifications={filteredNotifications} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

// Sub-component for rendering notifications list
const NotificationsList = ({ notifications }: { notifications: any[] }) => {
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
            <div className="p-0">
              <NotificationItem 
                notification={notification} 
                showActions={true} 
              />
            </div>
            {index < notifications.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
};

export default NotificationsPage;
