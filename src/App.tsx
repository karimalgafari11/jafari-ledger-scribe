import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          
          {/* Inventory Routes */}
          <Route path="/inventory/products" element={<NotFound />} />
          <Route path="/inventory/movements" element={<NotFound />} />
          <Route path="/inventory/counting" element={<NotFound />} />
          <Route path="/inventory/reorder" element={<NotFound />} />
          
          {/* Expenses Routes */}
          <Route path="/expenses/new" element={<NotFound />} />
          <Route path="/expenses/categories" element={<NotFound />} />
          <Route path="/expenses/reports" element={<NotFound />} />
          
          {/* Invoices Routes */}
          <Route path="/invoices/outgoing" element={<NotFound />} />
          <Route path="/invoices/quotes" element={<NotFound />} />
          <Route path="/invoices/sales-orders" element={<NotFound />} />
          <Route path="/invoices/returns" element={<NotFound />} />
          
          {/* Inventory Control Routes */}
          <Route path="/inventory-control/transfer" element={<NotFound />} />
          <Route path="/inventory-control/locations" element={<NotFound />} />
          <Route path="/inventory-control/damaged" element={<NotFound />} />
          
          {/* Accounting Routes */}
          <Route path="/accounting/chart" element={<NotFound />} />
          <Route path="/accounting/journals" element={<NotFound />} />
          <Route path="/accounting/cost-centers" element={<NotFound />} />
          <Route path="/accounting/settings" element={<NotFound />} />
          
          {/* Customer Routes */}
          <Route path="/customers/manage" element={<NotFound />} />
          <Route path="/customers/statement" element={<NotFound />} />
          
          {/* Settings Routes */}
          <Route path="/settings/system" element={<NotFound />} />
          <Route path="/settings/branch" element={<NotFound />} />
          <Route path="/settings/users" element={<NotFound />} />
          <Route path="/settings/backup" element={<NotFound />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
