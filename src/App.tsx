
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import LoginPage from './pages/auth/LoginPage';
import { Toaster } from 'sonner';
import './App.css';
import { logBackupOperation } from './hooks/backup/backupTestUtils';

function App() {
  // تهيئة النظام عند بدء التطبيق
  useEffect(() => {
    // تسجيل بدء تشغيل النظام
    logBackupOperation('تم بدء تشغيل النظام', { showToast: false });
    
    // يمكن إضافة المزيد من عمليات التهيئة هنا
  }, []);

  // هنا يمكن إضافة منطق التحقق من تسجيل الدخول
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <Index />
            // يمكن استخدام هذا الجزء للتحقق من تسجيل الدخول في تطبيق حقيقي
            // isAuthenticated ? <Index /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
      <Toaster position="top-center" richColors />
    </Router>
  );
}

export default App;
