
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
  | 'hideFilters'
  | 'salesStats'
  | 'salesStatistics'
  | 'overview'
  | 'products'
  | 'customers'
  | 'sales'
  | 'totalSales'
  | 'transactions'
  | 'averageOrder'
  | 'netProfit'
  | 'exportPdf'
  | 'exportExcel'
  | 'exportCsv'
  | 'period'
  | 'branch'
  | 'salesPerformance'
  // Account-related translations
  | 'login'
  | 'register'
  | 'email'
  | 'password'
  | 'rememberMe'
  | 'forgotPassword'
  | 'createAccount'
  | 'accountSystem'
  | 'loginButton'
  | 'invalidCredentials'
  | 'errorOccurred'
  | 'dontHaveAccount'
  | 'haveAccount'
  | 'resetPassword'
  | 'updatePassword'
  | 'newPassword'
  | 'confirmPassword'
  | 'passwordsNotMatch'
  | 'backToLogin'
  | 'registerNow'
  // General UI elements
  | 'save'
  | 'cancel'
  | 'delete'
  | 'edit'
  | 'search'
  | 'filter'
  | 'add'
  | 'remove'
  | 'confirm'
  | 'back'
  | 'next'
  | 'submit'
  | 'loading'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'noData'
  | 'noResults'
  | 'required'
  | 'optional'
  // Time related
  | 'today'
  | 'yesterday'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'custom'
  | 'from'
  | 'to'
  | 'date'
  // Sidebar sections
  | 'accounting'
  | 'inventory'
  | 'purchases'
  | 'expenses'
  | 'payables'
  | 'receivables'
  // New HR related translations
  | 'hr'
  | 'employees'
  | 'positions'
  | 'attendance'
  | 'salaries'
  | 'vacations'
  | 'employeeRecord'
  | 'department'
  | 'active'
  | 'inactive'
  | 'actions';

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
    hideFilters: 'إخفاء الفلاتر',
    salesStats: 'إحصائيات المبيعات',
    salesStatistics: 'إحصائيات ومؤشرات المبيعات',
    overview: 'نظرة عامة',
    sales: 'المبيعات',
    totalSales: 'إجمالي المبيعات',
    transactions: 'عدد المعاملات',
    averageOrder: 'متوسط قيمة الطلب',
    netProfit: 'صافي الأرباح',
    exportPdf: 'تصدير PDF',
    exportExcel: 'تصدير Excel',
    exportCsv: 'تصدير البيانات',
    period: 'الفترة',
    branch: 'الفرع',
    salesPerformance: 'أداء المبيعات والإيرادات',
    // Account-related translations
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    createAccount: 'إنشاء حساب جديد',
    accountSystem: 'نظام إدارة الحسابات المتكامل',
    loginButton: 'تسجيل الدخول',
    invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    errorOccurred: 'حدث خطأ أثناء تسجيل الدخول',
    dontHaveAccount: 'ليس لديك حساب؟',
    haveAccount: 'لديك حساب بالفعل؟',
    resetPassword: 'إعادة تعيين كلمة المرور',
    updatePassword: 'تحديث كلمة المرور',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    passwordsNotMatch: 'كلمات المرور غير متطابقة',
    backToLogin: 'العودة إلى تسجيل الدخول',
    registerNow: 'التسجيل الآن',
    // General UI elements
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    search: 'بحث',
    filter: 'تصنيف',
    add: 'إضافة',
    remove: 'إزالة',
    confirm: 'تأكيد',
    back: 'رجوع',
    next: 'التالي',
    submit: 'إرسال',
    loading: 'جاري التحميل...',
    success: 'تم بنجاح',
    error: 'خطأ',
    warning: 'تحذير',
    info: 'معلومات',
    noData: 'لا توجد بيانات',
    noResults: 'لا توجد نتائج',
    required: 'مطلوب',
    optional: 'اختياري',
    // Time related
    today: 'اليوم',
    yesterday: 'الأمس',
    thisWeek: 'هذا الأسبوع',
    lastWeek: 'الأسبوع الماضي',
    thisMonth: 'هذا الشهر',
    lastMonth: 'الشهر الماضي',
    thisYear: 'هذا العام',
    custom: 'مخصص',
    from: 'من',
    to: 'إلى',
    date: 'التاريخ',
    // Sidebar sections
    accounting: 'المحاسبة',
    inventory: 'المخزون',
    purchases: 'المشتريات',
    expenses: 'المصروفات',
    payables: 'الذمم الدائنة',
    receivables: 'الذمم المدينة',
    // HR related translations
    hr: 'الموارد البشرية',
    employees: 'الموظفين',
    positions: 'الوظائف',
    attendance: 'الحضور والانصراف',
    salaries: 'الرواتب',
    vacations: 'الإجازات',
    employeeRecord: 'سجل الموظف',
    department: 'القسم',
    active: 'نشط',
    inactive: 'غير نشط',
    actions: 'الإجراءات'
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
    hideFilters: 'Hide Filters',
    salesStats: 'Sales Statistics',
    salesStatistics: 'Sales Statistics & Metrics',
    overview: 'Overview',
    sales: 'Sales',
    totalSales: 'Total Sales',
    transactions: 'Transactions',
    averageOrder: 'Average Order',
    netProfit: 'Net Profit',
    exportPdf: 'Export PDF',
    exportExcel: 'Export Excel',
    exportCsv: 'Export Data',
    period: 'Period',
    branch: 'Branch',
    salesPerformance: 'Sales & Revenue Performance',
    // Account-related translations
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password?',
    createAccount: 'Create New Account',
    accountSystem: 'Integrated Accounting Management System',
    loginButton: 'Login',
    invalidCredentials: 'Email or password is incorrect',
    errorOccurred: 'An error occurred during login',
    dontHaveAccount: 'Don\'t have an account?',
    haveAccount: 'Already have an account?',
    resetPassword: 'Reset Password',
    updatePassword: 'Update Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    passwordsNotMatch: 'Passwords do not match',
    backToLogin: 'Back to Login',
    registerNow: 'Register Now',
    // General UI elements
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Category',
    add: 'Add',
    remove: 'Remove',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info',
    noData: 'No data available',
    noResults: 'No results found',
    required: 'Required',
    optional: 'Optional',
    // Time related
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    lastWeek: 'Last Week',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    thisYear: 'This Year',
    custom: 'Custom',
    from: 'From',
    to: 'To',
    date: 'Date',
    // Sidebar sections
    accounting: 'Accounting',
    inventory: 'Inventory',
    purchases: 'Purchases',
    expenses: 'Expenses',
    payables: 'Payables',
    receivables: 'Receivables',
    // HR related translations
    hr: 'HR',
    employees: 'Employees',
    positions: 'Positions',
    attendance: 'Attendance',
    salaries: 'Salaries',
    vacations: 'Vacations',
    employeeRecord: 'Employee Record',
    department: 'Department',
    active: 'Active',
    inactive: 'Inactive',
    actions: 'Actions'
  }
};

export const useTranslation = (lang: Language) => {
  return (key: TranslationKey): string => {
    return translations[lang][key];
  };
};
