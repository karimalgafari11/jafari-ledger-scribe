
import React, { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { AppWithErrorHandling } from './AppWithErrorHandling';
import { AppProvider } from './contexts/AppContext';

// Initialize query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Loading component with better visual feedback
const LoadingFallback = () => {
  // Get current language from localStorage to show appropriate loading message
  const language = localStorage.getItem('language') || 'ar';
  const loadingText = language === 'ar' ? 'جاري التحميل...' : 'Loading...';
  
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
        <div className="animate-pulse text-xl font-medium">{loadingText}</div>
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppProvider>
          <AppWithErrorHandling>
            <Suspense fallback={<LoadingFallback />}>
              <div className="app-wrapper animate-in fade-in-50 duration-300">
                <RouterProvider router={router} />
                <Toaster />
              </div>
            </Suspense>
          </AppWithErrorHandling>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
