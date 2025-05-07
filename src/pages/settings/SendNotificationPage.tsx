
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, UserCheck, Send } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationEvent, NotificationPriority } from '@/types/notifications';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

const SendNotificationPage = () => {
  const { sendNotification, isLoading } = useNotifications();
  
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<NotificationPriority>('medium');
  const [eventType, setEventType] = useState<NotificationEvent>('system.login_failed');
  const [targetUserId, setTargetUserId] = useState('user1'); // في البيئة الحقيقية ستأتي من النظام
  
  const notificationEvents: { id: NotificationEvent; name: string }[] = [
    { id: 'inventory.low_stock', name: 'مخزون منخفض' },
    { id: 'inventory.out_of_stock', name: 'نفاد المخزون' },
    { id: 'expenses.pending_approval', name: 'مصروف ينتظر الموافقة' },
    { id: 'expenses.approved', name: 'تمت الموافقة على المصروف' },
    { id: 'expenses.rejected', name: 'تم رفض المصروف' },
    { id: 'invoices.created', name: 'تم إنشاء فاتورة جديدة' },
    { id: 'invoices.paid', name: 'تم دفع فاتورة' },
    { id: 'invoices.overdue', name: 'فاتورة متأخرة' },
    { id: 'customer.payment_received', name: 'تم استلام دفعة من العميل' },
    { id: 'customer.credit_limit_reached', name: 'تم الوصول للحد الائتماني' },
    { id: 'system.backup_complete', name: 'اكتمال النسخ الاحتياطي' },
    { id: 'system.backup_failed', name: 'فشل النسخ الاحتياطي' },
    { id: 'system.login_failed', name: 'فشل تسجيل الدخول' },
    { id: 'system.suspicious_activity', name: 'نشاط مشبوه' },
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !message) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    try {
      const success = await sendNotification(
        targetUserId,
        eventType,
        priority,
        {
          title,
          message,
          entityId: 'demo-entity-123',
          entityType: eventType.split('.')[0],
        },
        ['in-app', 'email']
      );
      
      if (success) {
        toast.success('تم إرسال الإشعار بنجاح');
        setTitle('');
        setMessage('');
        setPriority('medium');
      } else {
        toast.error('حدث خطأ أثناء إرسال الإشعار');
      }
    } catch (error) {
      toast.error('حدث خطأ غير متوقع');
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto p-6 rtl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">إرسال إشعار جديد</h1>
          
          <Button variant="outline" asChild>
            <a href="/notifications">
              <Bell className="h-4 w-4 ml-2" />
              عودة للإشعارات
            </a>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">معلومات الإشعار</CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="title">عنوان الإشعار</Label>
                    <Input
                      id="title"
                      placeholder="أدخل عنوان الإشعار"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="message">محتوى الإشعار</Label>
                    <Textarea
                      id="message"
                      placeholder="أدخل محتوى الإشعار"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="event-type">نوع الحدث</Label>
                      <Select 
                        value={eventType} 
                        onValueChange={(value) => setEventType(value as NotificationEvent)}
                      >
                        <SelectTrigger id="event-type">
                          <SelectValue placeholder="اختر نوع الحدث" />
                        </SelectTrigger>
                        <SelectContent>
                          {notificationEvents.map((event) => (
                            <SelectItem key={event.id} value={event.id}>
                              {event.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="priority">أولوية الإشعار</Label>
                      <Select 
                        value={priority} 
                        onValueChange={(value) => setPriority(value as NotificationPriority)}
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="حدد أولوية الإشعار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">منخفضة</SelectItem>
                          <SelectItem value="medium">متوسطة</SelectItem>
                          <SelectItem value="high">عالية</SelectItem>
                          <SelectItem value="critical">حرجة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-end">
                  <Button type="submit" disabled={isLoading} className="flex gap-2">
                    <Send className="h-4 w-4" />
                    إرسال الإشعار
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">المستلمون</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4 p-3 border rounded-lg">
                  <UserCheck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">المستخدم الحالي</p>
                    <p className="text-sm text-muted-foreground">الإشعارات للمستخدم الحالي فقط</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-4">
                  ملاحظة: في النظام الكامل، يمكنك اختيار مستخدمين محددين أو مجموعات أو إرسال الإشعار لجميع المستخدمين.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">معلومات عن الإشعارات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">الأولويات</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li><span className="text-red-500 font-medium">حرجة</span>: إشعارات تتطلب اهتمامًا فوريًا</li>
                    <li><span className="text-amber-500 font-medium">عالية</span>: إشعارات مهمة للغاية</li>
                    <li><span className="text-blue-500 font-medium">متوسطة</span>: إشعارات ذات أهمية متوسطة</li>
                    <li><span className="text-green-500 font-medium">منخفضة</span>: إشعارات معلوماتية</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">أنواع الإشعارات</h3>
                  <p className="text-sm text-muted-foreground">
                    تُصنّف الإشعارات حسب القسم والحدث، مثل إشعارات المخزون، الفواتير، المصروفات، إلخ.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SendNotificationPage;
