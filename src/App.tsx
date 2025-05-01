
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import { Toaster } from 'sonner';
import NotFound from '@/pages/NotFound';
import ReportsPage from '@/pages/Reports';
import InvoicesPage from '@/pages/invoices/InvoicesPage';
import SalesOrdersPage from '@/pages/invoices/SalesOrdersPage';
import SalesInvoicePage from '@/pages/invoices/SalesInvoicePage';
import DiscountsPage from '@/pages/definitions/DiscountsPage';
import { SidebarProvider } from '@/components/ui/sidebar';

function App() {
  return (
    <Router>
      <div className="App h-screen w-full">
        <Toaster position="top-center" richColors />
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/invoices/outgoing" element={<InvoicesPage />} />
            <Route path="/invoices/new" element={<SalesInvoicePage />} />
            <Route path="/invoices/orders" element={<SalesOrdersPage />} />
            <Route path="/definitions/discounts" element={<DiscountsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </div>
    </Router>
  );
}

export default App;
