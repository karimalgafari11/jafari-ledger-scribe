
import React from 'react';
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppProvider>
          <AppWithErrorHandling>
            <RouterProvider router={router} />
            <Toaster />
          </AppWithErrorHandling>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
