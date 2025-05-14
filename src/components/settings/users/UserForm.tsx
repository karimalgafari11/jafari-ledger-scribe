
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from '@/types/settings';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import UserFormFields from './UserFormFields';

// تحديث مخطط النموذج للتأكد من تطابق الأنواع مع بيانات الـ User
const formSchema = z.object({
  username: z.string().min(3, { message: 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل' }),
  fullName: z.string().min(2, { message: 'الاسم الكامل مطلوب' }),
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
  role: z.string().min(1, { message: 'الدور الوظيفي مطلوب' }),
  branch: z.string().min(1, { message: 'الفرع مطلوب' }),
  phone: z.string().min(10, { message: 'رقم الهاتف غير صحيح' }),
  isActive: z.boolean().default(true)
});

interface UserFormProps {
  user: User | null;
  onSave: (data: User) => void;
}

const UserForm = ({ user, onSave }: UserFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user ? {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      branch: user.branch,
      phone: user.phone,
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Make sure all required fields from User type are included and non-optional
    onSave({
      ...data,
      id: user?.id || '',
      lastLogin: user?.lastLogin,
      createdAt: user?.createdAt || new Date()
    } as User); // Cast to User type to ensure TypeScript knows we're providing all required fields
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <UserFormFields form={form} />
        
        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit">
            {user ? 'حفظ التعديلات' : 'إضافة المستخدم'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
