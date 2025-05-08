
export enum SensitiveDataCategory {
  FINANCIAL = "FINANCIAL",
  CUSTOMER = "CUSTOMER",
  INVENTORY = "INVENTORY",
  SYSTEM = "SYSTEM"
}

export enum VerificationLevel {
  NONE = 0,
  BASIC = 1,
  TWO_FACTOR = 2,
  BIOMETRIC = 3
}

export interface VerificationRequest {
  category: SensitiveDataCategory;
  requiredLevel: VerificationLevel;
  timestamp: Date;
  verified: boolean;
  message: string;
}

export const isSensitiveData = (data: any, category: SensitiveDataCategory): boolean => {
  if (!data) return false;
  
  switch (category) {
    case SensitiveDataCategory.FINANCIAL:
      return data.hasOwnProperty('amount') 
        || data.hasOwnProperty('balance') 
        || data.hasOwnProperty('revenue') 
        || data.hasOwnProperty('profit');
    case SensitiveDataCategory.CUSTOMER:
      return data.hasOwnProperty('email') 
        || data.hasOwnProperty('phone') 
        || data.hasOwnProperty('address') 
        || data.hasOwnProperty('creditCard');
    case SensitiveDataCategory.INVENTORY:
      return data.hasOwnProperty('cost') 
        || data.hasOwnProperty('supplier') 
        || data.hasOwnProperty('margin');
    case SensitiveDataCategory.SYSTEM:
      return data.hasOwnProperty('apiKey') 
        || data.hasOwnProperty('password') 
        || data.hasOwnProperty('secret');
    default:
      return false;
  }
};

export const getRequiredVerificationLevel = (category: SensitiveDataCategory): VerificationLevel => {
  switch (category) {
    case SensitiveDataCategory.FINANCIAL:
      return VerificationLevel.TWO_FACTOR;
    case SensitiveDataCategory.CUSTOMER:
      return VerificationLevel.BASIC;
    case SensitiveDataCategory.INVENTORY:
      return VerificationLevel.BASIC;
    case SensitiveDataCategory.SYSTEM:
      return VerificationLevel.TWO_FACTOR;
    default:
      return VerificationLevel.NONE;
  }
};

export const analyzeMessageForSensitiveRequests = (message: string): SensitiveDataCategory | null => {
  const financialKeywords = ['مال', 'أرباح', 'خسائر', 'رصيد', 'ميزانية', 'قيود', 'محاسبة', 'تقارير مالية'];
  const customerKeywords = ['عميل', 'عملاء', 'زبون', 'زبائن', 'بيانات العملاء', 'معلومات العملاء'];
  const inventoryKeywords = ['مخزون', 'بضاعة', 'سعر التكلفة', 'قيمة المخزون'];
  const systemKeywords = ['كلمة سر', 'كلمة المرور', 'API', 'مفتاح', 'إعدادات النظام', 'صلاحيات'];
  
  if (financialKeywords.some(keyword => message.includes(keyword))) {
    return SensitiveDataCategory.FINANCIAL;
  } else if (customerKeywords.some(keyword => message.includes(keyword))) {
    return SensitiveDataCategory.CUSTOMER;
  } else if (inventoryKeywords.some(keyword => message.includes(keyword))) {
    return SensitiveDataCategory.INVENTORY;
  } else if (systemKeywords.some(keyword => message.includes(keyword))) {
    return SensitiveDataCategory.SYSTEM;
  }
  
  return null;
};
