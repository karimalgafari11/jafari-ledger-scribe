
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useZoom } from './ZoomControl';

interface ZoomableContentProps {
  children: ReactNode;
  className?: string;
  minZoom?: number;
  maxZoom?: number;
  zoomCenter?: boolean;
}

const ZoomableContent: React.FC<ZoomableContentProps> = ({
  children,
  className,
  minZoom = 50,
  maxZoom = 200,
  zoomCenter = true
}) => {
  const { zoomLevel } = useZoom();
  const scale = zoomLevel / 100;
  
  // تأكد أن الزووم ضمن الحدود المسموحة
  const limitedScale = Math.max(minZoom / 100, Math.min(scale, maxZoom / 100));
  
  return (
    <div className={cn('relative overflow-auto', className)}>
      <div 
        className={cn(
          'transform transition-transform duration-200',
          zoomCenter && 'transform-origin-center'
        )}
        style={{ 
          transform: `scale(${limitedScale})`,
          transformOrigin: zoomCenter ? 'center' : 'top left',
          width: zoomLevel < 100 ? '100%' : `${zoomLevel}%`,
          height: zoomLevel < 100 ? '100%' : 'auto'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ZoomableContent;
