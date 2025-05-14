
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// تعريف مخطط التحقق باستخدام Zod
const forgotPasswordSchema = z.object({
  email: z.string()
    .email({ message: "البريد الإلكتروني غير صالح" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  const { resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setError(null);
    setSuccess(false);
    
    try {
      await resetPassword(values.email);
      setSuccess(true);
      setTimeout(() => {
        navigate("/auth/login");
      }, 5000);
    } catch (err: any) {
      console.error("Error during password reset:", err);
      setError(err.message || "حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور");
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
            <h2 className="text-xl font-medium">استعادة كلمة المرور</h2>
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

                {success && (
                  <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription>
                      تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. 
                      يرجى التحقق من بريدك الإلكتروني واتباع التعليمات.
                    </AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="أدخل البريد الإلكتروني المسجل"
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
                  disabled={isLoading || success}
                >
                  {isLoading ? "جاري الإرسال..." : "إرسال رابط التعيين"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-center">
              <Link to="/auth/login" className="text-blue-600 hover:underline">
                العودة إلى تسجيل الدخول
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
