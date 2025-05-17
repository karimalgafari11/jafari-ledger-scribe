
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "@/hooks/useTranslation";

// Define validation schema using Zod
const loginSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address" }),
  password: z.string()
    .min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useTranslation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    
    try {
      await signIn(values.email, values.password, values.rememberMe || false);
      // User will be redirected automatically by AuthGuard
    } catch (err: any) {
      console.error("Error during login:", err);
      
      if (err.message.includes("invalid credentials") || err.message.includes("Invalid login")) {
        setError(t('invalidCredentials'));
      } else {
        setError(err.message || t('errorOccurred'));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img 
          src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
          alt="Al-Jaafari Accounting" 
          className="w-96 h-96 opacity-[0.07]" 
        />
      </div>
      
      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <Logo size="large" />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">
          {language === 'ar' ? 'الجعفري للمحاسبة' : 'Al-Jaafari Accounting'}
        </h1>
        
        <Card>
          <CardHeader className="text-center">
            <h2 className="text-xl font-medium">{t('login')}</h2>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('email')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder={language === 'ar' ? "أدخل البريد الإلكتروني" : "Enter your email"}
                          className={language === 'ar' ? "rtl" : ""}
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
                      <FormLabel>{t('password')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="password"
                          placeholder={language === 'ar' ? "أدخل كلمة المرور" : "Enter your password"}
                          className={language === 'ar' ? "rtl" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between items-center">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className={`flex flex-row items-center space-x-3 ${language === 'ar' ? 'space-x-reverse rtl' : ''}`}>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className={language === 'ar' ? "mr-2" : "ml-2"}>
                          {t('rememberMe')}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <Link 
                    to="/auth/reset-password" 
                    className="text-sm text-teal-600 hover:underline"
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? 
                    (language === 'ar' ? "جاري تسجيل الدخول..." : "Logging in...") : 
                    t('loginButton')}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center space-y-2 flex-col">
            <div className="text-sm text-center">
              {t('dontHaveAccount')}{" "}
              <Link to="/auth/register" className="text-blue-600 hover:underline">
                {t('createAccount')}
              </Link>
            </div>
            <div className="text-sm text-muted-foreground text-center">
              {t('accountSystem')}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
