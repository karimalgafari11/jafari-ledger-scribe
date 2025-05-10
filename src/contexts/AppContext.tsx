import React, { createContext, useState, ReactNode } from "react";
import { AuthProvider } from "./AuthContext";

interface AppContextType {
  // هنا يمكنك إضافة أي متغيرات حالة عامة تحتاجها التطبيق
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // هنا يمكنك إضافة أي منطق خاص بالتطبيق

  return (
    <AuthProvider>
      <AppContext.Provider value={{}}>
        {children}
      </AppContext.Provider>
    </AuthProvider>
  );
}
