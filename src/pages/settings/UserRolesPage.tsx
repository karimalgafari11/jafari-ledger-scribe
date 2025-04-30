
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RolesManagement from "@/components/settings/roles/RolesManagement";
import SecuritySettings from "@/components/settings/security/SecuritySettings";
import { usePermissions } from "@/hooks/usePermissions";

const UserRolesPage = () => {
  const [activeTab, setActiveTab] = useState("roles");
  const { 
    roles, 
    permissionGroups, 
    securitySettings,
    addRole,
    updateRole,
    deleteRole,
    updateSecuritySettings,
    isLoading
  } = usePermissions();

  return (
    <div className="container mx-auto p-6 rtl">
      <h1 className="text-2xl font-bold mb-6">إدارة الصلاحيات والأمان</h1>

      <Tabs defaultValue="roles" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="roles">مجموعات المستخدمين والصلاحيات</TabsTrigger>
          <TabsTrigger value="security">إعدادات الأمان والخصوصية</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles">
          <RolesManagement 
            roles={roles} 
            permissionGroups={permissionGroups}
            onAddRole={addRole}
            onUpdateRole={updateRole}
            onDeleteRole={deleteRole}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="security">
          <SecuritySettings 
            settings={securitySettings}
            onUpdateSettings={updateSecuritySettings}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserRolesPage;
