
// أنواع بيانات الصلاحيات والأمان

export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
  isSystem: boolean;
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  category: PermissionCategory;
  description: string;
}

export type PermissionCategory = 
  | 'accounting'
  | 'inventory'
  | 'sales'
  | 'purchases'
  | 'customers'
  | 'suppliers'
  | 'expenses'
  | 'reports'
  | 'settings'
  | 'admin';

export interface UserPermissions {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
  canExport: boolean;
  canImport: boolean;
}

export interface PermissionGroup {
  category: PermissionCategory;
  permissions: Permission[];
}

export interface UserActivity {
  id: string;
  userId: string;
  username: string;
  action: ActivityAction;
  module: string;
  details: string;
  timestamp: Date;
  ipAddress: string;
  status: 'success' | 'failed' | 'warning' | 'info';
  metadata?: Record<string, any>;
}

export type ActivityAction = 
  | 'login'
  | 'logout'
  | 'create'
  | 'update'
  | 'delete'
  | 'view'
  | 'export'
  | 'import'
  | 'approve'
  | 'reject'
  | 'backup'
  | 'restore'
  | 'system';

export interface SecuritySettings {
  id: string;
  passwordPolicy: PasswordPolicy;
  loginSettings: LoginSettings;
  dataAccessControls: DataAccessControls;
  encryptionSettings: EncryptionSettings;
  updatedAt: Date;
  updatedBy: string;
}

export interface PasswordPolicy {
  minimumLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  passwordExpiryDays: number;
  preventPasswordReuse: number;
  lockoutThreshold: number;
  lockoutDurationMinutes: number;
}

export interface LoginSettings {
  maxFailedAttempts: number;
  lockoutDurationMinutes: number;
  requireTwoFactor: boolean;
  sessionTimeoutMinutes: number;
  allowMultipleSessions: boolean;
  allowRememberMe: boolean;
}

export interface DataAccessControls {
  restrictBranchAccess: boolean;
  restrictDataByDate: boolean;
  restrictedDateRangeDays: number;
  hideFinancialFigures: boolean;
  restrictExports: boolean;
  auditAllChanges: boolean;
}

export interface EncryptionSettings {
  encryptionEnabled: boolean;
  encryptionType: 'standard' | 'advanced';
  keyRotationDays: number;
  lastKeyRotation?: Date;
}

export interface PermissionMatrix {
  [roleId: string]: {
    [moduleCode: string]: UserPermissions;
  };
}
