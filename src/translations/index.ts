
import { Language } from "@/contexts/AppContext";

type TranslationKey = 
  | 'dashboard'
  | 'invoices'
  | 'customers'
  | 'products'
  | 'reports'
  | 'settings'
  | 'logout'
  | 'darkMode'
  | 'lightMode'
  | 'language'
  | 'welcome'
  | 'salesInvoices'
  | 'purchaseInvoices'
  | 'systemSettings'
  | 'filterResults'
  | 'showFilters'
  | 'hideFilters';

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

export const translations: Translations = {
  ar: {
    dashboard: 'لوحة التحكم',
    invoices: 'الفواتير',
    customers: 'العملاء',
    products: 'المنتجات',
    reports: 'التقارير',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    darkMode: 'الوضع الليلي',
    lightMode: 'الوضع النهاري',
    language: 'اللغة',
    welcome: 'مرحبًا بك في نظام الجعفري للمحاسبة',
    salesInvoices: 'فواتير المبيعات',
    purchaseInvoices: 'فواتير المشتريات',
    systemSettings: 'إعدادات النظام',
    filterResults: 'تصفية النتائج',
    showFilters: 'عرض الفلاتر',
    hideFilters: 'إخفاء الفلاتر'
  },
  en: {
    dashboard: 'Dashboard',
    invoices: 'Invoices',
    customers: 'Customers',
    products: 'Products',
    reports: 'Reports',
    settings: 'Settings',
    logout: 'Logout',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    welcome: 'Welcome to Al-Jaafari Accounting System',
    salesInvoices: 'Sales Invoices',
    purchaseInvoices: 'Purchase Invoices',
    systemSettings: 'System Settings',
    filterResults: 'Filter Results',
    showFilters: 'Show Filters',
    hideFilters: 'Hide Filters'
  }
};

export const useTranslation = (lang: Language) => {
  return (key: TranslationKey): string => {
    return translations[lang][key];
  };
};
