
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from '../ui/resizable';

interface ResizableComponentProps {
  children: ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  onResize?: (size: number) => void;
  id?: string;
}

const ResizableComponent: React.FC<ResizableComponentProps> = ({
  children,
  className,
  direction = 'horizontal',
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  collapsible = true,
  onResize,
  id
}) => {
  return (
    <ResizablePanelGroup
      direction={direction}
      className={cn('h-full w-full', className)}
    >
      <ResizablePanel 
        defaultSize={defaultSize}
        minSize={minSize}
        maxSize={maxSize}
        collapsible={collapsible}
        onResize={onResize}
        id={id}
      >
        {children}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={100 - defaultSize}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm text-muted-foreground">المنطقة القابلة للتعديل</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ResizableComponent;
