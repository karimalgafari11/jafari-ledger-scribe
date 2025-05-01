
import { useState } from 'react';
import { BackupSettings } from '@/types/settings';
import { mockBackupSettings } from '@/data/mockSettings';
import { BackupFormat, BackupState } from './backupTypes';

// Initialize backup state with defaults from mock data
export const useBackupState = (): [
  BackupState,
  {
    setState: React.Dispatch<React.SetStateAction<BackupState>>,
    updateSetting: <K extends keyof BackupSettings>(key: K, value: BackupSettings[K]) => void,
    updateSettings: (updatedSettings: Partial<BackupSettings>) => void,
    setLoading: (loading: boolean) => void,
    setBackupProgress: (progress: number) => void,
    setIsBackingUp: (isBackingUp: boolean) => void,
    setRestoreProgress: (progress: number) => void,
    setIsRestoring: (isRestoring: boolean) => void,
    setIsConnectingGoogleDrive: (isConnecting: boolean) => void,
    setUploadProgress: (progress: number) => void,
    setIsUploadingToGoogleDrive: (isUploading: boolean) => void,
    setDownloadFormat: (format: BackupFormat) => void
  }
] => {
  // Initialize state with default values
  const [state, setState] = useState<BackupState>({
    settings: {
      ...mockBackupSettings,
      backupHistory: mockBackupSettings.backupHistory || [],
      encryptBackup: mockBackupSettings.encryptBackup || false,
      compressionLevel: mockBackupSettings.compressionLevel || 'medium',
      includeAttachments: mockBackupSettings.includeAttachments || true,
      includeSettings: mockBackupSettings.includeSettings || true,
      autoRestore: mockBackupSettings.autoRestore || false,
      destinationType: mockBackupSettings.destinationType || 'local',
      googleDriveAuth: mockBackupSettings.googleDriveAuth || { isAuthenticated: false },
      autoCloudBackup: mockBackupSettings.autoCloudBackup || false,
      cloudBackupFormat: mockBackupSettings.cloudBackupFormat || 'compressed',
      cloudPath: mockBackupSettings.cloudPath || '/backups/'
    },
    isLoading: false,
    restoreProgress: 0,
    backupProgress: 0,
    isRestoring: false,
    isBackingUp: false,
    isConnectingGoogleDrive: false,
    isUploadingToGoogleDrive: false,
    uploadProgress: 0,
    downloadFormat: 'compressed'
  });

  // Update a single setting
  const updateSetting = <K extends keyof BackupSettings>(
    key: K,
    value: BackupSettings[K]
  ) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value
      }
    }));
  };

  // Update multiple settings at once
  const updateSettings = (updatedSettings: Partial<BackupSettings>) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...updatedSettings
      }
    }));
  };

  // Set state loading flag
  const setLoading = (loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading
    }));
  };

  // Update state based on backup progress
  const setBackupProgress = (progress: number) => {
    setState(prev => ({ ...prev, backupProgress: progress }));
  };

  // Update backup progress flag
  const setIsBackingUp = (isBackingUp: boolean) => {
    setState(prev => ({ ...prev, isBackingUp }));
  };

  // Update restore progress
  const setRestoreProgress = (progress: number) => {
    setState(prev => ({ ...prev, restoreProgress: progress }));
  };

  // Update restoring flag
  const setIsRestoring = (isRestoring: boolean) => {
    setState(prev => ({ ...prev, isRestoring }));
  };

  // Update Google Drive connection flag
  const setIsConnectingGoogleDrive = (isConnecting: boolean) => {
    setState(prev => ({ ...prev, isConnectingGoogleDrive: isConnecting }));
  };

  // Update upload progress
  const setUploadProgress = (progress: number) => {
    setState(prev => ({ ...prev, uploadProgress: progress }));
  };

  // Update uploading flag
  const setIsUploadingToGoogleDrive = (isUploading: boolean) => {
    setState(prev => ({ ...prev, isUploadingToGoogleDrive: isUploading }));
  };

  // Set download format
  const setDownloadFormat = (format: BackupFormat) => {
    setState(prev => ({ ...prev, downloadFormat: format }));
  };

  return [
    state,
    {
      setState,
      updateSetting,
      updateSettings,
      setLoading,
      setBackupProgress,
      setIsBackingUp,
      setRestoreProgress,
      setIsRestoring,
      setIsConnectingGoogleDrive,
      setUploadProgress,
      setIsUploadingToGoogleDrive,
      setDownloadFormat
    }
  ];
};
