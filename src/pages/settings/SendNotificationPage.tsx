
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNotifications } from "@/hooks/useNotifications";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SendNotificationPage = () => {
  const navigate = useNavigate();
  const { sendNotification } = useNotifications();
  
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState<string[]>([]);
  const [priority, setPriority] = useState<string>("medium");
  const [recipientInput, setRecipientInput] = useState("");
  
  const handleAddRecipient = () => {
    if (recipientInput && !recipients.includes(recipientInput)) {
      setRecipients([...recipients, recipientInput]);
      setRecipientInput("");
    }
  };
  
  const handleRemoveRecipient = (recipient: string) => {
    setRecipients(recipients.filter(r => r !== recipient));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !message || recipients.length === 0) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }
    
    const success = sendNotification(title, message, recipients, priority);
    
    if (success) {
      navigate("/settings/notifications");
    }
  };
  
  return (
    <PageContainer title="إرسال إشعار" showBack={true}>
      <div className="container max-w-2xl p-6 mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">إرسال إشعار جديد</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium block">عنوان الإشعار</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="أدخل عنوان الإشعار"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium block">محتوى الإشعار</label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="أدخل محتوى الإشعار"
                rows={5}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium block">مستوى الأولوية</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر مستوى الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">منخفض</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="high">عالي</SelectItem>
                  <SelectItem value="critical">حرج</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium block">المستلمون</label>
              <div className="flex gap-2">
                <Input
                  value={recipientInput}
                  onChange={(e) => setRecipientInput(e.target.value)}
                  placeholder="أدخل معرف المستخدم أو البريد الإلكتروني"
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddRecipient}>إضافة</Button>
              </div>
              
              {recipients.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {recipients.map(recipient => (
                    <div key={recipient} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-2">
                      <span className="text-sm">{recipient}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRecipient(recipient)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {recipients.length === 0 && (
                <p className="text-sm text-muted-foreground">لم يتم إضافة أي مستلمين بعد</p>
              )}
            </div>
            
            <div className="flex justify-end pt-4">
              <Button type="submit">إرسال الإشعار</Button>
            </div>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
};

export default SendNotificationPage;
