
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useRoutes } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { appRoutes } from "./routes";
import { AppProvider } from "./contexts/AppContext";

// Create a client
const queryClient = new QueryClient();

// Router component using the route configuration
const AppRoutes = () => {
  const routes = useRoutes(appRoutes);
  return routes;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
          <AppRoutes />
          <Toaster position="top-center" closeButton richColors />
        </Router>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
