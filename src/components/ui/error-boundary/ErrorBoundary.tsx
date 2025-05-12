
import React, { Component, ErrorInfo, ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">حدث خطأ غير متوقع</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              نعتذر، حدث خطأ أثناء تحميل هذا المكون. يمكنك محاولة تحديث الصفحة أو الاتصال بالدعم الفني.
            </p>
            {this.state.error && (
              <div className="bg-card p-3 rounded-md border text-xs font-mono overflow-auto max-h-[200px]">
                {this.state.error.toString()}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={this.handleReset} 
              className="gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              إعادة المحاولة
            </Button>
          </CardFooter>
        </Card>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
