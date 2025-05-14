
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { toast } from "sonner";
import { User } from "@/types/settings";
import UsersHeader from "@/components/settings/users/UsersHeader";
import UsersStats from "@/components/settings/users/UsersStats";
import UsersFilters from "@/components/settings/users/UsersFilters";
import UsersTable from "@/components/settings/users/UsersTable";
import { UserDialog } from "@/components/settings/users/UserDialog";
import { DeleteUserDialog } from "@/components/settings/users/DeleteUserDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// بيانات المستخدمين المبدئية مع استخدام معرفات للأدوار والفروع
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
    createdAt: new Date("2022-01-15"),
    avatar: "/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png"
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

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === "" || 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && user.isActive) || 
      (statusFilter === "inactive" && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleOpenUserDialog = (user: User | null = null) => {
    setCurrentUser(user);
    setIsUserDialogOpen(true);
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
    
    setIsUserDialogOpen(false);
  };

  const handleDeleteUser = () => {
    if (currentUser) {
      setUsers(prev => prev.filter(user => user.id !== currentUser.id));
      toast.success(`تم حذف المستخدم ${currentUser.fullName} بنجاح`);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleUserStatus = (userId: string) => {
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
    setRoleFilter("all");
    setStatusFilter("all");
  };

  return (
    <PageContainer title="المستخدمون">
      <div className="p-4 md:p-6">
        <UsersHeader onCreateUser={() => handleOpenUserDialog()} />
        
        {/* إحصائيات المستخدمين */}
        <UsersStats users={users} />
        
        <Card className="mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex justify-between items-center">
              <span>قائمة المستخدمين</span>
              <span className="text-sm font-normal text-muted-foreground">
                {filteredUsers.length} مستخدم
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* فلاتر البحث */}
            <UsersFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onResetFilters={resetFilters}
            />

            {/* جدول المستخدمين */}
            <UsersTable 
              users={filteredUsers} 
              onEditUser={handleOpenUserDialog}
              onDeleteUser={(user) => {
                setCurrentUser(user);
                setIsDeleteDialogOpen(true);
              }}
              onToggleUserStatus={handleToggleUserStatus}
            />
          </CardContent>
        </Card>

        {/* حوار إضافة/تعديل المستخدم */}
        <UserDialog
          open={isUserDialogOpen}
          onOpenChange={setIsUserDialogOpen}
          user={currentUser}
          onSave={handleSaveUser}
        />

        {/* حوار تأكيد حذف المستخدم */}
        <DeleteUserDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          user={currentUser}
          onDelete={handleDeleteUser}
        />
      </div>
    </PageContainer>
  );
};

export default UsersPage;
