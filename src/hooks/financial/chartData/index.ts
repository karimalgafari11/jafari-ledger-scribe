
import { createSalesAndMarginChart } from './salesAndMarginChart';
import { createRevenueBySourceChart } from './revenueBySourceChart';
import { createExpensesByCategoryChart } from './expensesByCategoryChart'; 
import { createForecastChart } from './forecastChart';
import { createProfitabilityChart } from './profitabilityChart';
import { createCashflowChart } from './cashflowChart';
import { createLiquidityChart } from './liquidityChart';
import { createDebtRatiosChart } from './debtRatiosChart';
import { createEfficiencyRatiosCharts } from './efficiencyRatiosCharts';
import { createProfitabilityRatiosCharts } from './profitabilityRatiosCharts';
import { FinancialChartData } from '../types';

// إنشاء بيانات المخططات الوهمية
export function createMockChartData(): FinancialChartData {
  return {
    salesAndMargin: createSalesAndMarginChart(),
    revenueBySource: createRevenueBySourceChart(),
    expensesByCategory: createExpensesByCategoryChart(),
    forecast: createForecastChart(),
    profitabilityData: createProfitabilityChart(),
    cashflowData: createCashflowChart(),
    liquidityData: createLiquidityChart(),
    debtRatios: createDebtRatiosChart(),
    efficiencyRatios: createEfficiencyRatiosCharts(),
    profitabilityRatios: createProfitabilityRatiosCharts()
  };
}
