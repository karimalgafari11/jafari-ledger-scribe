
import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockUsers } from '@/data/mockSettings';

const UsersPage = () => {
  return (
    <div className="container mx-auto p-6 rtl">
      <h1 className="text-2xl font-bold mb-6">إدارة المستخدمين</h1>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المستخدم</TableHead>
              <TableHead>الاسم الكامل</TableHead>
              <TableHead>الصلاحية</TableHead>
              <TableHead>الفرع</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead>آخر دخول</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.branch}</TableCell>
                <TableCell dir="ltr">{user.email}</TableCell>
                <TableCell dir="ltr">{user.phone}</TableCell>
                <TableCell>
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('ar-SA') : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default UsersPage;
