
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderDash?: number[];
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface Report {
  id: string;
  name: string;
  title?: string;
  description: string;
  dateCreated?: Date;
  lastModified?: Date;
  createdBy?: string;
  favorite: boolean;
  category: string | string[];
  tags?: string[];
  viewCount?: number;
  author?: string;
  date?: string;
  type?: string;
  lastRun?: Date;
  createdAt?: Date; // Add the missing property
}

export interface ReportFilter {
  id?: string;
  name?: string;
  type?: 'date' | 'select' | 'text' | 'number' | 'boolean';
  value?: any;
  options?: { label: string; value: any }[];
  category?: string[];
  author?: string;
  favorites?: boolean;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface CustomReport {
  id: string;
  name: string;
  description?: string;
  category: string;
  type: 'table' | 'chart' | 'mixed';
  chartType?: 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'area';
  data?: ChartData | any[];
  filters?: ReportFilter[];
  columns?: {
    id: string;
    name: string;
    selector?: string;
    sortable?: boolean;
    right?: boolean;
    format?: (row: any) => React.ReactNode;
  }[];
  creator?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isPublic?: boolean;
  isSystem?: boolean;
  isTemplate?: boolean;
  isShowxAxis?: boolean;
  isShowyAxis?: boolean;
  isShowLegend?: boolean;
  isShowGrid?: boolean;
}
