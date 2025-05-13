
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { User } from "@/types/settings";
import UserForm from "@/components/settings/users/UserForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import UserTable from "@/components/settings/users/UserTable";
import UserFilters from "@/components/settings/users/UserFilters";
import UserStats from "@/components/settings/users/UserStats";

// تحديث بيانات المستخدمين المبدئية لاستخدام معرفات (IDs) بدلاً من الأسماء لكل من الدور والفرع
const initialUsers: User[] = [
  {
    id: "1",
    username: "ahmed.mohamed",
    fullName: "أحمد محمد",
    email: "ahmed@example.com",
    role: "admin",
    branch: "1",
    phone: "0512345678",
    isActive: true,
    lastLogin: new Date("2023-05-12T10:30:00"),
    createdAt: new Date("2022-01-15")
  },
  {
    id: "2",
    username: "sara.abdullah",
    fullName: "سارة عبدالله",
    email: "sara@example.com",
    role: "accountant",
    branch: "1",
    phone: "0523456789",
    isActive: true,
    lastLogin: new Date("2023-05-11T14:25:00"),
    createdAt: new Date("2022-03-20")
  },
  {
    id: "3",
    username: "khalid.otaibi",
    fullName: "خالد العتيبي",
    email: "khalid@example.com",
    role: "sales",
    branch: "2",
    phone: "0534567890",
    isActive: true,
    lastLogin: new Date("2023-05-10T09:15:00"),
    createdAt: new Date("2022-02-10")
  },
  {
    id: "4",
    username: "mona.zahrani",
    fullName: "منى الزهراني",
    email: "mona@example.com",
    role: "inventory",
    branch: "3",
    phone: "0545678901",
    isActive: false,
    lastLogin: new Date("2023-05-01T11:45:00"),
    createdAt: new Date("2022-04-05")
  },
  {
    id: "5",
    username: "fahad.saeed",
    fullName: "فهد السعيد",
    email: "fahad@example.com",
    role: "accountant",
    branch: "1",
    phone: "0556789012",
    isActive: true,
    lastLogin: new Date("2023-05-12T08:20:00"),
    createdAt: new Date("2022-01-25")
  }
];

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === "" || 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "" || user.role === roleFilter;
    const matchesStatus = statusFilter === "" || 
      (statusFilter === "active" && user.isActive) || 
      (statusFilter === "inactive" && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleOpenUserForm = (user: User | null = null) => {
    setCurrentUser(user);
    setIsUserFormOpen(true);
  };

  const handleSaveUser = (userData: User) => {
    if (currentUser) {
      // Update existing user
      setUsers(prev => prev.map(user => 
        user.id === currentUser.id ? userData : user
      ));
      toast.success(`تم تعديل بيانات المستخدم ${userData.fullName} بنجاح`);
    } else {
      // Create new user with generated ID
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      setUsers(prev => [...prev, newUser]);
      toast.success(`تم إضافة المستخدم ${userData.fullName} بنجاح`);
    }
    
    setIsUserFormOpen(false);
  };

  const handleDeleteUser = () => {
    if (currentUser) {
      setUsers(prev => prev.filter(user => user.id !== currentUser.id));
      toast.success(`تم حذف المستخدم ${currentUser.fullName} بنجاح`);
      setIsDeleteDialogOpen(false);
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, isActive: !user.isActive }
        : user
    ));
    
    const targetUser = users.find(user => user.id === userId);
    if (targetUser) {
      const newStatus = !targetUser.isActive;
      const statusText = newStatus ? 'تفعيل' : 'تعطيل';
      
      toast.success(`تم ${statusText} حساب المستخدم ${targetUser.fullName} بنجاح`);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setRoleFilter("");
    setStatusFilter("");
  };

  return (
    <PageContainer title="المستخدمون">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
          <Button onClick={() => handleOpenUserForm()} className="w-full md:w-auto">
            <UserPlus className="ml-2 h-4 w-4" /> إضافة مستخدم
          </Button>
        </div>
        
        {/* إحصائيات المستخدمين */}
        <UserStats users={users} />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>قائمة المستخدمين</span>
              <span className="text-sm font-normal text-muted-foreground">
                {filteredUsers.length} مستخدم
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* فلاتر البحث */}
            <UserFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              resetFilters={resetFilters}
            />

            {/* جدول المستخدمين */}
            <UserTable 
              users={filteredUsers} 
              onEditUser={handleOpenUserForm}
              onDeleteUser={(user) => {
                setCurrentUser(user);
                setIsDeleteDialogOpen(true);
              }}
              onToggleUserStatus={toggleUserStatus}
            />
          </CardContent>
        </Card>

        {/* حوار إضافة/تعديل المستخدم */}
        {isUserFormOpen && (
          <Dialog open={isUserFormOpen} onOpenChange={setIsUserFormOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {currentUser ? `تعديل بيانات المستخدم: ${currentUser.fullName}` : "إضافة مستخدم جديد"}
                </DialogTitle>
                <DialogDescription>
                  {currentUser ? "قم بتعديل بيانات المستخدم" : "أدخل بيانات المستخدم الجديد"}
                </DialogDescription>
              </DialogHeader>
              
              <UserForm 
                user={currentUser} 
                onSave={handleSaveUser} 
              />
            </DialogContent>
          </Dialog>
        )}

        {/* حوار تأكيد حذف المستخدم */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تأكيد الحذف</DialogTitle>
              <DialogDescription>
                هل أنت متأكد من أنك تريد حذف المستخدم "{currentUser?.fullName}"؟ لا يمكن التراجع عن هذه العملية.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                إلغاء
              </Button>
              <Button variant="destructive" onClick={handleDeleteUser}>
                حذف
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default UsersPage;
