
// Define AnalysisPeriod as enum and export it
export enum AnalysisPeriod {
  MONTH_3 = '3_months',
  MONTH_6 = '6_months',
  YEAR_1 = '1_year',
  YEAR_2 = '2_years'
}

// Export types used in financial analysis hooks
export interface ChartDataItem {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderDash?: number[];
  }[];
}

export interface EfficiencyRatios {
  inventoryTurnover: ChartDataItem;
  receivablesTurnover: ChartDataItem;
  assetTurnover: ChartDataItem;
  cashConversionCycle: ChartDataItem;
}

export interface ProfitabilityRatios {
  grossMargin: ChartDataItem;
  operatingMargin: ChartDataItem;
  netMargin: ChartDataItem;
  roa: ChartDataItem;
}

export interface FinancialChartData {
  salesAndMargin: ChartDataItem;
  revenueBySource: ChartDataItem;
  expensesByCategory: ChartDataItem;
  forecast: ChartDataItem;
  profitabilityData: ChartDataItem;
  cashflowData: ChartDataItem;
  liquidityData: ChartDataItem;
  debtRatios: ChartDataItem;
  efficiencyRatios: EfficiencyRatios;
  profitabilityRatios: ProfitabilityRatios;
}
