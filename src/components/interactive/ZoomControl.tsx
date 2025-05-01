
import React, { useState, createContext, useContext, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ZoomIn, ZoomOut } from 'lucide-react';

// إنشاء سياق للتكبير/التصغير
interface ZoomContextType {
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
}

const ZoomContext = createContext<ZoomContextType>({
  zoomLevel: 100,
  setZoomLevel: () => {}
});

export const useZoom = () => useContext(ZoomContext);

interface ZoomProviderProps {
  children: ReactNode;
  defaultZoom?: number;
}

export const ZoomProvider: React.FC<ZoomProviderProps> = ({ children, defaultZoom = 100 }) => {
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);

  return (
    <ZoomContext.Provider value={{ zoomLevel, setZoomLevel }}>
      {children}
    </ZoomContext.Provider>
  );
};

interface ZoomControlProps {
  className?: string;
  compact?: boolean;
}

const ZoomControl: React.FC<ZoomControlProps> = ({ className, compact = false }) => {
  const { zoomLevel, setZoomLevel } = useZoom();

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 10, 50));
  };

  const handleSliderChange = (value: number[]) => {
    setZoomLevel(value[0]);
  };

  return (
    <div className={`flex items-center space-x-2 rtl:space-x-reverse ${className}`}>
      <Button variant="outline" size="icon" onClick={handleZoomOut}>
        <ZoomOut className="h-4 w-4" />
      </Button>
      
      {!compact && (
        <>
          <Slider
            value={[zoomLevel]}
            min={50}
            max={200}
            step={5}
            className="w-24"
            onValueChange={handleSliderChange}
          />
          <span className="text-xs">{zoomLevel}%</span>
        </>
      )}
      
      <Button variant="outline" size="icon" onClick={handleZoomIn}>
        <ZoomIn className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ZoomControl;
