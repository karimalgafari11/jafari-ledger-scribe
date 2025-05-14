
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { defaultDarkTheme, defaultLightTheme } from "@/hooks/theme/themeDefaults";
import { applyThemeToDOM } from "@/hooks/theme/themeUtils";
import { loadSavedTheme } from "@/hooks/theme/themeUtils";

// تعريف نوع السمة
export type ThemeMode = "light" | "dark";

// تعريف نوع سياق التطبيق
interface AppContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  language: string; // Add language property to type
}

// إنشاء سياق التطبيق مع قيم افتراضية
export const AppContext = createContext<AppContextType>({
  themeMode: "light",
  toggleTheme: () => {},
  language: 'ar', // Default to Arabic
});

// مزود سياق التطبيق
export function AppProvider({ children }: { children: ReactNode }) {
  // حالة السمة
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // محاولة استرداد الوضع المخزن محليًا
    const savedTheme = localStorage.getItem("themeMode") as ThemeMode;
    return savedTheme || "light";
  });

  // تطبيق السمة مباشرة عند بدء التشغيل
  useEffect(() => {
    const defaultTheme = themeMode === 'dark' ? defaultDarkTheme : defaultLightTheme;
    const savedTheme = loadSavedTheme(defaultTheme);
    applyThemeToDOM(savedTheme);
  }, []);

  // تأثير لتطبيق السمة عند تغييرها
  useEffect(() => {
    // تحديث سمة الصفحة
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
      // تطبيق السمة الداكنة
      const savedTheme = loadSavedTheme(defaultDarkTheme);
      applyThemeToDOM(savedTheme);
    } else {
      document.documentElement.classList.remove("dark");
      // تطبيق السمة الفاتحة
      const savedTheme = loadSavedTheme(defaultLightTheme);
      applyThemeToDOM(savedTheme);
    }
    // حفظ السمة في التخزين المحلي
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // Set document direction and language to Arabic by default
  useEffect(() => {
    // تحديث اتجاه الصفحة للعربية
    document.documentElement.dir = "rtl";
    // تحديث لغة الصفحة
    document.documentElement.lang = "ar";
    // تحديث الفئات لدعم الاتجاه
    document.documentElement.classList.add("rtl");
    document.documentElement.classList.remove("ltr");
  }, []);

  // وظيفة لتبديل السمة
  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === "light" ? "dark" : "light"));
  };

  // تجميع قيمة السياق
  const value = {
    themeMode,
    toggleTheme,
    language: 'ar', // Always Arabic now
  };

  return (
    <AuthProvider>
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    </AuthProvider>
  );
}

// دالة Hook للوصول إلى سياق التطبيق
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("يجب استخدام useAppContext داخل AppProvider");
  }
  return context;
}
