
import React, { useState } from "react";
import { FileText, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShortcutItem } from "@/types/dashboard";

interface ShortcutFormProps {
  onAddShortcut: (shortcut: Omit<ShortcutItem, "id" | "icon" | "enabled">) => void;
}

export const ShortcutForm: React.FC<ShortcutFormProps> = ({ onAddShortcut }) => {
  const [newShortcut, setNewShortcut] = useState({
    name: "",
    route: ""
  });

  const handleAddShortcut = () => {
    if (!newShortcut.name || !newShortcut.route) {
      toast.error("الرجاء إدخال الاسم والمسار للاختصار");
      return;
    }
    
    onAddShortcut({
      name: newShortcut.name,
      route: newShortcut.route,
      description: ""
    });
    
    setNewShortcut({ name: "", route: "" });
    toast.success("تم إضافة الاختصار بنجاح");
  };

  return (
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
  );
};
