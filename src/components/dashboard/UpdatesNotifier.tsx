
import React from 'react';
import { useSystemUpdates } from '@/hooks/useSystemUpdates';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DownloadIcon, AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';

export function UpdatesNotifier() {
  const { 
    latestVersion, 
    currentVersion, 
    updateStatus,
    isLoading 
  } = useSystemUpdates();

  if (isLoading) {
    return null;
  }

  if (updateStatus !== 'available') {
    return null;
  }

  return (
    <Card className="border-primary/30 bg-primary/5 overflow-hidden mb-4">
      {latestVersion?.requiresUpdate && (
        <div className="h-1 bg-amber-500" />
      )}
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          {latestVersion?.requiresUpdate ? (
            <AlertTriangleIcon className="h-5 w-5 text-amber-500 mr-2" />
          ) : (
            <DownloadIcon className="h-5 w-5 text-primary mr-2" />
          )}
          <div>
            <div className="text-sm font-medium">
              تحديث جديد متاح{' '}
              <Badge variant="outline" className="ml-2">
                الإصدار {latestVersion?.version}
              </Badge>
            </div>
            {latestVersion?.description && (
              <div className="text-xs text-muted-foreground mt-1">
                {latestVersion.description.length > 100 
                  ? latestVersion.description.substring(0, 100) + '...'
                  : latestVersion.description
                }
              </div>
            )}
          </div>
        </div>
        <Button size="sm" variant="outline" asChild>
          <Link to="/settings/updates">
            عرض التفاصيل
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default UpdatesNotifier;
