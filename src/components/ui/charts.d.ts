
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

export interface ChartProps {
  data: ChartData;
  options?: any;
}

export interface BarChartProps extends ChartProps {}
export interface LineChartProps extends ChartProps {}
export interface PieChartProps extends ChartProps {}
