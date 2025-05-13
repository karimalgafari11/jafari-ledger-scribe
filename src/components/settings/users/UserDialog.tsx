
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from '@/types/settings';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { mockUserRoles } from '@/data/mockPermissions';
import { mockBranches } from '@/data/mockSettings';

// تعريف المخطط للتحقق من صحة المدخلات
const userSchema = z.object({
  username: z.string().min(3, { message: 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل' }),
  fullName: z.string().min(2, { message: 'الاسم الكامل مطلوب' }),
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
  role: z.string().min(1, { message: 'الدور الوظيفي مطلوب' }),
  branch: z.string().min(1, { message: 'الفرع مطلوب' }),
  phone: z.string().min(10, { message: 'رقم الهاتف غير صحيح' }).optional(),
  isActive: z.boolean().default(true)
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (user: User) => void;
}

export const UserDialog: React.FC<UserDialogProps> = ({ 
  user, 
  open, 
  onOpenChange, 
  onSave 
}) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: user ? {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      branch: user.branch,
      phone: user.phone || '',
      isActive: user.isActive
    } : {
      username: '',
      fullName: '',
      email: '',
      role: '',
      branch: '',
      phone: '',
      isActive: true
    }
  });

  const onSubmit = (data: UserFormValues) => {
    onSave({
      ...data,
      id: user?.id || '',
      lastLogin: user?.lastLogin,
      createdAt: user?.createdAt || new Date(),
      avatar: user?.avatar
    } as User);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {user ? `تعديل بيانات المستخدم: ${user.fullName}` : "إضافة مستخدم جديد"}
          </DialogTitle>
          <DialogDescription>
            {user ? "قم بتعديل بيانات المستخدم" : "أدخل بيانات المستخدم الجديد"}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المستخدم</FormLabel>
                    <FormControl>
                      <Input placeholder="اسم المستخدم" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الكامل</FormLabel>
                    <FormControl>
                      <Input placeholder="الاسم الكامل" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="البريد الإلكتروني" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input placeholder="رقم الهاتف" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الدور الوظيفي</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الدور الوظيفي" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockUserRoles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الفرع</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفرع" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockBranches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>حالة الحساب</FormLabel>
                    <FormDescription className="text-sm text-muted-foreground">
                      تفعيل أو تعطيل حساب المستخدم
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                إلغاء
              </Button>
              <Button type="submit">
                {user ? 'حفظ التعديلات' : 'إضافة المستخدم'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

// Missing FormDescription import
import { FormDescription } from "@/components/ui/form";
