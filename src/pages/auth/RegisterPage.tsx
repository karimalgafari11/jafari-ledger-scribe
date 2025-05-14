
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// تعريف مخطط التحقق باستخدام Zod
const registerSchema = z.object({
  fullName: z.string()
    .min(2, { message: "يجب أن يكون الاسم أكثر من حرفين" })
    .max(50, { message: "يجب أن يكون الاسم أقل من 50 حرفًا" }),
  email: z.string()
    .email({ message: "البريد الإلكتروني غير صالح" }),
  password: z.string()
    .min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
  passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["passwordConfirm"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { signUp, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setError(null);
    
    try {
      await signUp(values.email, values.password, { 
        full_name: values.fullName 
      });
      
      toast.success("تم إنشاء الحساب بنجاح! تفقد بريدك الإلكتروني.");
      navigate("/auth/login");
    } catch (err: any) {
      console.error("Error during registration:", err);
      
      if (err.message.includes("email already in use")) {
        setError("البريد الإلكتروني مستخدم بالفعل، يرجى استخدام بريد آخر أو تسجيل الدخول");
      } else {
        setError(err.message || "حدث خطأ أثناء إنشاء الحساب");
      }
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
            <h2 className="text-xl font-medium">إنشاء حساب جديد</h2>
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
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="أدخل الاسم الكامل" 
                          className="rtl"
                        />
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
                        <Input 
                          {...field}
                          type="email"
                          placeholder="أدخل البريد الإلكتروني"
                          className="rtl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كلمة المرور</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="password"
                          placeholder="أدخل كلمة المرور"
                          className="rtl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تأكيد كلمة المرور</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="password"
                          placeholder="أعد إدخال كلمة المرور"
                          className="rtl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? "جاري التسجيل..." : "إنشاء حساب"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center space-y-2 flex-col">
            <div className="text-sm text-center">
              لديك حساب بالفعل؟{" "}
              <Link to="/auth/login" className="text-blue-600 hover:underline">
                تسجيل الدخول
              </Link>
            </div>
            <div className="text-sm text-muted-foreground text-center">
              نظام إدارة الحسابات المتكامل
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
