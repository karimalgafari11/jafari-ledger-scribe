
import React, { useState } from "react";
import { Customer } from "@/types/customers";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/utils/formatters";
import { toast } from "sonner";
import { CreditCard, FileClock, FileWarning, Phone, SendHorizontal } from "lucide-react";

interface CollectionActionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export const CollectionActionsDialog: React.FC<CollectionActionsDialogProps> = ({
  isOpen,
  onClose,
  customer
}) => {
  const [selectedTab, setSelectedTab] = useState("reminder");
  const [reminderSubject, setReminderSubject] = useState("تذكير بمستحقات مالية");
  const [reminderMessage, setReminderMessage] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");

  if (!customer) return null;

  const handleSendReminder = () => {
    toast.success(`تم إرسال التذكير إلى العميل ${customer.name}`);
    onClose();
  };

  const handleScheduleCall = () => {
    toast.success(`تم جدولة اتصال مع العميل ${customer.name}`);
    onClose();
  };

  const handleSchedulePayment = () => {
    toast.success(`تم جدولة خطة سداد للعميل ${customer.name}`);
    onClose();
  };

  const handleSendWarning = () => {
    toast.success(`تم إرسال إشعار رسمي للعميل ${customer.name}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">إجراءات تحصيل الديون</DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold">{customer.name}</h3>
              <p className="text-sm text-gray-500">{customer.accountNumber || "بدون رقم حساب"}</p>
            </div>
            <div className="text-left">
              <div className="text-xl font-bold text-red-600">{formatCurrency(customer.balance)}</div>
              <p className="text-sm text-gray-500">الرصيد المستحق</p>
            </div>
          </div>
          
          <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="reminder" className="gap-1">
                <SendHorizontal size={16} />
                <span className="hidden sm:inline">إرسال تذكير</span>
              </TabsTrigger>
              <TabsTrigger value="call" className="gap-1">
                <Phone size={16} />
                <span className="hidden sm:inline">جدولة اتصال</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="gap-1">
                <FileClock size={16} />
                <span className="hidden sm:inline">جدولة سداد</span>
              </TabsTrigger>
              <TabsTrigger value="warning" className="gap-1">
                <FileWarning size={16} />
                <span className="hidden sm:inline">إشعار رسمي</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="reminder">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject">عنوان التذكير</Label>
                  <Input 
                    id="subject" 
                    placeholder="عنوان التذكير" 
                    value={reminderSubject}
                    onChange={(e) => setReminderSubject(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="message">نص التذكير</Label>
                  <Textarea 
                    id="message" 
                    placeholder="اكتب نص التذكير هنا..." 
                    rows={5}
                    value={reminderMessage}
                    onChange={(e) => setReminderMessage(e.target.value)}
                  />
                </div>
                <DialogFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={onClose}>إلغاء</Button>
                  <Button onClick={handleSendReminder}>إرسال التذكير</Button>
                </DialogFooter>
              </div>
            </TabsContent>
            
            <TabsContent value="call">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">تاريخ ووقت الاتصال</Label>
                  <Input 
                    id="date" 
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="ملاحظات حول الاتصال..."
                    rows={4}
                  />
                </div>
                <DialogFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={onClose}>إلغاء</Button>
                  <Button onClick={handleScheduleCall}>جدولة الاتصال</Button>
                </DialogFooter>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="total-amount">المبلغ الإجمالي</Label>
                    <Input 
                      id="total-amount" 
                      type="number" 
                      defaultValue={customer.balance}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="installments">عدد الأقساط</Label>
                    <Input 
                      id="installments" 
                      type="number" 
                      min={1}
                      defaultValue={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="first-date">تاريخ أول قسط</Label>
                    <Input 
                      id="first-date" 
                      type="date" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="period">الفترة بين الأقساط (أيام)</Label>
                    <Input 
                      id="period" 
                      type="number" 
                      min={1}
                      defaultValue={30}
                    />
                  </div>
                </div>
                <DialogFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={onClose}>إلغاء</Button>
                  <Button onClick={handleSchedulePayment}>جدولة السداد</Button>
                </DialogFooter>
              </div>
            </TabsContent>
            
            <TabsContent value="warning">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="warning-type">نوع الإشعار</Label>
                  <select 
                    id="warning-type" 
                    className="w-full border rounded-md p-2"
                    defaultValue="reminder"
                  >
                    <option value="reminder">إشعار تذكير</option>
                    <option value="warning">إشعار تحذير</option>
                    <option value="final">إشعار نهائي</option>
                    <option value="legal">إشعار قانوني</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="details">تفاصيل الإشعار</Label>
                  <Textarea 
                    id="details" 
                    placeholder="تفاصيل الإشعار..."
                    rows={5}
                  />
                </div>
                <DialogFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={onClose}>إلغاء</Button>
                  <Button onClick={handleSendWarning} variant="destructive">إرسال الإشعار</Button>
                </DialogFooter>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
