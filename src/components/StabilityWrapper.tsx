
import React, { useEffect, useState, ReactNode, useRef, Suspense } from 'react';
import { ErrorTracker } from '@/utils/errorTracker';
import { toast } from 'sonner';

interface StabilityWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  maxRetries?: number;
  retryDelay?: number;
  showToastOnError?: boolean;
  componentName?: string;
}

export const StabilityWrapper = ({ 
  children, 
  fallback, 
  maxRetries = 3, 
  retryDelay = 1000,
  showToastOnError = false,
  componentName = 'المكون'
}: StabilityWrapperProps) => {
  const [isStable, setIsStable] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const mountedRef = useRef(true);
  const errorRef = useRef<Error | null>(null);

  // Reset state when children change
  const childrenRef = useRef(children);
  if (childrenRef.current !== children) {
    childrenRef.current = children;
    if (hasError) {
      setHasError(false);
      setRetryCount(0);
      errorRef.current = null;
    }
  }
  
  useEffect(() => {
    mountedRef.current = true;
    
    // Short delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      if (mountedRef.current) {
        setIsStable(true);
      }
    }, 50);
    
    // Track if component unmounts due to error
    const unloadListener = () => {
      if (hasError && errorRef.current) {
        ErrorTracker.warning('تم إعادة تحميل الصفحة بسبب خطأ', { 
          component: componentName,
          additionalInfo: { 
            error: errorRef.current.message,
            retryCount: retryCount 
          }
        });
      }
    };
    
    window.addEventListener('beforeunload', unloadListener);
    
    return () => {
      mountedRef.current = false;
      clearTimeout(timeout);
      window.removeEventListener('beforeunload', unloadListener);
    };
  }, [children, hasError, retryCount, componentName]);
  
  useEffect(() => {
    if (hasError && retryCount < maxRetries) {
      const timeout = setTimeout(() => {
        if (mountedRef.current) {
          setHasError(false);
          setRetryCount(prev => prev + 1);
          ErrorTracker.info(`إعادة محاولة تحميل المكون (محاولة ${retryCount + 1}/${maxRetries})`, { 
            component: componentName 
          });
          
          if (showToastOnError) {
            toast.info(`جاري إعادة محاولة تحميل ${componentName}...`);
          }
        }
      }, retryDelay * (retryCount + 1)); // زيادة وقت الانتظار مع كل محاولة
      
      return () => clearTimeout(timeout);
    }
    
    if (hasError && retryCount >= maxRetries) {
      ErrorTracker.error(`فشل تحميل المكون بعد ${maxRetries} محاولات`, { 
        component: componentName,
        additionalInfo: errorRef.current ? { message: errorRef.current.message } : undefined
      });
      
      if (showToastOnError) {
        toast.error(`تعذر تحميل ${componentName}، يرجى تحديث الصفحة`);
      }
    }
  }, [hasError, retryCount, maxRetries, retryDelay, componentName, showToastOnError]);
  
  const handleError = (error: Error, info: React.ErrorInfo) => {
    setHasError(true);
    errorRef.current = error;
    ErrorTracker.renderError(error, info.componentStack);
  };
  
  // Create an error boundary to catch render errors
  class StabilityErrorBoundary extends React.Component<{children: ReactNode}, {hasError: boolean}> {
    constructor(props: {children: ReactNode}) {
      super(props);
      this.state = { hasError: false };
    }
    
    static getDerivedStateFromError() {
      return { hasError: true };
    }
    
    componentDidCatch(error: Error, info: React.ErrorInfo) {
      handleError(error, info);
    }
    
    render() {
      if (this.state.hasError) {
        return fallback || (
          <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-700 dark:text-red-300 text-sm">حدث خطأ أثناء تحميل المحتوى</p>
            {retryCount < maxRetries && (
              <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                جاري إعادة المحاولة... ({retryCount + 1}/{maxRetries})
              </p>
            )}
          </div>
        );
      }
      return this.props.children;
    }
  }
  
  const LoadingSkeleton = () => (
    <div className="flex justify-center items-center h-20">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
  
  return (
    <StabilityErrorBoundary>
      <Suspense fallback={<LoadingSkeleton />}>
        <div 
          className={`transition-opacity duration-300 ${isStable ? 'opacity-100' : 'opacity-0'}`}
          style={{ willChange: 'opacity' }}
        >
          {!hasError && children}
        </div>
      </Suspense>
    </StabilityErrorBoundary>
  );
};

export default StabilityWrapper;
