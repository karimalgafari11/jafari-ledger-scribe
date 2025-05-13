
import { useState, useEffect } from "react";
import { Report } from "@/types/custom-reports"; // Import from custom-reports instead of declaring a duplicate type

export const useReports = (initialReports: Report[]) => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter reports based on search query and active category
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || 
      activeCategory === 'favorites' && report.favorite ||
      (Array.isArray(report.category) 
        ? report.category.includes(activeCategory)
        : report.category === activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setReports(reports.map((report) => {
      if (report.id === id) {
        return { ...report, favorite: !report.favorite };
      }
      return report;
    }));
  };

  return {
    reports: filteredReports,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    toggleFavorite,
  };
};
