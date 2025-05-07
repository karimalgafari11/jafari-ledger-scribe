
import React, { useState } from "react";
import { Settings, FileText, Receipt, FileDown, FileUp, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// تعريف نوع العنصر المخصص
interface ShortcutItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  route: string;
  enabled: boolean;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "outline" | "destructive" | "success";
  };
  description?: string;
}

// تعريف نوع خيارات العرض
interface DisplayOptions {
  showStats: boolean;
  showKpis: boolean;
  showCharts: boolean;
  showAiWidget: boolean;
}

export const DashboardSettings: React.FC<{
  displayOptions: DisplayOptions;
  onDisplayOptionsChange: (options: DisplayOptions) => void;
  shortcuts: ShortcutItem[];
  onShortcutsChange: (shortcuts: ShortcutItem[]) => void;
}> = ({ 
  displayOptions, 
  onDisplayOptionsChange,
  shortcuts,
  onShortcutsChange
}) => {
  const isMobile = useIsMobile();
  
  const [newShortcut, setNewShortcut] = useState({
    name: "",
    route: ""
  });
  
  const handleDisplayOptionChange = (key: keyof DisplayOptions) => {
    onDisplayOptionsChange({
      ...displayOptions,
      [key]: !displayOptions[key]
    });
  };
  
  const handleShortcutToggle = (id: string) => {
    onShortcutsChange(
      shortcuts.map(shortcut => 
        shortcut.id === id ? { ...shortcut, enabled: !shortcut.enabled } : shortcut
      )
    );
  };
  
  const handleAddShortcut = () => {
    if (!newShortcut.name || !newShortcut.route) {
      toast.error("الرجاء إدخال الاسم والمسار للاختصار");
      return;
    }
    
    const id = `custom-${Date.now()}`;
    onShortcutsChange([
      ...shortcuts,
      {
        id,
        name: newShortcut.name,
        icon: <FileText size={20} />,
        route: newShortcut.route,
        enabled: true
      }
    ]);
    
    setNewShortcut({ name: "", route: "" });
    toast.success("تم إضافة الاختصار بنجاح");
  };
  
  const handleDeleteShortcut = (id: string) => {
    onShortcutsChange(shortcuts.filter(shortcut => shortcut.id !== id));
    toast.success("تم حذف الاختصار بنجاح");
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(shortcuts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onShortcutsChange(items);
  };
  
  const SettingsContent = () => (
    <Tabs defaultValue="display" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="display">خيارات العرض</TabsTrigger>
        <TabsTrigger value="shortcuts">الاختصارات</TabsTrigger>
      </TabsList>
      
      <TabsContent value="display" className="space-y-4 mt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-stats" className="flex flex-col">
              <span>بطاقات الإحصائيات</span>
              <span className="text-sm text-muted-foreground">إظهار بطاقات المبيعات والمصاريف والأرباح</span>
            </Label>
            <Switch
              id="show-stats"
              checked={displayOptions.showStats}
              onCheckedChange={() => handleDisplayOptionChange("showStats")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="show-kpis" className="flex flex-col">
              <span>مؤشرات الأداء</span>
              <span className="text-sm text-muted-foreground">إظهار مؤشرات الأداء الرئيسية</span>
            </Label>
            <Switch
              id="show-kpis"
              checked={displayOptions.showKpis}
              onCheckedChange={() => handleDisplayOptionChange("showKpis")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="show-charts" className="flex flex-col">
              <span>الرسومات البيانية</span>
              <span className="text-sm text-muted-foreground">إظهار الرسومات والمخططات البيانية</span>
            </Label>
            <Switch
              id="show-charts"
              checked={displayOptions.showCharts}
              onCheckedChange={() => handleDisplayOptionChange("showCharts")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="show-ai-widget" className="flex flex-col">
              <span>مساعد الذكاء الاصطناعي</span>
              <span className="text-sm text-muted-foreground">إظهار اقتراحات وتحليلات الذكاء الاصطناعي</span>
            </Label>
            <Switch
              id="show-ai-widget"
              checked={displayOptions.showAiWidget}
              onCheckedChange={() => handleDisplayOptionChange("showAiWidget")}
            />
          </div>
        </div>
        
        <Alert>
          <AlertDescription>
            يمكنك تخصيص لوحة التحكم من خلال إظهار أو إخفاء العناصر حسب احتياجاتك
          </AlertDescription>
        </Alert>
      </TabsContent>
      
      <TabsContent value="shortcuts" className="space-y-4 mt-4">
        <div className="space-y-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="shortcuts">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {shortcuts.map((shortcut, index) => (
                    <Draggable 
                      key={shortcut.id} 
                      draggableId={shortcut.id} 
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-2 border rounded-md bg-background"
                        >
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-muted rounded-md">
                              {shortcut.icon}
                            </div>
                            <div>
                              <p className="font-medium">{shortcut.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {shortcut.description || shortcut.route}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              id={`toggle-${shortcut.id}`}
                              checked={shortcut.enabled}
                              onCheckedChange={() => handleShortcutToggle(shortcut.id)}
                            />
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteShortcut(shortcut.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          
          <Card className="p-4 space-y-3">
            <h3 className="font-medium">إضافة اختصار جديد</h3>
            <div className="grid gap-2">
              <Label htmlFor="shortcut-name">اسم الاختصار</Label>
              <Input 
                id="shortcut-name" 
                placeholder="مثال: طلب عميل"
                value={newShortcut.name}
                onChange={(e) => setNewShortcut({ ...newShortcut, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="shortcut-route">المسار</Label>
              <Input 
                id="shortcut-route" 
                placeholder="مثال: /orders/new"
                value={newShortcut.route}
                onChange={(e) => setNewShortcut({ ...newShortcut, route: e.target.value })}
              />
            </div>
            <Button 
              onClick={handleAddShortcut} 
              className="w-full"
            >
              <Plus size={16} className="ml-2" />
              إضافة اختصار
            </Button>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
  
  return isMobile ? (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-6">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">إعدادات لوحة التحكم</h2>
          <SettingsContent />
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إعدادات لوحة التحكم</DialogTitle>
          <DialogDescription>
            تخصيص لوحة التحكم وإدارة الاختصارات
          </DialogDescription>
        </DialogHeader>
        <SettingsContent />
        <DialogFooter>
          <Button type="submit" onClick={() => toast.success("تم حفظ الإعدادات")}>
            حفظ الإعدادات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
