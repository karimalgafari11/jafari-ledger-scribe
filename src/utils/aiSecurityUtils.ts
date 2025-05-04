
import { Permission, PermissionCategory } from "@/types/permissions";
import { User } from "@/types/settings";
import { JournalEntry } from "@/types/journal";
import { Product } from "@/types/inventory";
import { Expense } from "@/types/expenses";
import { Customer } from "@/types/customers";

// Define sensitive data categories that require verification
export enum SensitiveDataCategory {
  FINANCIAL = "financial",
  CUSTOMER = "customer",
  INVENTORY = "inventory",
  SYSTEM = "system",
}

// Define verification levels
export enum VerificationLevel {
  NONE = 0,
  BASIC = 1,
  TWO_FACTOR = 2,
  BIOMETRIC = 3,
}

// Interface for verification request
export interface VerificationRequest {
  category: SensitiveDataCategory;
  requiredLevel: VerificationLevel;
  timestamp: Date;
  verified: boolean;
  message: string;
}

// Determine if data is sensitive based on type
export function isSensitiveData(data: any, category?: SensitiveDataCategory): boolean {
  // Financial data checks
  if ((category === SensitiveDataCategory.FINANCIAL || !category) && 
      (data instanceof JournalEntry || 
       (typeof data === 'object' && data && 
        ('balance' in data || 'amount' in data || 'totalDebit' in data || 'totalCredit' in data)))) {
    return true;
  }
  
  // Customer data checks
  if ((category === SensitiveDataCategory.CUSTOMER || !category) && 
      (data instanceof Customer || 
       (typeof data === 'object' && data && 
        ('customerInfo' in data || 'contactInfo' in data || 'creditLimit' in data)))) {
    return true;
  }
  
  // Inventory checks for sensitive products
  if ((category === SensitiveDataCategory.INVENTORY || !category) && 
      (data instanceof Product && data.costPrice && data.quantity)) {
    return true;
  }
  
  // System settings checks
  if ((category === SensitiveDataCategory.SYSTEM || !category) && 
      (typeof data === 'object' && data && 
       ('apiKey' in data || 'password' in data || 'secret' in data || 'token' in data))) {
    return true;
  }
  
  return false;
}

// Get required verification level based on data category
export function getRequiredVerificationLevel(category: SensitiveDataCategory): VerificationLevel {
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
}

// Check if user has required permission for the data category
export function hasRequiredPermission(
  userPermissions: Permission[], 
  category: SensitiveDataCategory
): boolean {
  const requiredCategory: PermissionCategory = 
    category === SensitiveDataCategory.FINANCIAL ? 'accounting' :
    category === SensitiveDataCategory.CUSTOMER ? 'customers' :
    category === SensitiveDataCategory.INVENTORY ? 'inventory' : 'admin';
    
  return userPermissions.some(permission => 
    permission.category === requiredCategory && 
    permission.code.includes('view')
  );
}
