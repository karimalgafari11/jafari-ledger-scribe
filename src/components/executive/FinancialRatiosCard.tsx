
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialRatio } from "@/types/financial-analysis";

interface FinancialRatiosCardProps {
  ratios?: FinancialRatio[];
}

export const FinancialRatiosCard: React.FC<FinancialRatiosCardProps> = ({ ratios = [] }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">النسب المالية</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-4">
          <p className="text-muted-foreground">
            سيتم تطوير بطاقة النسب المالية قريباً
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
