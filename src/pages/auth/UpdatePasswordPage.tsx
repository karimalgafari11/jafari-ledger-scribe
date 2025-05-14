
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// تعريف مخطط التحقق باستخدام Zod
const updatePasswordSchema = z.object({
  password: z.string()
    .min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["confirmPassword"],
});

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

const UpdatePasswordPage: React.FC = () => {
  const { updatePassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: UpdatePasswordFormValues) => {
    setError(null);
    
    try {
      await updatePassword(values.password);
      navigate("/auth/login");
    } catch (err: any) {
      console.error("Error updating password:", err);
      setError(err.message || "حدث خطأ أثناء تحديث كلمة المرور");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
      {/* العلامة المائية */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img 
          src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
          alt="الجعفري للمحاسبة" 
          className="w-96 h-96 opacity-[0.07]" 
        />
      </div>
      
      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <Logo size="large" />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">الجعفري للمحاسبة</h1>
        
        <Card>
          <CardHeader className="text-center">
            <h2 className="text-xl font-medium">تحديث كلمة المرور</h2>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كلمة المرور الجديدة</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="password"
                          placeholder="أدخل كلمة المرور الجديدة"
                          className="rtl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تأكيد كلمة المرور</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="password"
                          placeholder="أعد إدخال كلمة المرور الجديدة"
                          className="rtl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? "جاري التحديث..." : "تحديث كلمة المرور"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
