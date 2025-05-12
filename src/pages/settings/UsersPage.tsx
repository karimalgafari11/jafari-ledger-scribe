
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserPlus, Pencil, Trash2, Search, Users, Filter, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

// Mock users data
const mockUsers = [
  {
    id: "1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    role: "مدير النظام",
    department: "الإدارة",
    status: "active",
    lastLogin: "2023-05-12T10:30:00",
    avatar: null
  },
  {
    id: "2",
    name: "سارة عبدالله",
    email: "sara@example.com",
    role: "محاسب",
    department: "المالية",
    status: "active",
    lastLogin: "2023-05-11T14:25:00",
    avatar: null
  },
  {
    id: "3",
    name: "خالد العتيبي",
    email: "khalid@example.com",
    role: "موظف مبيعات",
    department: "المبيعات",
    status: "active",
    lastLogin: "2023-05-10T09:15:00",
    avatar: null
  },
  {
    id: "4",
    name: "منى الزهراني",
    email: "mona@example.com",
    role: "موظف مخزون",
    department: "المستودعات",
    status: "inactive",
    lastLogin: "2023-05-01T11:45:00",
    avatar: null
  },
  {
    id: "5",
    name: "فهد السعيد",
    email: "fahad@example.com",
    role: "محاسب",
    department: "المالية",
    status: "active",
    lastLogin: "2023-05-12T08:20:00",
    avatar: null
  }
];

// Mock roles for dropdown
const mockRoleOptions = [
  { value: "مدير النظام", label: "مدير النظام" },
  { value: "محاسب", label: "محاسب" },
  { value: "موظف مبيعات", label: "موظف مبيعات" },
  { value: "موظف مخزون", label: "موظف مخزون" }
];

// Mock departments for dropdown
const mockDepartmentOptions = [
  { value: "الإدارة", label: "الإدارة" },
  { value: "المالية", label: "المالية" },
  { value: "المبيعات", label: "المبيعات" },
  { value: "المستودعات", label: "المستودعات" },
  { value: "الموارد البشرية", label: "الموارد البشرية" }
];

const UsersPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "active",
    password: "",
    confirmPassword: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "" || user.role === roleFilter;
    const matchesStatus = statusFilter === "" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleOpenUserDialog = (user: any = null) => {
    if (user) {
      setCurrentUser(user);
      setNewUser({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        status: user.status,
        password: "",
        confirmPassword: ""
      });
    } else {
      setCurrentUser(null);
      setNewUser({
        name: "",
        email: "",
        role: "",
        department: "",
        status: "active",
        password: "",
        confirmPassword: ""
      });
    }
    setIsUserDialogOpen(true);
  };

  const handleSaveUser = () => {
    // Validate required fields
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast.error("يرجى إكمال جميع الحقول المطلوبة");
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      toast.error("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    // Validate password match if adding new user
    if (!currentUser && newUser.password !== newUser.confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }

    if (currentUser) {
      // Update existing user
      setUsers(prev => prev.map(user => 
        user.id === currentUser.id 
        ? { ...user, name: newUser.name, email: newUser.email, role: newUser.role, department: newUser.department, status: newUser.status } 
        : user
      ));
      toast.success(`تم تعديل بيانات المستخدم ${newUser.name} بنجاح`);
    } else {
      // Create new user
      const newId = (users.length + 1).toString();
      setUsers(prev => [...prev, {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        status: newUser.status,
        lastLogin: null,
        avatar: null
      }]);
      toast.success(`تم إضافة المستخدم ${newUser.name} بنجاح`);
    }
    
    setIsUserDialogOpen(false);
  };

  const handleDeleteUser = () => {
    if (currentUser) {
      setUsers(prev => prev.filter(user => user.id !== currentUser.id));
      toast.success(`تم حذف المستخدم ${currentUser.name} بنجاح`);
      setIsDeleteDialogOpen(false);
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    
    const targetUser = users.find(user => user.id === userId);
    const newStatus = targetUser?.status === 'active' ? 'inactive' : 'active';
    const statusText = newStatus === 'active' ? 'تفعيل' : 'تعطيل';
    
    toast.success(`تم ${statusText} حساب المستخدم ${targetUser?.name} بنجاح`);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "لم يسجل دخول بعد";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <PageContainer title="المستخدمون">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
          <Button onClick={() => handleOpenUserDialog()}>
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
                  {mockRoleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
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
                    <TableHead>القسم</TableHead>
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
                              <AvatarImage src={user.avatar || ""} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {user.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "outline"}>
                            {user.status === "active" ? "نشط" : "غير نشط"}
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
                                <DropdownMenuItem onClick={() => handleOpenUserDialog(user)}>
                                  <Pencil className="ml-2 h-4 w-4" />
                                  تعديل
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                                  <Users className="ml-2 h-4 w-4" />
                                  {user.status === "active" ? "تعطيل الحساب" : "تفعيل الحساب"}
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

        {/* Dialog for adding or editing a user */}
        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {currentUser ? `تعديل بيانات المستخدم: ${currentUser.name}` : "إضافة مستخدم جديد"}
              </DialogTitle>
              <DialogDescription>
                {currentUser
                  ? "قم بتعديل بيانات المستخدم"
                  : "أدخل بيانات المستخدم الجديد"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="أدخل الاسم الكامل"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="example@company.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">الدور الوظيفي</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="اختر الدور الوظيفي" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRoleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">القسم</Label>
                <Select
                  value={newUser.department}
                  onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDepartmentOptions.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Label htmlFor="status" className="ml-2">الحساب نشط</Label>
                <Switch
                  id="status"
                  checked={newUser.status === "active"}
                  onCheckedChange={(checked) => setNewUser({ ...newUser, status: checked ? "active" : "inactive" })}
                />
              </div>
              
              {!currentUser && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={newUser.confirmPassword}
                      onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                    />
                  </div>
                </>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleSaveUser}>
                {currentUser ? "تعديل المستخدم" : "إضافة المستخدم"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog for deleting a user */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تأكيد الحذف</DialogTitle>
              <DialogDescription>
                هل أنت متأكد من أنك تريد حذف المستخدم "{currentUser?.name}"؟ لا يمكن التراجع عن هذه العملية.
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
