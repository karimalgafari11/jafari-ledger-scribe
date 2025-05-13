
export interface SoftwareVersion {
  id: string;
  version: string;
  releaseDate: Date;
  description?: string;
  isStable: boolean;
  releaseNotes?: string;
  features?: Record<string, boolean>;
  requiresUpdate?: boolean;
  minRequiredVersion?: string;
  createdAt: Date;
}

export interface UserUpdate {
  id: string;
  userId: string;
  versionId: string;
  installedAt: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  notes?: string;
  version?: SoftwareVersion;
}

export type UpdateStatus = 'available' | 'installed' | 'pending' | 'not_required';

export interface SystemUpdateState {
  currentVersion?: SoftwareVersion;
  latestVersion?: SoftwareVersion;
  availableUpdates: SoftwareVersion[];
  recentUpdates: UserUpdate[];
  updateStatus: UpdateStatus;
  isLoading: boolean;
  isChecking: boolean;
}
