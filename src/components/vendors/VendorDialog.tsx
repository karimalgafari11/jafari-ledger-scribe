
import React from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogHeader, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل" }),
  contactPerson: z.string().min(3, { message: "اسم الشخص المسؤول يجب أن يكون 3 أحرف على الأقل" }),
  phone: z.string().min(9, { message: "رقم الهاتف غير صحيح" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  address: z.string().min(5, { message: "العنوان يجب أن يكون 5 أحرف على الأقل" }),
  taxNumber: z.string().optional(),
  category: z.string().min(2, { message: "التصنيف مطلوب" }),
  creditLimit: z.coerce.number().min(0, { message: "حد الائتمان يجب أن يكون رقم موجب" }),
  status: z.boolean().default(true),
});

type VendorFormValues = z.infer<typeof formSchema>;

interface VendorDialogProps {
  open: boolean;
  onClose: () => void;
  vendor: any | null;
  isEditMode: boolean;
}

export const VendorDialog: React.FC<VendorDialogProps> = ({
  open,
  onClose,
  vendor,
  isEditMode
}) => {
  // Initialize the form with default values or the vendor data if in edit mode
  const form = useForm<VendorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode && vendor 
      ? {
          name: vendor.name,
          contactPerson: vendor.contactPerson,
          phone: vendor.phone,
          email: vendor.email,
          address: vendor.address,
          taxNumber: vendor.taxNumber,
          category: vendor.category,
          creditLimit: vendor.creditLimit || 0,
          status: vendor.status === "نشط",
        }
      : {
          name: "",
          contactPerson: "",
          phone: "",
          email: "",
          address: "",
          taxNumber: "",
          category: "",
          creditLimit: 0,
          status: true,
        }
  });

  const onSubmit = (data: VendorFormValues) => {
    // Simulate form submission
    console.log("Vendor data submitted:", data);
    
    // Show success message and close dialog
    if (isEditMode) {
      toast.success(`تم تحديث بيانات المورد: ${data.name}`);
    } else {
      toast.success(`تم إضافة المورد: ${data.name}`);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
          <DialogTitle className="text-xl text-teal-700">{isEditMode ? "تعديل مورد" : "إضافة مورد جديد"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6">
            {form.formState.errors.root?.message && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {form.formState.errors.root?.message}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المورد</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم المورد" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm font-medium" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الشخص المسؤول</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم الشخص المسؤول" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm font-medium" />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input placeholder="05xxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm font-medium" />
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
                        <Input placeholder="example@company.com" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm font-medium" />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>العنوان</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل عنوان المورد" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm font-medium" />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="taxNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الرقم الضريبي</FormLabel>
                      <FormControl>
                        <Input placeholder="الرقم الضريبي (اختياري)" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        اختياري - أدخل الرقم الضريبي للمورد إن وجد
                      </FormDescription>
                      <FormMessage className="text-red-500 text-sm font-medium" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>التصنيف</FormLabel>
                      <FormControl>
                        <Input placeholder="تصنيف المورد" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm font-medium" />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="creditLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>حد الائتمان</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">
                      الحد الأعلى للائتمان المسموح به للمورد
                    </FormDescription>
                    <FormMessage className="text-red-500 text-sm font-medium" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse border rounded-md p-4 bg-gray-50">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-medium">
                        نشط
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500">
                        حدد هذا الخيار إذا كان المورد نشطاً ويمكن التعامل معه
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="flex justify-between border-t pt-4 mt-6">
              <Button type="button" variant="outline" onClick={onClose}>إلغاء</Button>
              <Button 
                type="submit" 
                disabled={form.formState.isSubmitting} 
                className="bg-teal-600 hover:bg-teal-700"
              >
                {form.formState.isSubmitting ? 'جارٍ الحفظ...' : isEditMode ? "تحديث" : "إضافة"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
