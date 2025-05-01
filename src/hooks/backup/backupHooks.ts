import { BackupState, BackupFormat } from './backupTypes';
import { BackupSettings } from '@/types/settings';
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

// Types for state updater functions
type StateUpdaters = {
  setLoading: (loading: boolean) => void;
  setBackupProgress: (progress: number) => void;
  setIsBackingUp: (isBackingUp: boolean) => void;
  setRestoreProgress: (progress: number) => void;
  setIsRestoring: (isRestoring: boolean) => void;
  setIsConnectingGoogleDrive: (isConnecting: boolean) => void;
  setUploadProgress: (progress: number) => void;
  setIsUploadingToGoogleDrive: (isUploading: boolean) => void;
  updateSettings: (updatedSettings: Partial<BackupSettings>) => void;
}

export const useBackupActions = (
  state: BackupState,
  stateUpdaters: StateUpdaters
) => {
  const { 
    settings,
  } = state;
  
  const {
    setLoading,
    setBackupProgress,
    setIsBackingUp,
    setRestoreProgress,
    setIsRestoring,
    setIsConnectingGoogleDrive,
    setUploadProgress,
    setIsUploadingToGoogleDrive,
    updateSettings
  } = stateUpdaters;

  // Save settings
  const saveSettings = async (): Promise<boolean> => {
    setLoading(true);
    const result = await saveSettingsOperation();
    setLoading(false);
    return result;
  };

  // Create manual backup
  const createManualBackup = async (fileFormat: BackupFormat = 'compressed'): Promise<boolean> => {
    return createBackup(
      settings, 
      fileFormat, 
      setIsBackingUp, 
      setBackupProgress, 
      updateSettings
    );
  };

  // Restore backup
  const restoreBackup = async (backupId: string): Promise<boolean> => {
    return restoreBackupOperation(
      settings, 
      backupId, 
      setIsRestoring, 
      setRestoreProgress
    );
  };

  // Delete backup
  const deleteBackup = (backupId: string): Promise<boolean> => {
    return deleteBackupOperation(backupId, updateSettings, settings);
  };

  // Download backup
  const downloadBackup = (backupId: string, format: BackupFormat = 'compressed'): void => {
    downloadBackupOperation(backupId, format, settings);
  };

  // Download original backup
  const downloadOriginalBackup = (backupId: string): void => {
    downloadOriginalBackupOperation(backupId, settings);
  };

  // Send backup by email
  const sendBackupByEmail = (backupId: string, email: string): Promise<boolean> => {
    return sendBackupByEmailOperation(backupId, email, settings);
  };

  // Connect to Google Drive
  const connectGoogleDrive = async (): Promise<boolean> => {
    // Store email temporarily in localStorage in case we need it during the authentication process
    if (settings.googleDriveAuth?.email) {
      localStorage.setItem('tempGoogleEmail', settings.googleDriveAuth.email);
    }
    
    return connectGoogleDriveOperation(setIsConnectingGoogleDrive, updateSettings);
  };

  // Disconnect from Google Drive
  const disconnectGoogleDrive = async (): Promise<boolean> => {
    return disconnectGoogleDriveOperation(updateSettings);
  };

  // Upload to Google Drive
  const uploadToGoogleDrive = async (backupId: string): Promise<boolean> => {
    return uploadToGoogleDriveOperation(
      backupId, 
      settings, 
      setIsUploadingToGoogleDrive, 
      setUploadProgress, 
      updateSettings
    );
  };

  // Download from Google Drive
  const downloadFromGoogleDrive = async (backupId: string): Promise<boolean> => {
    return downloadFromGoogleDriveOperation(backupId, settings);
  };

  // Upload backup from file
  const uploadBackupFromFile = async (file: File): Promise<boolean> => {
    return uploadBackupFromFileOperation(file, updateSettings, settings);
  };

  return {
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
};
