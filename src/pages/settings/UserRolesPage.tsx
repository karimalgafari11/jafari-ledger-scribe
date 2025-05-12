
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { UserPlus, Pencil, Trash2, Shield } from "lucide-react";

// Mock roles and permissions data
const mockRoles = [
  {
    id: "1",
    name: "مدير النظام",
    description: "صلاحيات كاملة على النظام",
    userCount: 2,
    permissions: ["users.view", "users.create", "users.edit", "users.delete", "roles.view", "roles.create", "roles.edit", "roles.delete", "settings.view", "settings.edit"]
  },
  {
    id: "2",
    name: "محاسب",
    description: "صلاحيات على النظام المحاسبي",
    userCount: 5,
    permissions: ["accounts.view", "accounts.create", "accounts.edit", "journals.view", "journals.create", "journals.edit", "reports.view"]
  },
  {
    id: "3",
    name: "موظف مبيعات",
    description: "صلاحيات على نظام المبيعات",
    userCount: 8,
    permissions: ["sales.view", "sales.create", "customers.view", "customers.create", "customers.edit", "invoices.view", "invoices.create"]
  },
  {
    id: "4",
    name: "موظف مخزون",
    description: "صلاحيات على نظام المخزون",
    userCount: 3,
    permissions: ["inventory.view", "inventory.create", "inventory.edit", "products.view", "products.create", "products.edit"]
  }
];

const permissionCategories = [
  {
    name: "المستخدمين",
    key: "users",
    permissions: [
      { key: "users.view", name: "عرض المستخدمين" },
      { key: "users.create", name: "إضافة مستخدم" },
      { key: "users.edit", name: "تعديل مستخدم" },
      { key: "users.delete", name: "حذف مستخدم" }
    ]
  },
  {
    name: "الأدوار والصلاحيات",
    key: "roles",
    permissions: [
      { key: "roles.view", name: "عرض الأدوار" },
      { key: "roles.create", name: "إضافة دور" },
      { key: "roles.edit", name: "تعديل دور" },
      { key: "roles.delete", name: "حذف دور" }
    ]
  },
  {
    name: "الحسابات",
    key: "accounts",
    permissions: [
      { key: "accounts.view", name: "عرض الحسابات" },
      { key: "accounts.create", name: "إضافة حساب" },
      { key: "accounts.edit", name: "تعديل حساب" },
      { key: "accounts.delete", name: "حذف حساب" }
    ]
  },
  {
    name: "المبيعات",
    key: "sales",
    permissions: [
      { key: "sales.view", name: "عرض المبيعات" },
      { key: "sales.create", name: "إضافة مبيعات" },
      { key: "sales.edit", name: "تعديل مبيعات" },
      { key: "sales.delete", name: "حذف مبيعات" }
    ]
  }
];

const UserRolesPage = () => {
  const [roles, setRoles] = useState(mockRoles);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<any>(null);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[]
  });

  const handleOpenRoleDialog = (role: any = null) => {
    if (role) {
      setCurrentRole(role);
      setNewRole({
        name: role.name,
        description: role.description,
        permissions: [...role.permissions]
      });
    } else {
      setCurrentRole(null);
      setNewRole({
        name: "",
        description: "",
        permissions: []
      });
    }
    setIsRoleDialogOpen(true);
  };

  const handleSaveRole = () => {
    if (!newRole.name) {
      toast.error("يرجى إدخال اسم الدور");
      return;
    }

    if (currentRole) {
      // Update existing role
      setRoles(prev => prev.map(role => 
        role.id === currentRole.id 
        ? { ...role, name: newRole.name, description: newRole.description, permissions: newRole.permissions } 
        : role
      ));
      toast.success(`تم تعديل دور ${newRole.name} بنجاح`);
    } else {
      // Create new role
      const newId = (roles.length + 1).toString();
      setRoles(prev => [...prev, {
        id: newId,
        name: newRole.name,
        description: newRole.description,
        userCount: 0,
        permissions: newRole.permissions
      }]);
      toast.success(`تم إضافة دور ${newRole.name} بنجاح`);
    }
    
    setIsRoleDialogOpen(false);
  };

  const handleDeleteRole = () => {
    if (currentRole) {
      setRoles(prev => prev.filter(role => role.id !== currentRole.id));
      toast.success(`تم حذف دور ${currentRole.name} بنجاح`);
      setIsDeleteDialogOpen(false);
    }
  };

  const togglePermission = (permission: string) => {
    if (newRole.permissions.includes(permission)) {
      setNewRole({
        ...newRole,
        permissions: newRole.permissions.filter(p => p !== permission)
      });
    } else {
      setNewRole({
        ...newRole,
        permissions: [...newRole.permissions, permission]
      });
    }
  };

  return (
    <PageContainer title="أدوار المستخدمين" showBack={true}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة أدوار المستخدمين</h1>
          <Button onClick={() => handleOpenRoleDialog()}>
            <UserPlus className="ml-2 h-4 w-4" />
            إضافة دور جديد
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>قائمة الأدوار</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم الدور</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>عدد المستخدمين</TableHead>
                  <TableHead>الصلاحيات</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.userCount} مستخدم</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.length > 0 ? (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {role.permissions.length} صلاحية
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                            بدون صلاحيات
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenRoleDialog(role)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setCurrentRole(role);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog for adding or editing a role */}
        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentRole ? `تعديل دور: ${currentRole.name}` : "إضافة دور جديد"}
              </DialogTitle>
              <DialogDescription>
                {currentRole
                  ? "قم بتعديل اسم الدور والصلاحيات المسموح بها"
                  : "أدخل اسم الدور الجديد وحدد الصلاحيات المسموح بها"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم الدور</Label>
                <Input
                  id="name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="أدخل اسم الدور"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">وصف الدور</Label>
                <Input
                  id="description"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="أدخل وصف الدور"
                />
              </div>
              
              <div className="space-y-2">
                <Label>الصلاحيات</Label>
                <Card>
                  <CardContent className="p-4">
                    {permissionCategories.map((category) => (
                      <div key={category.key} className="mb-6">
                        <h3 className="text-md font-medium mb-2 flex items-center">
                          <Shield className="h-4 w-4 ml-2" />
                          {category.name}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {category.permissions.map((permission) => (
                            <div key={permission.key} className="flex items-center space-x-2">
                              <Checkbox
                                id={permission.key}
                                checked={newRole.permissions.includes(permission.key)}
                                onCheckedChange={() => togglePermission(permission.key)}
                              />
                              <Label
                                htmlFor={permission.key}
                                className="mr-2 cursor-pointer"
                              >
                                {permission.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleSaveRole}>
                {currentRole ? "تعديل الدور" : "إضافة الدور"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog for deleting a role */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تأكيد الحذف</DialogTitle>
              <DialogDescription>
                هل أنت متأكد من أنك تريد حذف دور "{currentRole?.name}"؟ لا يمكن التراجع عن هذه العملية.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                إلغاء
              </Button>
              <Button variant="destructive" onClick={handleDeleteRole}>
                حذف
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default UserRolesPage;
