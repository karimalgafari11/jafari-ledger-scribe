
import { useState, useEffect } from "react";

export interface Report {
  id: string;
  title: string;
  name?: string; // Add this to make it compatible with both naming conventions
  description: string;
  date: string;
  category: string | string[];
  favorite: boolean;
  author?: string;
  type?: string | string[];
  createdAt?: Date;
  lastRun?: Date;
}

export const useReports = (initialReports: Report[]) => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter reports based on search query and active category
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
