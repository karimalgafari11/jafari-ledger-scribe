
import React from 'react';
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
  // Since we're only supporting Arabic now, we'll make this a non-functional component
  // that just displays Arabic indicator
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="h-8 min-w-8 px-2"
      title="اللغة العربية"
    >
      <span className="text-xs font-medium">عربي</span>
    </Button>
  );
};

export default LanguageSwitcher;
