
export interface Report {
  id: string;
  title: string;
  name?: string;
  description: string;
  date: string;
  category: string | string[];
  favorite: boolean;
  author?: string;
  type?: string | string[];
  createdAt?: Date;
  lastRun?: Date;
}

export interface ReportFilter {
  period?: string;
  category?: string[];
  author?: string;
  startDate?: Date;
  endDate?: Date;
  favorites?: boolean;
  status?: string;
}

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
