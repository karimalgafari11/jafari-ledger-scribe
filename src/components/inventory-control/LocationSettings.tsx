
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface LocationSettingsProps {
  onClose: () => void;
}

export function LocationSettings({ onClose }: LocationSettingsProps) {
  const [open, setOpen] = React.useState(true);
  const [settings, setSettings] = React.useState({
    showInactiveLocations: true,
    defaultWarehouse: "all",
    sortOrder: "name",
    autoAssignCodes: true,
    showCapacityWarnings: true,
    capacityWarningThreshold: 90
  });
  
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSwitchChange = (field: string) => (checked: boolean) => {
    setSettings(prev => ({ ...prev, [field]: checked }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNumberChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setSettings(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveSettings = () => {
    toast.success("تم حفظ الإعدادات بنجاح");
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>إعدادات مواقع التخزين</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">إعدادات عامة</TabsTrigger>
            <TabsTrigger value="display">خيارات العرض</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoAssignCodes">إنشاء رموز تلقائية للمواقع</Label>
                <Switch
                  id="autoAssignCodes"
                  checked={settings.autoAssignCodes}
                  onCheckedChange={handleSwitchChange("autoAssignCodes")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="showCapacityWarnings">تنبيهات السعة</Label>
                <Switch
                  id="showCapacityWarnings"
                  checked={settings.showCapacityWarnings}
                  onCheckedChange={handleSwitchChange("showCapacityWarnings")}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacityWarning" className="text-right">حد التنبيه (%)</Label>
                <div className="col-span-3">
                  <input
                    id="capacityWarning"
                    type="range"
                    min={50}
                    max={100}
                    value={settings.capacityWarningThreshold}
                    onChange={handleNumberChange("capacityWarningThreshold")}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>50%</span>
                    <span>{settings.capacityWarningThreshold}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="display" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="showInactiveLocations">عرض المواقع غير النشطة</Label>
                <Switch
                  id="showInactiveLocations"
                  checked={settings.showInactiveLocations}
                  onCheckedChange={handleSwitchChange("showInactiveLocations")}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sortOrder" className="text-right">ترتيب حسب</Label>
                <Select 
                  value={settings.sortOrder}
                  onValueChange={handleSelectChange("sortOrder")}
                >
                  <SelectTrigger id="sortOrder" className="col-span-3">
                    <SelectValue placeholder="اختر طريقة الترتيب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">الاسم</SelectItem>
                    <SelectItem value="code">الرمز</SelectItem>
                    <SelectItem value="warehouse">المستودع</SelectItem>
                    <SelectItem value="capacity">السعة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="defaultWarehouse" className="text-right">المستودع الافتراضي</Label>
                <Select 
                  value={settings.defaultWarehouse}
                  onValueChange={handleSelectChange("defaultWarehouse")}
                >
                  <SelectTrigger id="defaultWarehouse" className="col-span-3">
                    <SelectValue placeholder="اختر المستودع الافتراضي" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المستودعات</SelectItem>
                    <SelectItem value="main">المستودع الرئيسي</SelectItem>
                    <SelectItem value="branch1">فرع 1</SelectItem>
                    <SelectItem value="branch2">فرع 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            إلغاء
          </Button>
          <Button type="button" onClick={handleSaveSettings}>
            حفظ الإعدادات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
