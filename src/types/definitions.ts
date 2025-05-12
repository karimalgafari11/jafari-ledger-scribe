
// Add FiltersType export
export interface FiltersType {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  action?: string;
  module?: string;
  status?: 'success' | 'failed' | 'warning' | 'info' | '';
  searchText?: string;
}
