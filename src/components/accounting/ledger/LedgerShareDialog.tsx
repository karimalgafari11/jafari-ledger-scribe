
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WhatsApp, Mail, Copy, Share2 } from "lucide-react";
import { Transaction } from "@/types/transactions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface LedgerShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Transaction[];
  accountName?: string;
}

export const LedgerShareDialog: React.FC<LedgerShareDialogProps> = ({
  open,
  onOpenChange,
  data,
  accountName
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(`تفاصيل حساب ${accountName || "الحساب"} - ${new Date().toLocaleDateString('ar-SA')}`);
  
  const handleShareWhatsApp = () => {
    // In a real app, this would use WhatsApp API
    toast.success(`تم إعداد المشاركة عبر واتساب إلى الرقم ${phoneNumber}`);
    onOpenChange(false);
  };
  
  const handleShareEmail = () => {
    // In a real app, this would send an email
    toast.success(`تم إعداد المشاركة عبر البريد الإلكتروني إلى ${email}`);
    onOpenChange(false);
  };
  
  const handleCopyLink = () => {
    // In a real app, this would copy a link to clipboard
    toast.success("تم نسخ رابط المشاركة");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>مشاركة البيانات</DialogTitle>
          <DialogDescription>
            مشاركة {data.length} عملية {accountName ? `لحساب ${accountName}` : ''}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Tabs defaultValue="whatsapp">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="whatsapp" className="flex items-center gap-1">
                <WhatsApp className="h-4 w-4" />
                واتساب
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                بريد
              </TabsTrigger>
              <TabsTrigger value="link" className="flex items-center gap-1">
                <Copy className="h-4 w-4" />
                رابط
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="whatsapp" className="space-y-4 mt-3">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input 
                  id="phone" 
                  placeholder="966XXXXXXXXX" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp-msg">الرسالة</Label>
                <Input 
                  id="whatsapp-msg" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={handleShareWhatsApp}
              >
                <WhatsApp className="ml-2 h-4 w-4" />
                مشاركة عبر واتساب
              </Button>
            </TabsContent>
            
            <TabsContent value="email" className="space-y-4 mt-3">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  placeholder="example@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-subject">الموضوع</Label>
                <Input 
                  id="email-subject" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <Button 
                className="w-full"
                onClick={handleShareEmail}
              >
                <Mail className="ml-2 h-4 w-4" />
                إرسال عبر البريد الإلكتروني
              </Button>
            </TabsContent>
            
            <TabsContent value="link" className="space-y-4 mt-3">
              <div className="space-y-2">
                <Label htmlFor="link">رابط المشاركة</Label>
                <div className="flex">
                  <Input 
                    id="link" 
                    readOnly
                    value="https://example.com/shared/ledger/xyz123"
                  />
                  <Button 
                    className="mr-2"
                    variant="outline"
                    onClick={handleCopyLink}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>صلاحية الرابط</Label>
                <Select defaultValue="1d">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر صلاحية الرابط" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">ساعة واحدة</SelectItem>
                    <SelectItem value="1d">يوم واحد</SelectItem>
                    <SelectItem value="7d">أسبوع</SelectItem>
                    <SelectItem value="30d">شهر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full"
                onClick={handleCopyLink}
              >
                <Share2 className="ml-2 h-4 w-4" />
                نسخ الرابط
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
