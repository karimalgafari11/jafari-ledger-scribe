
import React, { useState, ReactNode, useEffect, useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { cn } from '@/lib/utils';

interface DraggableComponentProps {
  children: ReactNode;
  className?: string;
  defaultPosition?: { x: number; y: number };
  handle?: string;
  bounds?: string | object;
  disabled?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  children,
  className,
  defaultPosition = { x: 0, y: 0 },
  handle = '.drag-handle',
  bounds = 'parent',
  disabled = false,
  onDragStart,
  onDragEnd
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isMounted, setIsMounted] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  
  // نستخدم useEffect للتأكد من أن الكود يعمل فقط بعد التحميل في جانب العميل
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
    
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  // عرض div عادي أثناء SSR أو قبل التحميل
  if (!isMounted || typeof window === 'undefined') {
    return (
      <div className={cn('relative', className)}>
        {children}
      </div>
    );
  }

  // تقديم Draggable فقط بعد التحميل على جانب العميل
  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      defaultPosition={defaultPosition}
      onDrag={handleDrag}
      handle={handle}
      bounds={bounds}
      disabled={disabled}
      onStart={onDragStart}
      onStop={onDragEnd}
    >
      <div ref={nodeRef} className={cn('relative', className)}>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableComponent;
