
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
    permissions: Permission[] | string[];
  };
  onSubmit: (data: Omit<UserRole, "id" | "createdAt" | "updatedAt" | "isSystem">) => Promise<void>;
  isLoading: boolean;
}

const RoleForm = ({ permissionGroups, initialData, onSubmit, isLoading }: RoleFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  
  // Convert initial permissions to string ids if they are objects
  const initialPermissionIds = initialData?.permissions 
    ? (Array.isArray(initialData.permissions) 
      ? initialData.permissions.map(p => typeof p === 'string' ? p : p.id)
      : []) 
    : [];
  
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(initialPermissionIds);
  const [activeTab, setActiveTab] = useState<string>("permissions");

  const handleTogglePermission = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleToggleAll = (groupId: string) => {
    const group = permissionGroups.find(g => g.id === groupId);
    if (!group) return;
    
    const groupPermissionIds = group.permissions.map(p => p.id);
    
    const allSelected = groupPermissionIds.every(id => selectedPermissions.includes(id));
    
    if (allSelected) {
      // Deselect all permissions in this group
      setSelectedPermissions(prev => 
        prev.filter(id => !groupPermissionIds.includes(id))
      );
    } else {
      // Select all permissions in this group
      setSelectedPermissions(prev => {
        const newPermissions = [...prev];
        groupPermissionIds.forEach(id => {
          if (!newPermissions.includes(id)) {
            newPermissions.push(id);
          }
        });
        return newPermissions;
      });
    }
  };

  const handleSubmit = async () => {
    await onSubmit({
      name,
      description,
      permissions: selectedPermissions
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info">البيانات الأساسية</TabsTrigger>
          <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">اسم المجموعة</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسم المجموعة"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">وصف المجموعة</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أدخل وصفاً مختصراً للمجموعة وصلاحياتها"
              rows={3}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="permissions" className="pt-4">
          <Accordion type="multiple" defaultValue={permissionGroups.map(g => g.id)}>
            {permissionGroups.map((group) => {
              const groupPermissionIds = group.permissions.map(p => p.id);
              const allSelected = groupPermissionIds.every(id => 
                selectedPermissions.includes(id)
              );
              const someSelected = groupPermissionIds.some(id => 
                selectedPermissions.includes(id)
              );
              
              return (
                <AccordionItem key={group.id} value={group.id}>
                  <AccordionTrigger className="hover:bg-slate-50 px-4 py-2">
                    <div className="flex items-center">
                      <Checkbox
                        id={`group-${group.id}`}
                        checked={allSelected}
                        className={someSelected && !allSelected ? "bg-primary/30" : ""}
                        onCheckedChange={() => handleToggleAll(group.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <label 
                        htmlFor={`group-${group.id}`} 
                        className="mr-2 text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {group.name}
                      </label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 pb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {group.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Checkbox
                            id={permission.id}
                            checked={selectedPermissions.includes(permission.id)}
                            onCheckedChange={() => handleTogglePermission(permission.id)}
                          />
                          <label 
                            htmlFor={permission.id} 
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {permission.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !name.trim()}
        >
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          حفظ
        </Button>
      </div>
    </div>
  );
};

export default RoleForm;
