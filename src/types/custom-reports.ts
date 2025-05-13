
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

export interface ReportFilter {
  id: string;
  name: string;
  type: 'date' | 'select' | 'text' | 'number' | 'boolean';
  value: any;
  options?: { label: string; value: any }[];
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
