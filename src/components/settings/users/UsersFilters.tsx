
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { mockUserRoles } from '@/data/mockPermissions';

interface UsersFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  onResetFilters: () => void;
}

const UsersFilters: React.FC<UsersFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  onResetFilters
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="بحث عن مستخدم..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
      </div>
      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="الدور الوظيفي" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">جميع الأدوار</SelectItem>
          {mockUserRoles.map(role => (
            <SelectItem key={role.id} value={role.id}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="الحالة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">جميع الحالات</SelectItem>
          <SelectItem value="active">نشط</SelectItem>
          <SelectItem value="inactive">غير نشط</SelectItem>
        </SelectContent>
      </Select>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onResetFilters}
        className="min-w-[40px]"
        title="إعادة تعيين الفلاتر"
      >
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UsersFilters;
