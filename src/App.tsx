
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { AppWithErrorHandling } from './AppWithErrorHandling';
import { AppProvider } from './contexts/AppContext';

// تهيئة عميل الاستعلام
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 دقائق
    },
  },
});

// مكون المؤقت للتحميل
const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <div className="animate-pulse text-xl">جاري التحميل...</div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppProvider>
          <AppWithErrorHandling>
            <Suspense fallback={<LoadingFallback />}>
              <RouterProvider router={router} />
              <Toaster />
            </Suspense>
          </AppWithErrorHandling>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
