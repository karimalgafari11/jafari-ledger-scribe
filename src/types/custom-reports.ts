
export interface Report {
  id: string;
  name: string;
  title?: string;
  description: string;
  dateCreated: Date;
  lastModified: Date;
  createdBy: string;
  favorite: boolean;
  category: string | string[];
  tags: string[];
  viewCount: number;
  author?: string;
  date?: string;
  type?: string;
  lastRun?: Date;
}

export interface ReportFilter {
  category?: string[];
  author?: string;
  favorites?: boolean;
  dateRange?: {
    from: Date;
    to: Date;
  };
  type?: string[];
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderDash?: number[];
  }[];
}
