
import { useState } from "react";

export type Report = {
  id: number;
  title: string;
  description: string;
  date: string;
  favorite: boolean;
  category: string | string[];
};

export const useReports = (initialReports: Report[]) => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toggleFavorite = (reportId: number) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId
          ? { ...report, favorite: !report.favorite }
          : report
      )
    );
  };

  const filteredReports = reports.filter((report) => {
    // Filter by category
    const categoryMatch = 
      activeCategory === 'all' || 
      activeCategory === 'favorites' && report.favorite ||
      (Array.isArray(report.category) 
        ? report.category.includes(activeCategory)
        : report.category === activeCategory);
    
    // Filter by search query
    const searchMatch = 
      !searchQuery || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return {
    reports: filteredReports,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    toggleFavorite
  };
};
