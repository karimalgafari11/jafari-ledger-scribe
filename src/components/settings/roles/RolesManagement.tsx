
import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { UserRole, PermissionGroup } from "@/types/permissions";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, PlusIcon, Trash2Icon, UserIcon, Pencil } from "lucide-react";
import RoleForm from "./RoleForm";

interface RolesManagementProps {
  roles: UserRole[];
  permissionGroups: PermissionGroup[];
  onAddRole: (role: Omit<UserRole, 'id' | 'createdAt' | 'updatedAt' | 'isSystem'>) => Promise<boolean>;
  onUpdateRole: (roleId: string, role: Partial<UserRole>) => Promise<boolean>;
  onDeleteRole: (roleId: string) => Promise<boolean>;
  isLoading: boolean;
}

const RolesManagement = ({
  roles,
  permissionGroups,
  onAddRole,
  onUpdateRole,
  onDeleteRole,
  isLoading
}: RolesManagementProps) => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);

  const handleEdit = (role: UserRole) => {
    setCurrentRole(role);
    setOpenEditDialog(true);
  };

  const handleDelete = (role: UserRole) => {
    setCurrentRole(role);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (currentRole) {
      const success = await onDeleteRole(currentRole.id);
      if (success) {
        setOpenDeleteDialog(false);
      }
    }
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>مجموعات المستخدمين</CardTitle>
              <CardDescription>
                إدارة مجموعات المستخدمين وصلاحياتهم في النظام
              </CardDescription>
            </div>
            <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="ml-2 h-4 w-4" />
                  إضافة مجموعة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] rtl">
                <DialogHeader>
                  <DialogTitle>إضافة مجموعة مستخدمين جديدة</DialogTitle>
                  <DialogDescription>
                    قم بتحديد اسم ووصف المجموعة والصلاحيات المطلوبة
                  </DialogDescription>
                </DialogHeader>
                
                <RoleForm 
                  permissionGroups={permissionGroups}
                  onSubmit={async (roleData) => {
                    const success = await onAddRole(roleData);
                    if (success) setOpenAddDialog(false);
                  }}
                  isLoading={isLoading}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المجموعة</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>نوع المجموعة</TableHead>
                <TableHead>عدد الصلاحيات</TableHead>
                <TableHead>آخر تحديث</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <UserIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                      {role.name}
                    </div>
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    {role.isSystem ? (
                      <Badge variant="secondary">نظامي</Badge>
                    ) : (
                      <Badge variant="outline">مخصص</Badge>
                    )}
                  </TableCell>
                  <TableCell>{role.permissions.length}</TableCell>
                  <TableCell>
                    {role.updatedAt.toLocaleDateString('ar-SA')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-s-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(role)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(role)}
                        disabled={role.isSystem}
                      >
                        <Trash2Icon className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* حوار تعديل المجموعة */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[600px] rtl">
          <DialogHeader>
            <DialogTitle>تعديل مجموعة المستخدمين</DialogTitle>
            <DialogDescription>
              قم بتعديل تفاصيل وصلاحيات المجموعة
            </DialogDescription>
          </DialogHeader>
          
          {currentRole && (
            <RoleForm 
              permissionGroups={permissionGroups}
              initialData={{
                name: currentRole.name,
                description: currentRole.description,
                permissions: currentRole.permissions
              }}
              onSubmit={async (roleData) => {
                const success = await onUpdateRole(currentRole.id, roleData);
                if (success) setOpenEditDialog(false);
              }}
              isLoading={isLoading}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* حوار حذف المجموعة */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent className="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من حذف هذه المجموعة؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف مجموعة المستخدمين "{currentRole?.name}" بشكل نهائي.
              لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              حذف المجموعة
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RolesManagement;
