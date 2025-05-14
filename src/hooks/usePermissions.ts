import { useState } from 'react';
import { 
  UserRole,
  Permission,
  PermissionGroup,
  UserPermissions,
  SecuritySettings
} from '@/types/permissions';
import { 
  mockUserRoles, 
  mockPermissions, 
  permissionGroups,
  mockPermissionMatrix,
  mockSecuritySettings
} from '@/data/mockPermissions';
import { toast } from 'sonner';

// Define the type for security settings form
type SecuritySettingsUpdate = {
  passwordPolicy: {
    minimumLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    passwordExpiryDays: number;
    preventPasswordReuse: number;
    lockoutThreshold: number;
    lockoutDurationMinutes: number;
  };
  loginSettings: {
    maxFailedAttempts: number;
    lockoutDurationMinutes: number;
    requireTwoFactor: boolean;
    sessionTimeoutMinutes: number;
    allowMultipleSessions: boolean;
    allowRememberMe: boolean;
  };
  dataAccessControls: {
    restrictBranchAccess: boolean;
    restrictDataByDate: boolean;
    restrictedDateRangeDays: number;
    hideFinancialFigures: boolean;
    restrictExports: boolean;
    auditAllChanges: boolean;
  };
  encryptionSettings: {
    encryptionEnabled: boolean;
    encryptionType: 'standard' | 'advanced';
    keyRotationDays: number;
  };
};

export function usePermissions() {
  // Transform mockUserRoles to include the required properties for UserRole type
  const initialUserRoles = mockUserRoles.map(role => ({
    ...role,
    permissions: mockPermissions.filter(p => 
      role.permissions.includes(p.id) || role.permissions.includes('all')
    ),
    createdAt: new Date(),
    updatedAt: new Date(),
    isSystem: role.id === 'admin' // Mark admin as system role
  }));

  const [roles, setRoles] = useState<UserRole[]>(initialUserRoles);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  // Cast permissionGroups to make it compatible with PermissionGroup[] type
  const [groups] = useState<PermissionGroup[]>(permissionGroups as unknown as PermissionGroup[]);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(mockSecuritySettings);
  const [isLoading, setIsLoading] = useState(false);
  
  // التحقق من صلاحية معينة
  const checkPermission = (
    roleId: string, 
    permissionCode: string
  ): boolean => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return false;
    
    return role.permissions.some(p => p.code === permissionCode);
  };
  
  // التحقق من الصلاحيات على وحدة معينة
  const checkModulePermissions = (
    roleId: string,
    moduleCode: string
  ): UserPermissions | null => {
    if (mockPermissionMatrix[roleId] && mockPermissionMatrix[roleId][moduleCode]) {
      return mockPermissionMatrix[roleId][moduleCode];
    }
    return null;
  };
  
  // إضافة دور جديد
  const addRole = async (roleData: Omit<UserRole, 'id' | 'createdAt' | 'updatedAt' | 'isSystem'>) => {
    setIsLoading(true);
    
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newRole: UserRole = {
        ...roleData,
        id: `role-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        isSystem: false
      };
      
      setRoles(prevRoles => [...prevRoles, newRole]);
      toast.success('تم إنشاء مجموعة المستخدمين بنجاح');
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء إنشاء مجموعة المستخدمين');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // تعديل دور
  const updateRole = async (roleId: string, roleData: Partial<UserRole>) => {
    setIsLoading(true);
    
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setRoles(prevRoles => prevRoles.map(role => 
        role.id === roleId 
          ? { ...role, ...roleData, updatedAt: new Date() } 
          : role
      ));
      
      toast.success('تم تحديث مجموعة المستخدمين بنجاح');
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث مجموعة المستخدمين');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // حذف دور
  const deleteRole = async (roleId: string) => {
    setIsLoading(true);
    
    try {
      // التحقق من أنه ليس دورًا نظاميًا
      const role = roles.find(r => r.id === roleId);
      if (role?.isSystem) {
        toast.error('لا يمكن حذف مجموعات المستخدمين النظامية');
        return false;
      }
      
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));
      toast.success('تم حذف مجموعة المستخدمين بنجاح');
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء حذف مجموعة المستخدمين');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // تحديث إعدادات الأمان
  const updateSecuritySettings = async (settings: SecuritySettingsUpdate) => {
    setIsLoading(true);
    
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSecuritySettings(prev => ({
        ...prev,
        ...settings,
        updatedAt: new Date(),
        // Preserve the lastKeyRotation field
        encryptionSettings: {
          ...settings.encryptionSettings,
          lastKeyRotation: prev.encryptionSettings.lastKeyRotation
        }
      }));
      
      toast.success('تم تحديث إعدادات الأمان بنجاح');
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث إعدادات الأمان');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    roles,
    permissions,
    permissionGroups: groups,
    securitySettings,
    isLoading,
    checkPermission,
    checkModulePermissions,
    addRole,
    updateRole,
    deleteRole,
    updateSecuritySettings
  };
}
