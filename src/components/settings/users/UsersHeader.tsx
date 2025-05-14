
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface UsersHeaderProps {
  onCreateUser: () => void;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ onCreateUser }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
        <p className="text-muted-foreground mt-1">إدارة حسابات المستخدمين والصلاحيات</p>
      </div>
      <Button onClick={onCreateUser} size="sm" className="whitespace-nowrap">
        <UserPlus className="ml-2 h-4 w-4" /> إضافة مستخدم
      </Button>
    </div>
  );
};

export default UsersHeader;
