
import { useState } from 'react';
import { BackupSettings } from '@/types/settings';
import { mockBackupSettings } from '@/data/mockSettings';
import { BackupFormat, BackupState, BackupActions } from './backupTypes';
import { 
  createBackup, 
  restoreBackup as restoreBackupOperation, 
  deleteBackup as deleteBackupOperation,
  saveSettings as saveSettingsOperation 
} from './backupOperations';
import {
  connectGoogleDrive as connectGoogleDriveOperation,
  disconnectGoogleDrive as disconnectGoogleDriveOperation,
  uploadToGoogleDrive as uploadToGoogleDriveOperation,
  downloadFromGoogleDrive as downloadFromGoogleDriveOperation
} from './cloudOperations';
import {
  downloadBackup as downloadBackupOperation,
  downloadOriginalBackup as downloadOriginalBackupOperation,
  sendBackupByEmail as sendBackupByEmailOperation,
  uploadBackupFromFile as uploadBackupFromFileOperation
} from './downloadOperations';

export function useBackupSettings(): BackupState & BackupActions {
  // Initialize state
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

  // Save settings
  const saveSettings = async (): Promise<boolean> => {
    setLoading(true);
    const result = await saveSettingsOperation();
    setLoading(false);
    return result;
  };

  // Update state based on backup progress
  const setBackupProgress = (progress: number) => {
    setState(prev => ({ ...prev, backupProgress: progress }));
  };

  // Update backup progress flag
  const setIsBackingUp = (isBackingUp: boolean) => {
    setState(prev => ({ ...prev, isBackingUp }));
  };

  // Create manual backup
  const createManualBackup = async (fileFormat: BackupFormat = 'compressed'): Promise<boolean> => {
    return createBackup(
      state.settings, 
      fileFormat, 
      setIsBackingUp, 
      setBackupProgress, 
      updateSettings
    );
  };

  // Update restore progress
  const setRestoreProgress = (progress: number) => {
    setState(prev => ({ ...prev, restoreProgress: progress }));
  };

  // Update restoring flag
  const setIsRestoring = (isRestoring: boolean) => {
    setState(prev => ({ ...prev, isRestoring }));
  };

  // Restore backup
  const restoreBackup = async (backupId: string): Promise<boolean> => {
    return restoreBackupOperation(
      state.settings, 
      backupId, 
      setIsRestoring, 
      setRestoreProgress
    );
  };

  // Delete backup
  const deleteBackup = (backupId: string): Promise<boolean> => {
    return deleteBackupOperation(backupId, updateSettings, state.settings);
  };

  // Download backup
  const downloadBackup = (backupId: string, format: BackupFormat = 'compressed'): void => {
    downloadBackupOperation(backupId, format, state.settings);
  };

  // Download original backup
  const downloadOriginalBackup = (backupId: string): void => {
    downloadOriginalBackupOperation(backupId, state.settings);
  };

  // Send backup by email
  const sendBackupByEmail = (backupId: string, email: string): Promise<boolean> => {
    return sendBackupByEmailOperation(backupId, email, state.settings);
  };

  // Update Google Drive connection flag
  const setIsConnectingGoogleDrive = (isConnecting: boolean) => {
    setState(prev => ({ ...prev, isConnectingGoogleDrive: isConnecting }));
  };

  // Connect to Google Drive
  const connectGoogleDrive = async (): Promise<boolean> => {
    return connectGoogleDriveOperation(setIsConnectingGoogleDrive, updateSettings);
  };

  // Disconnect from Google Drive
  const disconnectGoogleDrive = async (): Promise<boolean> => {
    return disconnectGoogleDriveOperation(updateSettings);
  };

  // Update upload progress
  const setUploadProgress = (progress: number) => {
    setState(prev => ({ ...prev, uploadProgress: progress }));
  };

  // Update uploading flag
  const setIsUploadingToGoogleDrive = (isUploading: boolean) => {
    setState(prev => ({ ...prev, isUploadingToGoogleDrive: isUploading }));
  };

  // Upload to Google Drive
  const uploadToGoogleDrive = async (backupId: string): Promise<boolean> => {
    return uploadToGoogleDriveOperation(
      backupId, 
      state.settings, 
      setIsUploadingToGoogleDrive, 
      setUploadProgress, 
      updateSettings
    );
  };

  // Download from Google Drive
  const downloadFromGoogleDrive = async (backupId: string): Promise<boolean> => {
    return downloadFromGoogleDriveOperation(backupId, state.settings);
  };

  // Set download format
  const setDownloadFormat = (format: BackupFormat) => {
    setState(prev => ({ ...prev, downloadFormat: format }));
  };

  // Upload backup from file
  const uploadBackupFromFile = async (file: File): Promise<boolean> => {
    return uploadBackupFromFileOperation(file, updateSettings, state.settings);
  };

  return {
    ...state,
    setDownloadFormat,
    updateSetting,
    updateSettings,
    saveSettings,
    createManualBackup,
    restoreBackup,
    deleteBackup,
    downloadBackup,
    downloadOriginalBackup,
    sendBackupByEmail,
    connectGoogleDrive,
    disconnectGoogleDrive,
    uploadToGoogleDrive,
    downloadFromGoogleDrive,
    uploadBackupFromFile
  };
}
