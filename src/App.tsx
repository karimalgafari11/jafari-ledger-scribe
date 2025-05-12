
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { appRoutes } from './routes';
import { Toaster } from './components/ui/sonner';
import { AppWithErrorHandling } from './AppWithErrorHandling';

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
        <AppWithErrorHandling>
          <Router>
            <Routes>
              {appRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children?.map((childRoute, childIndex) => (
                    <Route
                      key={`${index}-${childIndex}`}
                      path={childRoute.path}
                      element={childRoute.element}
                      index={childRoute.index}
                    />
                  ))}
                </Route>
              ))}
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>
          </Router>
        </AppWithErrorHandling>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
