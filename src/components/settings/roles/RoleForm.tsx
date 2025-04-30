
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Permission, PermissionGroup, UserRole } from "@/types/permissions";
import { Loader2 } from "lucide-react";

interface RoleFormProps {
  permissionGroups: PermissionGroup[];
  initialData?: {
    name: string;
    description: string;
    permissions: Permission[];
  };
  onSubmit: (data: Omit<UserRole, "id" | "createdAt" | "updatedAt" | "isSystem">) => Promise<void>;
  isLoading: boolean;
}

const RoleForm = ({ permissionGroups, initialData, onSubmit, isLoading }: RoleFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    initialData?.permissions.map(p => p.id) || []
  );
  const [activeTab, setActiveTab] = useState<string>("accounting");

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const isPermissionSelected = (permissionId: string) => {
    return selectedPermissions.includes(permissionId);
  };

  const allPermissions = permissionGroups.flatMap(group => group.permissions);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPermissionObjects = allPermissions.filter(p => 
      selectedPermissions.includes(p.id)
    );
    
    await onSubmit({
      name,
      description,
      permissions: selectedPermissionObjects
    });
  };

  const selectAllInCategory = (category: string) => {
    const group = permissionGroups.find(g => g.category === category);
    if (!group) return;
    
    const categoryPermissionIds = group.permissions.map(p => p.id);
    setSelectedPermissions(prev => {
      const otherCategories = prev.filter(id => 
        !categoryPermissionIds.includes(id)
      );
      return [...otherCategories, ...categoryPermissionIds];
    });
  };

  const deselectAllInCategory = (category: string) => {
    const group = permissionGroups.find(g => g.category === category);
    if (!group) return;
    
    const categoryPermissionIds = group.permissions.map(p => p.id);
    setSelectedPermissions(prev => 
      prev.filter(id => !categoryPermissionIds.includes(id))
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">اسم المجموعة</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: محاسب مبيعات"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">وصف المجموعة</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="وصف مختصر عن صلاحيات ومهام المجموعة"
            required
          />
        </div>

        <div className="my-4">
          <Label>الصلاحيات</Label>
          
          <Tabs defaultValue="accounting" value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="flex flex-wrap gap-1 mb-4">
              {permissionGroups.map((group) => (
                <TabsTrigger 
                  key={group.category} 
                  value={group.category}
                  className="whitespace-nowrap text-xs sm:text-sm"
                >
                  {getCategoryName(group.category)}
                </TabsTrigger>
              ))}
            </TabsList>

            {permissionGroups.map((group) => (
              <TabsContent key={group.category} value={group.category} className="space-y-4">
                <div className="flex justify-between mb-2">
                  <Label>{getCategoryName(group.category)}</Label>
                  <div className="flex gap-2">
                    <Button 
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => selectAllInCategory(group.category)}
                    >
                      تحديد الكل
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => deselectAllInCategory(group.category)}
                    >
                      إلغاء تحديد الكل
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-s-2 border p-2 rounded">
                      <Checkbox 
                        id={permission.id}
                        checked={isPermissionSelected(permission.id)}
                        onCheckedChange={() => togglePermission(permission.id)}
                      />
                      <Label 
                        htmlFor={permission.id}
                        className="mr-2 flex-1 cursor-pointer text-sm"
                      >
                        <div>{permission.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {permission.description}
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          {initialData ? 'حفظ التعديلات' : 'إنشاء مجموعة المستخدمين'}
        </Button>
      </div>
    </form>
  );
};

// وظيفة مساعدة لعرض اسم الفئة بالعربية
function getCategoryName(category: string): string {
  const categories: Record<string, string> = {
    accounting: 'المحاسبة',
    inventory: 'المخزون',
    sales: 'المبيعات',
    purchases: 'المشتريات',
    customers: 'العملاء',
    suppliers: 'الموردين',
    expenses: 'المصروفات',
    reports: 'التقارير',
    settings: 'الإعدادات',
    admin: 'إدارة النظام'
  };
  
  return categories[category] || category;
}

export default RoleForm;
