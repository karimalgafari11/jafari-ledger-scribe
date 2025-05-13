
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface PageContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  showBack?: boolean;
  actions?: React.ReactNode;
}

export const PageContainer = ({
  title,
  description,
  children,
  showBack = false,
  actions
}: PageContainerProps) => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="ml-2"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          )}
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{title}</h2>
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};
