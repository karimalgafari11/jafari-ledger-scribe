
export interface Report {
  id: string; // Change to string type to fix reports.ts type errors
  name: string;
  description: string;
  dateCreated: Date;
  lastModified: Date;
  createdBy: string;
  favorite: boolean;
  category: string;
  tags: string[];
  viewCount: number;
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
