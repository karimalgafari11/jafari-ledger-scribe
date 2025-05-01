
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import { BackupSettings, BackupHistoryItem } from '@/types/settings';
import { BackupFormat } from './backupTypes';

// Utility to create a new backup history item
export const createBackupHistoryItem = (
  fileFormat: BackupFormat, 
  destinationType: 'local' | 'cloud' | 'ftp' | 'email'
): BackupHistoryItem => {
  // Generate file size based on format
  const fileSize = fileFormat === 'original' ? 
    `${Math.floor(Math.random() * 200) + 70} MB` : 
    fileFormat === 'sql' ? 
    `${Math.floor(Math.random() * 100) + 60} MB` : 
    fileFormat === 'json' ? 
    `${Math.floor(Math.random() * 80) + 30} MB` : 
    `${Math.floor(Math.random() * 100) + 10} MB`;

  // Determine file extension based on format
  const fileExtension = fileFormat === 'compressed' ? '.zip' : 
                       fileFormat === 'sql' ? '.sql' : 
                       fileFormat === 'json' ? '.json' : '.tar';

  return {
    id: uuid(),
    createdAt: new Date(),
    size: fileSize,
    path: `/backups/backup-${new Date().toISOString().split('T')[0]}${fileExtension}`,
    status: 'success',
    type: 'manual',
    destination: destinationType,
    fileFormat: fileFormat
  };
};

// Simulated delay function for async operations
export const simulateDelay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Show progress update during operations
export const simulateProgressUpdate = async (
  updateProgress: (progress: number) => void, 
  steps = 10, 
  delay = 300
): Promise<void> => {
  for (let i = 1; i <= steps; i++) {
    await simulateDelay(delay);
    updateProgress(i * 10);
  }
};
