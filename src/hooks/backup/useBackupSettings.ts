
import { useBackupState } from './backupState';
import { useBackupActions } from './backupHooks';
import { BackupState, BackupActions } from './backupTypes';

// Main hook that combines state and actions
export function useBackupSettings(): BackupState & BackupActions {
  // Get state and state updaters
  const [state, stateUpdaters] = useBackupState();
  
  // Get all the action functions
  const actions = useBackupActions(state, stateUpdaters);

  // Combine everything into one object
  return {
    ...state,
    ...actions,
    setDownloadFormat: stateUpdaters.setDownloadFormat,
    updateSetting: stateUpdaters.updateSetting,
    updateSettings: stateUpdaters.updateSettings
  };
}
