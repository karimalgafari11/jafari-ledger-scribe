
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, AlertTriangle, AlertCircle, PlugZap } from "lucide-react";

interface ExternalSystem {
  id: string;
  name: string;
  type: string;
  status: string;
}

interface SystemConnectionHealthProps {
  systems: ExternalSystem[];
  healthStatus: {[key: string]: 'healthy' | 'degraded' | 'error'};
}

export const SystemConnectionHealth: React.FC<SystemConnectionHealthProps> = ({ 
  systems, 
  healthStatus 
}) => {
  // حساب عدد الأنظمة حسب حالتها
  const healthyCount = Object.values(healthStatus).filter(status => status === 'healthy').length;
  const degradedCount = Object.values(healthStatus).filter(status => status === 'degraded').length;
  const errorCount = Object.values(healthStatus).filter(status => status === 'error').length;
  
  // الحصول على أيقونة الصحة
  const getHealthIcon = (status: 'healthy' | 'degraded' | 'error') => {
    switch(status) {
      case 'healthy': return <Check className="h-3.5 w-3.5 text-green-600" />;
      case 'degraded': return <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />;
      case 'error': return <AlertCircle className="h-3.5 w-3.5 text-red-600" />;
      default: return <Check className="h-3.5 w-3.5 text-green-600" />;
    }
  };
  
  // الحصول على لون الصحة
  const getHealthColor = (status: 'healthy' | 'degraded' | 'error') => {
    switch(status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'degraded': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlugZap className="h-5 w-5 text-blue-600" />
          صحة الاتصال بالأنظمة
        </CardTitle>
        <CardDescription>
          يتم فحص حالة الاتصال بالأنظمة الخارجية كل 30 ثانية
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">أنظمة صحية</p>
                <p className="text-2xl font-bold text-green-800">{healthyCount}</p>
              </div>
              <div className="p-2 bg-green-200 rounded-full">
                <Check className="h-5 w-5 text-green-700" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">أنظمة متدهورة</p>
                <p className="text-2xl font-bold text-amber-800">{degradedCount}</p>
              </div>
              <div className="p-2 bg-amber-200 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-700" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">أنظمة معطلة</p>
                <p className="text-2xl font-bold text-red-800">{errorCount}</p>
              </div>
              <div className="p-2 bg-red-200 rounded-full">
                <AlertCircle className="h-5 w-5 text-red-700" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">حالة الاتصال بالأنظمة</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    فحص الاتصال
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>تحديث حالة الاتصال بجميع الأنظمة</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="bg-muted/20 rounded-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {systems.map(system => {
                const health = healthStatus[system.id] || 'healthy';
                return (
                  <div 
                    key={system.id}
                    className={`flex items-center justify-between p-3 rounded-md border ${getHealthColor(health)}`}
                  >
                    <div className="flex items-center gap-2">
                      {getHealthIcon(health)}
                      <span className="font-medium">{system.name}</span>
                    </div>
                    <Badge className={health === 'healthy' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                     health === 'degraded' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                                     'bg-red-100 text-red-800 hover:bg-red-200'}>
                      {health === 'healthy' ? 'متصل' : health === 'degraded' ? 'بطيء' : 'غير متصل'}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
