
import React from 'react';
import { User } from '@/types/settings';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Pencil, Trash2, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { mockUserRoles } from '@/data/mockPermissions';
import { mockBranches } from '@/data/mockSettings';

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onToggleUserStatus: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEditUser, onDeleteUser, onToggleUserStatus }) => {
  // Helper functions
  const getRoleName = (roleId: string) => {
    const role = mockUserRoles.find(r => r.id === roleId);
    return role ? role.name : roleId;
  };

  const getBranchName = (branchId: string) => {
    const branch = mockBranches.find(b => b.id === branchId);
    return branch ? branch.name : branchId;
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "لم يسجل دخول بعد";
    
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table striped hoverable bordered>
        <TableHeader>
          <TableRow>
            <TableHead>المستخدم</TableHead>
            <TableHead>البريد الإلكتروني</TableHead>
            <TableHead className="hidden md:table-cell">الدور الوظيفي</TableHead>
            <TableHead className="hidden md:table-cell">الفرع</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="hidden lg:table-cell">آخر تسجيل دخول</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.fullName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium block">{user.fullName}</span>
                      <span className="text-sm text-muted-foreground md:hidden">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                <TableCell className="hidden md:table-cell">{getRoleName(user.role)}</TableCell>
                <TableCell className="hidden md:table-cell">{getBranchName(user.branch)}</TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "default" : "outline"}>
                    {user.isActive ? "نشط" : "غير نشط"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{formatDate(user.lastLogin)}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditUser(user)}>
                          <Pencil className="ml-2 h-4 w-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onToggleUserStatus(user.id)}>
                          <Users className="ml-2 h-4 w-4" />
                          {user.isActive ? "تعطيل الحساب" : "تفعيل الحساب"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDeleteUser(user)}
                        >
                          <Trash2 className="ml-2 h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                لا يوجد مستخدمين مطابقين للبحث
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
