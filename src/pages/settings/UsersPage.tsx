
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { User } from "@/types/settings";
import UserForm from "@/components/settings/users/UserForm";
import { mockUserRoles } from "@/data/mockPermissions";
import { mockBranches } from "@/data/mockSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { UserPlus, Pencil, Trash2, Search, Users, Filter, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock users data
const initialUsers: User[] = [
  {
    id: "1",
    username: "ahmed.mohamed",
    fullName: "أحمد محمد",
    email: "ahmed@example.com",
    role: "admin",
    branch: "الرياض",
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
    branch: "الرياض",
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
    branch: "جدة",
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
    branch: "الدمام",
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
    branch: "الرياض",
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
    <PageContainer title="المستخدمون">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
          <Button onClick={() => handleOpenUserForm()}>
            <UserPlus className="ml-2 h-4 w-4" /> إضافة مستخدم
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>قائمة المستخدمين</span>
              <Badge variant="outline" className="ml-2">
                {filteredUsers.length} مستخدم
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن مستخدم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="الدور الوظيفي" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الأدوار</SelectItem>
                  <SelectItem value="admin">مدير النظام</SelectItem>
                  <SelectItem value="manager">مدير</SelectItem>
                  <SelectItem value="accountant">محاسب</SelectItem>
                  <SelectItem value="inventory">مخزون</SelectItem>
                  <SelectItem value="sales">مبيعات</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={() => { setSearchQuery(""); setRoleFilter(""); setStatusFilter(""); }}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المستخدم</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>الدور الوظيفي</TableHead>
                    <TableHead>الفرع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>آخر تسجيل دخول</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {user.fullName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.fullName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.role === "admin" && "مدير النظام"}
                          {user.role === "manager" && "مدير"}
                          {user.role === "accountant" && "محاسب"}
                          {user.role === "inventory" && "مخزون"}
                          {user.role === "sales" && "مبيعات"}
                        </TableCell>
                        <TableCell>{user.branch}</TableCell>
                        <TableCell>
                          <Badge variant={user.isActive ? "default" : "outline"}>
                            {user.isActive ? "نشط" : "غير نشط"}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.lastLogin)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOpenUserForm(user)}>
                                  <Pencil className="ml-2 h-4 w-4" />
                                  تعديل
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                                  <Users className="ml-2 h-4 w-4" />
                                  {user.isActive ? "تعطيل الحساب" : "تفعيل الحساب"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => {
                                    setCurrentUser(user);
                                    setIsDeleteDialogOpen(true);
                                  }}
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
                      <TableCell colSpan={7} className="text-center py-4">
                        لا يوجد مستخدمين مطابقين للبحث
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* User Form Dialog */}
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

        {/* Delete User Dialog */}
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
