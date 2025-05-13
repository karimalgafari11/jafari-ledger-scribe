
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SoftwareVersion, UserUpdate, UpdateStatus, SystemUpdateState } from '@/types/software-updates';
import { toast } from 'sonner';

export function useSystemUpdates() {
  const [state, setState] = useState<SystemUpdateState>({
    availableUpdates: [],
    recentUpdates: [],
    updateStatus: 'not_required',
    isLoading: true,
    isChecking: false,
  });

  const fetchVersions = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // جلب أحدث إصدار
      const { data: latestVersionData, error: latestError } = await supabase
        .from('software_versions')
        .select('*')
        .order('release_date', { ascending: false })
        .limit(1)
        .single();
      
      if (latestError) throw latestError;
      
      // جلب جميع الإصدارات المتاحة
      const { data: versionsData, error: versionsError } = await supabase
        .from('software_versions')
        .select('*')
        .order('release_date', { ascending: false });
      
      if (versionsError) throw versionsError;
      
      // جلب تحديثات المستخدم الحالي
      const { data: userUpdatesData, error: updatesError } = await supabase
        .from('user_updates')
        .select(`
          id,
          user_id,
          version_id,
          installed_at,
          status,
          notes,
          version:version_id (*)
        `)
        .order('installed_at', { ascending: false })
        .limit(10);
      
      if (updatesError) throw updatesError;
      
      // تحويل البيانات إلى الهيكل المطلوب
      const latestVersion = latestVersionData ? mapVersionFromDb(latestVersionData) : undefined;
      
      const availableUpdates = versionsData
        .map(mapVersionFromDb)
        .filter(version => {
          // التحقق من عدم تثبيت الإصدار مسبقًا
          const isInstalled = userUpdatesData.some(
            update => update.version_id === version.id && update.status === 'completed'
          );
          return !isInstalled;
        });

      const currentVersion = userUpdatesData.length > 0
        ? mapVersionFromDb(userUpdatesData[0].version)
        : undefined;
        
      const recentUpdates = userUpdatesData.map(update => ({
        id: update.id,
        userId: update.user_id,
        versionId: update.version_id,
        installedAt: new Date(update.installed_at),
        status: update.status,
        notes: update.notes,
        version: update.version ? mapVersionFromDb(update.version) : undefined
      }));

      // تحديد حالة التحديث
      let updateStatus: UpdateStatus = 'not_required';
      
      if (latestVersion && (!currentVersion || compareVersions(latestVersion.version, currentVersion.version) > 0)) {
        if (latestVersion.requiresUpdate) {
          updateStatus = 'available';
        } else if (
          latestVersion.minRequiredVersion && 
          currentVersion && 
          compareVersions(currentVersion.version, latestVersion.minRequiredVersion) < 0
        ) {
          updateStatus = 'available';
        }
      }
      
      setState({
        currentVersion,
        latestVersion,
        availableUpdates,
        recentUpdates,
        updateStatus,
        isLoading: false,
        isChecking: false,
      });
      
    } catch (error) {
      console.error('Error fetching system updates:', error);
      toast.error('حدث خطأ أثناء جلب معلومات التحديثات');
      setState(prev => ({ ...prev, isLoading: false, isChecking: false }));
    }
  }, []);

  const checkForUpdates = useCallback(async () => {
    setState(prev => ({ ...prev, isChecking: true }));
    await fetchVersions();
    toast.success('تم التحقق من وجود تحديثات');
  }, [fetchVersions]);

  const installUpdate = useCallback(async (versionId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // تسجيل عملية التثبيت
      const { error } = await supabase
        .from('user_updates')
        .insert({
          version_id: versionId,
          status: 'completed',
          notes: 'تم تثبيت التحديث بنجاح'
        });
      
      if (error) throw error;
      
      toast.success('تم تثبيت التحديث بنجاح');
      
      // إعادة جلب البيانات بعد التثبيت
      await fetchVersions();
      
    } catch (error) {
      console.error('Error installing update:', error);
      toast.error('حدث خطأ أثناء تثبيت التحديث');
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [fetchVersions]);

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchVersions();
    
    // الاشتراك في حدث إضافة إصدارات جديدة
    const channel = supabase
      .channel('system-updates')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'software_versions' },
        () => {
          fetchVersions();
          toast.info('تم إصدار تحديث جديد للنظام');
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchVersions]);

  return {
    ...state,
    checkForUpdates,
    installUpdate,
    refreshUpdates: fetchVersions
  };
}

// وظائف مساعدة

function mapVersionFromDb(dbVersion: any): SoftwareVersion {
  return {
    id: dbVersion.id,
    version: dbVersion.version,
    releaseDate: new Date(dbVersion.release_date),
    description: dbVersion.description,
    isStable: dbVersion.is_stable,
    releaseNotes: dbVersion.release_notes,
    features: dbVersion.features,
    requiresUpdate: dbVersion.requires_update,
    minRequiredVersion: dbVersion.min_required_version,
    createdAt: new Date(dbVersion.created_at),
  };
}

function compareVersions(a: string, b: string): number {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);
  
  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const numA = partsA[i] || 0;
    const numB = partsB[i] || 0;
    
    if (numA > numB) return 1;
    if (numA < numB) return -1;
  }
  
  return 0;
}
