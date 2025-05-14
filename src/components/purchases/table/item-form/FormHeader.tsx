
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormHeaderProps {
  title: string;
  onClose: () => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onClose}
        className="h-8 w-8"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
