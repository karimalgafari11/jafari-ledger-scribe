
import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockBranches } from '@/data/mockSettings';

const BranchesPage = () => {
  return (
    <div className="container mx-auto p-6 rtl">
      <h1 className="text-2xl font-bold mb-6">إدارة الفروع</h1>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم الفرع</TableHead>
              <TableHead>الرمز</TableHead>
              <TableHead>العنوان</TableHead>
              <TableHead>مدير الفرع</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBranches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.code}</TableCell>
                <TableCell>{branch.address}</TableCell>
                <TableCell>{branch.manager}</TableCell>
                <TableCell dir="ltr">{branch.phone}</TableCell>
                <TableCell dir="ltr">{branch.email}</TableCell>
                <TableCell>{branch.isActive ? "نشط" : "غير نشط"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default BranchesPage;
