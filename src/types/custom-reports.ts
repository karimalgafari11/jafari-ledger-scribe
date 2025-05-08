
export interface CustomReport {
  id: string;
  name: string;
  description?: string;
  type: ReportType;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  schedule?: ReportSchedule;
  lastRun?: Date;
  filters: ReportFilter[];
  columns: ReportColumn[];
  sorting: ReportSorting[];
  grouping?: ReportGrouping[];
  charts?: ReportChart[];
  format: 'table' | 'chart' | 'mixed';
  exportOptions: ExportOptions;
  accessUsers?: string[];
  accessRoles?: string[];
  archived: boolean;
  tags?: string[];
}

export type ReportType =
  | 'financial'
  | 'sales'
  | 'inventory'
  | 'purchasing'
  | 'project'
  | 'hr'
  | 'custom';

export interface ReportSchedule {
  active: boolean;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv' | 'html';
  includeCharts: boolean;
}

export interface ReportFilter {
  field: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan' | 'between' | 'in';
  value: any;
  conjunction?: 'and' | 'or';
}

export interface ReportColumn {
  field: string;
  title: string;
  dataType: 'string' | 'number' | 'date' | 'boolean' | 'currency';
  visible: boolean;
  width?: number;
  formatOptions?: Record<string, any>;
  formula?: string;
}

export interface ReportSorting {
  field: string;
  direction: 'asc' | 'desc';
  priority: number;
}

export interface ReportGrouping {
  field: string;
  showSubtotals: boolean;
  expandByDefault: boolean;
}

export interface ReportChart {
  type: 'bar' | 'line' | 'pie' | 'area' | 'radar' | 'scatter';
  title: string;
  xAxis: string;
  yAxis: string[];
  aggregation: 'sum' | 'avg' | 'min' | 'max' | 'count';
  showLegend: boolean;
  colorScheme?: string[];
}

export interface ExportOptions {
  formats: Array<'pdf' | 'excel' | 'csv' | 'html'>;
  pageSize?: 'A4' | 'Letter' | 'Legal';
  orientation?: 'portrait' | 'landscape';
  includeHeaderFooter: boolean;
  headerText?: string;
  footerText?: string;
}
