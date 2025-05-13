
import React, { useState } from "react";
import { useAccountingSettings } from "@/hooks/useAccountingSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  PlusCircle, 
  Save, 
  Check, 
  X, 
  Trash2, 
  Edit, 
  AlarmClock
} from "lucide-react";
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { ClosingMethod } from "@/types/accountingSettings";

export const ClosingMethodsSettings = () => {
  const { settings, isLoading, toggleClosingMethod, addClosingMethod } = useAccountingSettings();
  const [newMethod, setNewMethod] = useState<Omit<ClosingMethod, "id">>({
    name: "",
    description: "",
    isActive: false
  });

  const handleAddMethod = () => {
    addClosingMethod(newMethod);
    setNewMethod({
      name: "",
      description: "",
      isActive: false
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">طرق إقفال الحسابات</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="ml-2 h-4 w-4" />
              إضافة طريقة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة طريقة إقفال جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="methodName">اسم الطريقة</Label>
                <Input
                  id="methodName"
                  value={newMethod.name}
                  onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                  placeholder="مثال: إقفال شهري"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="methodDescription">وصف الطريقة</Label>
                <Textarea
                  id="methodDescription"
                  value={newMethod.description}
                  onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
                  placeholder="وصف مختصر لطريقة الإقفال"
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="methodActive"
                  checked={newMethod.isActive}
                  onCheckedChange={(checked) => setNewMethod({ ...newMethod, isActive: checked })}
                />
                <Label htmlFor="methodActive">تفعيل الطريقة</Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">إلغاء</Button>
              </DialogClose>
              <Button 
                onClick={handleAddMethod} 
                disabled={!newMethod.name || isLoading}
              >
                <Save className="ml-2 h-4 w-4" />
                حفظ الطريقة
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settings.closingMethods.map((method) => (
          <Card key={method.id} className="overflow-hidden">
            <div className={`h-2 ${method.isActive ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{method.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{method.description}</p>
                </div>
                <Badge variant={method.isActive ? "default" : "outline"}>
                  {method.isActive ? "مفعّلة" : "معطلة"}
                </Badge>
              </div>
              <div className="flex justify-end mt-4 space-x-2 space-x-reverse">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => toggleClosingMethod(method.id)}
                  disabled={isLoading}
                >
                  {method.isActive ? (
                    <>
                      <X className="ml-2 h-4 w-4" />
                      تعطيل
                    </>
                  ) : (
                    <>
                      <Check className="ml-2 h-4 w-4" />
                      تفعيل
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" className="text-blue-500">
                  <Edit className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlarmClock className="ml-2 h-5 w-5 text-amber-500" />
            إعدادات جدولة الإقفال
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>جدولة الإقفال الشهري</Label>
            <p className="text-sm text-gray-500">قم بتحديد تاريخ محدد لإجراء الإقفال الشهري بشكل تلقائي</p>
            <div className="flex items-center">
              <span className="mr-2">يوم</span>
              <select className="border border-gray-300 rounded p-2 w-20 text-center">
                {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
                <option value="last">الأخير</option>
              </select>
              <span className="mx-2">من كل شهر</span>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <Label>إشعارات قبل الإقفال</Label>
            <p className="text-sm text-gray-500">إرسال إشعارات قبل موعد الإقفال</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch id="notify3days" />
                <Label htmlFor="notify3days">قبل الإقفال بـ 3 أيام</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch id="notify1day" />
                <Label htmlFor="notify1day">قبل الإقفال بيوم واحد</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch id="notifyAfter" />
                <Label htmlFor="notifyAfter">بعد اكتمال الإقفال</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
