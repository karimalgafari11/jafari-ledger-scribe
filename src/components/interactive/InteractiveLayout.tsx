
import React, { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import DraggableComponent from './DraggableComponent';
import { ZoomProvider } from './ZoomControl';
import ZoomableContent from './ZoomableContent';
import ZoomControl from './ZoomControl';
import { Card, CardContent } from '@/components/ui/card';
import { MoveHorizontal } from 'lucide-react';

interface InteractiveLayoutProps {
  children: ReactNode;
  className?: string;
  enableDrag?: boolean;
  enableZoom?: boolean;
  showControls?: boolean;
}

const InteractiveLayout: React.FC<InteractiveLayoutProps> = ({
  children,
  className,
  enableDrag = true,
  enableZoom = true,
  showControls = true
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <ZoomProvider>
      <div className={cn('relative p-4 h-full', className)}>
        {showControls && (
          <div className="absolute top-2 left-2 z-10 p-2 bg-white rounded-md shadow-md">
            <ZoomControl />
          </div>
        )}
        
        {enableDrag ? (
          <DraggableComponent
            handle=".drag-handle"
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            className="cursor-move"
          >
            <Card className={cn(
              'transition-shadow',
              isDragging ? 'shadow-lg' : 'shadow',
            )}>
              <div className="drag-handle bg-muted px-3 py-2 flex justify-between items-center cursor-move">
                <span className="text-sm font-medium">اسحب من هنا</span>
                <MoveHorizontal size={16} />
              </div>
              <CardContent>
                {enableZoom ? (
                  <ZoomableContent>
                    {children}
                  </ZoomableContent>
                ) : (
                  children
                )}
              </CardContent>
            </Card>
          </DraggableComponent>
        ) : enableZoom ? (
          <ZoomableContent>
            {children}
          </ZoomableContent>
        ) : (
          children
        )}
      </div>
    </ZoomProvider>
  );
};

export default InteractiveLayout;
