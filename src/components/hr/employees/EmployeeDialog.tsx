
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Employee } from "@/types/hr";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// تحديث مخطط ZOD للتحقق بإضافة المزيد من الحقول
const employeeSchema = z.object({
  name: z.string().min(3, { message: "يجب أن يحتوي الاسم على 3 أحرف على الأقل" }),
  employeeId: z.string().min(1, { message: "الرقم الوظيفي مطلوب" }),
  position: z.string().min(1, { message: "المنصب مطلوب" }),
  department: z.string().min(1, { message: "القسم مطلوب" }),
  joinDate: z.string().min(1, { message: "تاريخ التعيين مطلوب" }),
  salary: z.number().positive({ message: "الراتب يجب أن يكون أكبر من صفر" }),
  status: z.enum(["active", "vacation", "terminated", "sick-leave"]),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }).optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  nationalId: z.string().optional(),
  birthDate: z.string().optional(),
  bankAccount: z.string().optional(),
  bankName: z.string().optional(),
  education: z.string().optional(),
  skills: z.string().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

interface EmployeeDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: EmployeeFormValues) => void;
  employee?: Employee;
  departments: string[];
  positions: string[];
}

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({
  open,
  setOpen,
  onSubmit,
  employee,
  departments,
  positions,
}) => {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee ? {
      ...employee,
      // Convert date to string if it's a Date object
      joinDate: employee.joinDate instanceof Date ? 
        employee.joinDate.toISOString().split("T")[0] : 
        typeof employee.joinDate === 'string' ? employee.joinDate : '',
      birthDate: employee.birthDate instanceof Date ?
        employee.birthDate.toISOString().split("T")[0] :
        employee.birthDate ? (typeof employee.birthDate === 'string' ? employee.birthDate : '') : '',
      // Convert skills array to comma separated string
      skills: employee.skills ? employee.skills.join(', ') : '',
    } : {
      name: "",
      employeeId: "",
      position: "",
      department: "",
      joinDate: new Date().toISOString().split("T")[0],
      salary: 0,
      status: "active",
      email: "",
      phone: "",
      address: "",
      nationalId: "",
      birthDate: "",
      bankAccount: "",
      bankName: "",
      education: "",
      skills: "",
    },
  });

  const handleSubmit = (values: EmployeeFormValues) => {
    onSubmit(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rtl sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{employee ? "تعديل موظف" : "إضافة موظف جديد"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">البيانات الأساسية</TabsTrigger>
                <TabsTrigger value="contact">بيانات الاتصال</TabsTrigger>
                <TabsTrigger value="financial">البيانات المالية والمهنية</TabsTrigger>
              </TabsList>
              
              {/* البيانات الأساسية */}
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الكامل</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل الاسم الكامل للموظف" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employeeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الرقم الوظيفي</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="EMP001" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nationalId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهوية</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل رقم الهوية/الإقامة" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تاريخ الميلاد</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="joinDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تاريخ التعيين</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>حالة الموظف</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الحالة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">نشط</SelectItem>
                            <SelectItem value="vacation">إجازة</SelectItem>
                            <SelectItem value="terminated">منتهي العقد</SelectItem>
                            <SelectItem value="sick-leave">إجازة مرضية</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              {/* بيانات الاتصال */}
              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} placeholder="example@company.com" />
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
                          <Input {...field} placeholder="05xxxxxxxx" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>العنوان</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="أدخل العنوان بالتفصيل" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              {/* البيانات المالية والمهنية */}
              <TabsContent value="financial" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>القسم</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر القسم" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map((department) => (
                              <SelectItem key={department} value={department}>
                                {department}
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
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المنصب</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر المنصب" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {positions.map((position) => (
                              <SelectItem key={position} value={position}>
                                {position}
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
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الراتب</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            placeholder="أدخل الراتب الشهري"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم البنك</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل اسم البنك" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الحساب البنكي</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل رقم الحساب البنكي" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المؤهل العلمي</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="مثال: بكالوريوس إدارة أعمال" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>المهارات</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="أدخل المهارات مفصولة بفواصل (مثال: إكسل، وورد، تواصل)" />
                        </FormControl>
                        <FormDescription>أدخل المهارات مفصولة بفواصل</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-6">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit">{employee ? "تحديث" : "إضافة"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDialog;

