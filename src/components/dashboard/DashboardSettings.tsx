
import React from "react";
import { Settings2, Users, Database, Bell, Shield, CloudCog, BarChart3, Building2, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import { SettingsContent } from "./settings/SettingsContent";
import { useDashboardSettings } from "@/hooks/useDashboardSettings";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface DashboardSettingsProps {
  displayOptions: DisplayOptions;
  onDisplayOptionsChange: (options: DisplayOptions) => void;
  shortcuts: ShortcutItem[];
  onShortcutsChange: (shortcuts: ShortcutItem[]) => void;
  onOpenSystemSettings?: () => void;
  onOpenAiSettings?: () => void;
}

export const DashboardSettings: React.FC<DashboardSettingsProps> = ({ 
  displayOptions, 
  onDisplayOptionsChange,
  shortcuts,
  onShortcutsChange,
  onOpenSystemSettings,
  onOpenAiSettings
}) => {
  const navigate = useNavigate();
  
  const {
    isMobile,
    handleDisplayOptionChange,
    handleShortcutToggle,
    handleDeleteShortcut,
    handleDragEnd,
    handleAddShortcut,
    handleSaveSettings
  } = useDashboardSettings({
    initialDisplayOptions: displayOptions,
    initialShortcuts: shortcuts,
    onDisplayOptionsChange,
    onShortcutsChange
  });
  
  const settingsContentProps = {
    displayOptions,
    shortcuts,
    onDisplayOptionChange: handleDisplayOptionChange,
    onShortcutToggle: handleShortcutToggle,
    onDeleteShortcut: handleDeleteShortcut,
    onDragEnd: handleDragEnd,
    onAddShortcut: handleAddShortcut
  };
  
  // التنقل إلى صفحات الإعدادات
  const navigateToSettings = (path: string) => {
    navigate(path);
  };
  
  // قائمة خيارات الإعدادات المتقدمة
  const settingsOptions = [
    {
      title: "إعدادات النظام",
      icon: <Settings2 className="h-4 w-4 mr-2" />,
      description: "إعدادات النظام الأساسية",
      path: "/settings/system",
      onClick: onOpenSystemSettings || (() => navigateToSettings("/settings/system"))
    },
    {
      title: "المستخدمين والصلاحيات",
      icon: <Users className="h-4 w-4 mr-2" />,
      description: "إدارة المستخدمين والصلاحيات",
      path: "/settings/users",
      onClick: () => navigateToSettings("/settings/users")
    },
    {
      title: "الفروع",
      icon: <Building2 className="h-4 w-4 mr-2" />,
      description: "إدارة فروع المؤسسة",
      path: "/settings/branches",
      onClick: () => navigateToSettings("/settings/branches")
    },
    {
      title: "الإشعارات",
      icon: <Bell className="h-4 w-4 mr-2" />,
      description: "إعدادات الإشعارات",
      path: "/settings/notification-settings",
      onClick: () => navigateToSettings("/settings/notification-settings")
    },
    {
      title: "محرك الذكاء الاصطناعي",
      icon: <CloudCog className="h-4 w-4 mr-2" />,
      description: "إعدادات الذكاء الاصطناعي",
      path: "/settings/ai-engine",
      onClick: onOpenAiSettings || (() => navigateToSettings("/settings/ai-engine"))
    },
    {
      title: "النسخ الاحتياطي",
      icon: <Database className="h-4 w-4 mr-2" />,
      description: "إعدادات النسخ الاحتياطي",
      path: "/settings/backup",
      onClick: () => navigateToSettings("/settings/backup")
    },
    {
      title: "الأمان",
      icon: <Shield className="h-4 w-4 mr-2" />,
      description: "إعدادات الأمان والخصوصية",
      path: "/settings/security",
      onClick: () => navigateToSettings("/settings/roles")
    },
    {
      title: "إدارة الصفحات",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
      description: "تخصيص وإدارة صفحات النظام",
      path: "/settings/page-management",
      onClick: () => navigateToSettings("/settings/page-management")
    },
    {
      title: "الربط مع الأنظمة الخارجية",
      icon: <Globe className="h-4 w-4 mr-2" />,
      description: "إعدادات الربط مع الأنظمة الخارجية",
      path: "/settings/integrations",
      onClick: () => navigateToSettings("/settings/integrations")
    }
  ];
  
  // الإعدادات المحلية للوحة التحكم (السريعة)
  const quickSettingsOptions = [
    {
      title: "إعدادات لوحة التحكم",
      icon: <Settings2 className="h-4 w-4 mr-2" />,
      description: "تخصيص عناصر لوحة التحكم"
    }
  ];
  
  // Ensure we're using a boolean value for the conditional rendering
  const showMobileView = isMobile === true;
  
  const SettingsButton = () => (
    <Button 
      variant="outline" 
      size="icon" 
      className="relative group overflow-hidden"
    >
      <Settings2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:rotate-45 transform" />
      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </Button>
  );
  
  // عرض قائمة منسدلة للإعدادات السريعة
  const SettingsPopover = () => (
    <Popover>
      <PopoverTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="relative group overflow-hidden"
              >
                <Settings2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:rotate-45 transform" />
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-sm font-medium">إعدادات النظام</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h4 className="font-medium text-lg">إعدادات النظام</h4>
          <p className="text-sm text-gray-500">إدارة وتخصيص إعدادات النظام</p>
        </div>
        
        <div className="p-2">
          {quickSettingsOptions.map((option, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-right flex items-center p-2 hover:bg-gray-100 rounded-md"
                >
                  {option.icon}
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{option.title}</span>
                    <span className="text-xs text-gray-500">{option.description}</span>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>إعدادات لوحة التحكم</DialogTitle>
                  <DialogDescription>
                    تخصيص لوحة التحكم وإدارة الاختصارات
                  </DialogDescription>
                </DialogHeader>
                <SettingsContent {...settingsContentProps} />
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={handleSaveSettings} 
                    className="relative overflow-hidden group"
                  >
                    <span className="relative z-10">حفظ الإعدادات</span>
                    <span className="absolute inset-0 bg-primary/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        
        <Separator />
        
        <div className="p-2">
          <h5 className="text-xs text-gray-500 p-2">إعدادات النظام</h5>
          {settingsOptions.map((option, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={option.onClick}
              className="w-full justify-start text-right flex items-center p-2 hover:bg-gray-100 rounded-md"
            >
              {option.icon}
              <div className="flex flex-col items-start">
                <span className="font-medium">{option.title}</span>
                <span className="text-xs text-gray-500">{option.description}</span>
              </div>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
  
  return showMobileView ? (
    <Drawer>
      <DrawerTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="relative group">
                <Settings2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-sm font-medium">إعدادات لوحة التحكم</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DrawerTrigger>
      <DrawerContent className="p-6">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">إعدادات لوحة التحكم</h2>
          <SettingsContent {...settingsContentProps} />
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">إعدادات النظام</h3>
            {settingsOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={option.onClick}
                className="w-full justify-start text-right flex items-center p-2"
              >
                {option.icon}
                <span className="ml-2">{option.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <SettingsPopover />
  );
};
