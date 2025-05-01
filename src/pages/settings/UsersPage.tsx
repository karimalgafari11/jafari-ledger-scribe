
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, UserCog, UserX } from "lucide-react";
import { mockUsers } from '@/data/mockSettings';
import { User } from '@/types/settings';
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UserForm from '@/components/settings/users/UserForm';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const filteredUsers = users.filter(user => 
    user.username.includes(searchTerm) || 
    user.fullName.includes(searchTerm) || 
    user.email.includes(searchTerm)
  );
  
  const handleAddUser = () => {
    setCurrentUser(null);
    setIsDialogOpen(true);
  };
  
  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };
  
  const handleToggleUserStatus = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, isActive: !user.isActive } 
          : user
      )
    );
  };
  
  const handleSaveUser = (userData: User) => {
    if (currentUser) {
      // Edit existing user
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userData.id ? userData : user
        )
      );
    } else {
      // Add new user
      const newUser = {
        ...userData,
        id: `user-${Date.now()}`,
        createdAt: new Date()
      };
      setUsers(prevUsers => [...prevUsers, newUser]);
    }
    setIsDialogOpen(false);
  };
  
  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-red-500 hover:bg-red-600';
      case 'manager': return 'bg-blue-500 hover:bg-blue-600';
      case 'accountant': return 'bg-green-500 hover:bg-green-600';
      case 'inventory': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'sales': return 'bg-purple-500 hover:bg-purple-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="container mx-auto p-6 rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
        <Button onClick={handleAddUser}>
          <PlusCircle className="ml-2 h-4 w-4" />
          إضافة مستخدم جديد
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="البحث عن مستخدم..." 
            className="pr-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <Table hoverable striped>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المستخدم</TableHead>
              <TableHead>الاسم الكامل</TableHead>
              <TableHead>الصلاحية</TableHead>
              <TableHead>الفرع</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>آخر دخول</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.branch}</TableCell>
                <TableCell dir="ltr">{user.email}</TableCell>
                <TableCell dir="ltr">{user.phone}</TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "success" : "destructive"}>
                    {user.isActive ? 'مفعّل' : 'معطّل'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('ar-SA') : '-'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <UserCog className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditUser(user)}>
                        تعديل البيانات
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                        {user.isActive ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  لا يوجد مستخدمين مطابقين لمعايير البحث
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentUser ? 'تعديل بيانات المستخدم' : 'إضافة مستخدم جديد'}</DialogTitle>
            <DialogDescription>
              {currentUser ? 'قم بتعديل بيانات المستخدم أدناه' : 'أدخل بيانات المستخدم الجديد'}
            </DialogDescription>
          </DialogHeader>
          <UserForm user={currentUser} onSave={handleSaveUser} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
