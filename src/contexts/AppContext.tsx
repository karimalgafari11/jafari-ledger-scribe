
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { defaultDarkTheme, defaultLightTheme } from "@/hooks/theme/themeDefaults";
import { applyThemeToDOM } from "@/hooks/theme/themeUtils";
import { ThemeSettings } from "@/types/theme";
import { loadSavedTheme } from "@/hooks/theme/themeUtils";

// تعريف نوع اللغة
export type Language = "ar" | "en";

// تعريف نوع السمة
export type ThemeMode = "light" | "dark";

// تعريف نوع سياق التطبيق
interface AppContextType {
  themeMode: ThemeMode;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
}

// إنشاء سياق التطبيق مع قيم افتراضية
export const AppContext = createContext<AppContextType>({
  themeMode: "light",
  language: "ar",
  toggleTheme: () => {},
  setLanguage: () => {},
});

// مزود سياق التطبيق
export function AppProvider({ children }: { children: ReactNode }) {
  // حالة السمة
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // محاولة استرداد الوضع المخزن محليًا
    const savedTheme = localStorage.getItem("themeMode") as ThemeMode;
    return savedTheme || "light";
  });

  // حالة اللغة
  const [language, setLanguage] = useState<Language>(() => {
    // محاولة استرداد اللغة المخزنة محليًا
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "ar";
  });

  // حالة للتحكم في إعادة التحميل
  const [shouldReload, setShouldReload] = useState(false);

  // Apply theme immediately on startup
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
      // Apply dark theme
      const savedTheme = loadSavedTheme(defaultDarkTheme);
      applyThemeToDOM(savedTheme);
    } else {
      document.documentElement.classList.remove("dark");
      // Apply light theme
      const savedTheme = loadSavedTheme(defaultLightTheme);
      applyThemeToDOM(savedTheme);
    }
    // حفظ السمة في التخزين المحلي
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // تأثير لتطبيق اللغة عند تغييرها
  useEffect(() => {
    // تحديث اتجاه الصفحة بناءً على اللغة
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    // تحديث لغة الصفحة
    document.documentElement.lang = language;
    // حفظ اللغة في التخزين المحلي
    localStorage.setItem("language", language);
    
    // منع إعادة التحميل عند التحميل الأولي للتطبيق
    const isFirstLoad = sessionStorage.getItem("initialLanguageLoad") !== "true";
    if (isFirstLoad) {
      sessionStorage.setItem("initialLanguageLoad", "true");
    } else if (!shouldReload && language) {
      // نعلم النظام أننا نريد إعادة تحميل الصفحة مرة واحدة فقط
      setShouldReload(true);
    }
  }, [language, shouldReload]);

  // إعادة تحميل الصفحة مرة واحدة فقط عندما نكون جاهزين
  useEffect(() => {
    if (shouldReload) {
      const timer = setTimeout(() => {
        // نستخدم setTimeout لضمان اكتمال تطبيق التغييرات قبل إعادة التحميل
        window.location.reload();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldReload]);

  // وظيفة لتبديل السمة
  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === "light" ? "dark" : "light"));
  };

  // تجميع قيمة السياق
  const value = {
    themeMode,
    language,
    toggleTheme,
    setLanguage: (lang: Language) => {
      if (lang !== language) {
        setLanguage(lang);
        // عند تغيير اللغة، نضبط حالة إعادة التحميل
        setShouldReload(false);
      }
    },
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
