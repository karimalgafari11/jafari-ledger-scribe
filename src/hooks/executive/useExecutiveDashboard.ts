
import { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SystemAlert } from '@/types/ai';
import { KpiCard } from '@/types/executive-dashboard';
import { FinancialMetric, FinancialRatio } from '@/types/financial-analysis';
import { ChartData } from '@/types/custom-reports';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'onHold' | 'completed';
  budget: number;
  expenses: number;
  teamMembers: number;
  completionRate: number;
}

interface Contract {
  id: string;
  vendor: string;
  startDate: Date;
  endDate: Date;
  value: number;
  status: 'active' | 'pendingRenewal' | 'expired';
}

interface Team {
  id: string;
  name: string;
  members: number;
  allocationRate: number;
  moraleScore: number;
}

interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  overdueProjects: number;
  totalBudget: number;
  spentBudget: number;
  statusChart: ChartData;
  budgetChart: ChartData;
}

interface ExecutiveSummary {
  financialHealth: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  topMetrics: FinancialMetric[];
  keyInsights: string[];
  recommendations: string[];
  risks: string[];
  opportunities: string[];
}

const useExecutiveDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Project A",
      status: "active",
      budget: 100000,
      expenses: 80000,
      teamMembers: 5,
      completionRate: 75
    },
    {
      id: "2",
      name: "Project B",
      status: "onHold",
      budget: 50000,
      expenses: 25000,
      teamMembers: 3,
      completionRate: 50
    },
    {
      id: "3",
      name: "Project C",
      status: "completed",
      budget: 75000,
      expenses: 75000,
      teamMembers: 4,
      completionRate: 100
    }
  ]);

  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "V123",
      vendor: "Vendor X",
      startDate: new Date("2022-01-01"),
      endDate: new Date("2024-01-01"),
      value: 50000,
      status: "active"
    },
    {
      id: "V456",
      vendor: "Vendor Y",
      startDate: new Date("2022-03-01"),
      endDate: new Date("2023-12-31"),
      value: 75000,
      status: "pendingRenewal"
    },
    {
      id: "V789",
      vendor: "Vendor Z",
      startDate: new Date("2022-06-01"),
      endDate: new Date("2023-12-31"),
      value: 100000,
      status: "pendingRenewal"
    }
  ]);

  const [teams, setTeams] = useState<Team[]>([
    {
      id: "A",
      name: "Team A",
      members: 5,
      allocationRate: 85,
      moraleScore: 4
    },
    {
      id: "B",
      name: "Team B",
      members: 3,
      allocationRate: 60,
      moraleScore: 5
    },
    {
      id: "C",
      name: "Team C",
      members: 4,
      allocationRate: 75,
      moraleScore: 3
    }
  ]);

  // Create alerts
  const alerts: SystemAlert[] = [
    {
      id: uuidv4(),
      title: "Budget Overrun",
      message: "Project A has exceeded budget by 20%",
      type: "financial" as const,
      priority: "high" as const,
      severity: "high" as const,
      timestamp: new Date(),
      read: false,
      data: { projectId: "1", budgetExceeded: 20000 }
    },
    {
      id: uuidv4(),
      title: "Contract Expiration",
      message: "3 vendor contracts are expiring within 30 days",
      type: "vendors" as const,
      priority: "medium" as const,
      severity: "medium" as const,
      timestamp: new Date(),
      read: false,
      data: { contractIds: ["V123", "V456", "V789"] }
    },
    {
      id: uuidv4(),
      title: "Resource Allocation",
      message: "Team A is overallocated by 35% for the next sprint",
      type: "system" as const,
      priority: "medium" as const,
      severity: "medium" as const,
      timestamp: new Date(),
      read: false,
      data: { teamId: "A", overallocation: 35 }
    }
  ];

  // Mock financial metrics
  const financialMetrics: FinancialMetric[] = [
    {
      id: '1',
      name: 'Revenue',
      value: 1250000,
      unit: '$',
      trend: 'up',
      percentChange: 12.5,
      category: 'revenue',
      period: 'quarterly'
    },
    {
      id: '2',
      name: 'Operating Profit',
      value: 450000,
      unit: '$',
      trend: 'up',
      percentChange: 8.3,
      category: 'profit',
      period: 'quarterly'
    },
    {
      id: '3',
      name: 'Operating Expenses',
      value: 800000,
      unit: '$',
      trend: 'down',
      percentChange: -3.2,
      category: 'expenses',
      period: 'quarterly'
    },
    {
      id: '4',
      name: 'Cash on Hand',
      value: 2750000,
      unit: '$',
      trend: 'up',
      percentChange: 5.1,
      category: 'cash',
      period: 'quarterly'
    }
  ];

  // Mock financial ratios
  const financialRatios: FinancialRatio[] = [
    {
      id: '1',
      name: 'Current Ratio',
      value: 2.3,
      industry: 1.8,
      trend: 'up',
      description: 'Ability to pay short-term obligations',
      formula: 'Current Assets / Current Liabilities'
    },
    {
      id: '2',
      name: 'Debt Ratio',
      value: 0.42,
      industry: 0.48,
      trend: 'down',
      description: 'Percentage of assets financed by debt',
      formula: 'Total Debt / Total Assets'
    },
    {
      id: '3',
      name: 'Return on Assets',
      value: 0.15,
      industry: 0.12,
      trend: 'up',
      description: 'How efficiently assets are being used',
      formula: 'Net Income / Total Assets'
    }
  ];

  // Create KPI cards
  const kpis: KpiCard[] = [
    {
      id: '1',
      title: 'Revenue Growth',
      value: '+12.5%',
      previousValue: '+8.2%',
      percentChange: 4.3,
      status: 'up',
      icon: 'dollar',
      description: 'Year-over-year growth',
      trend: [45, 52, 49, 60, 55, 58, 62],
      color: 'green'
    },
    {
      id: '2',
      title: 'Profit Margin',
      value: '36%',
      previousValue: '32%',
      percentChange: 4,
      status: 'up',
      icon: 'percent',
      description: 'Net profit percentage',
      trend: [30, 28, 29, 33, 32, 34, 36],
      color: 'blue'
    },
    {
      id: '3',
      title: 'Customer Acquisition',
      value: '125',
      previousValue: '95',
      percentChange: 31.6,
      status: 'up',
      icon: 'users',
      description: 'New customers this quarter',
      trend: [65, 75, 70, 80, 85, 90, 125],
      color: 'purple'
    },
    {
      id: '4',
      title: 'Cash Flow',
      value: '+$450K',
      previousValue: '+$320K',
      percentChange: 40.6,
      status: 'up',
      icon: 'trending-up',
      description: 'Operating cash flow',
      trend: [280, 300, 310, 340, 380, 400, 450],
      color: 'teal'
    }
  ];

  // Executive summary
  const executiveSummary: ExecutiveSummary = {
    financialHealth: 'good',
    topMetrics: [
      {
        id: '1',
        name: 'Revenue',
        value: 1250000,
        unit: '$',
        trend: 'up',
        percentChange: 12.5,
        category: 'revenue',
        period: 'quarterly'
      },
      {
        id: '2',
        name: 'Operating Profit',
        value: 450000,
        unit: '$',
        trend: 'up',
        percentChange: 8.3,
        category: 'profit',
        period: 'quarterly'
      }
    ],
    keyInsights: [
      'Revenue growth is accelerating at 12.5% year-over-year',
      'Operating margins improved by 4 percentage points',
      'Cash position is strengthening with 5.1% increase'
    ],
    recommendations: [
      'Consider investing in marketing to leverage the growth trend',
      'Review resource allocation for Team A to address overallocation',
      'Prepare for contract renewals with vendors Y and Z'
    ],
    risks: [
      'Project A budget overrun may impact quarterly targets',
      'Supply chain delays affecting 2 key projects',
      'Pending regulatory changes may increase compliance costs'
    ],
    opportunities: [
      'Market expansion into new region shows promising early results',
      'New product line exceeding sales expectations by 15%',
      'Strategic partnership opportunities with 2 major vendors'
    ]
  };

  // Project stats
  const projectStats: ProjectStats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    overdueProjects: 1,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    spentBudget: projects.reduce((sum, p) => sum + p.expenses, 0),
    statusChart: {
      labels: ['Active', 'On Hold', 'Completed'],
      datasets: [{
        label: 'Projects by Status',
        data: [
          projects.filter(p => p.status === 'active').length,
          projects.filter(p => p.status === 'onHold').length,
          projects.filter(p => p.status === 'completed').length
        ],
        backgroundColor: ['#3b82f6', '#f59e0b', '#10b981']
      }]
    },
    budgetChart: {
      labels: projects.map(p => p.name),
      datasets: [
        {
          label: 'Budget',
          data: projects.map(p => p.budget),
          backgroundColor: '#93c5fd'
        },
        {
          label: 'Expenses',
          data: projects.map(p => p.expenses),
          backgroundColor: '#bfdbfe'
        }
      ]
    }
  };

  // Sales trends chart data
  const salesTrends: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [120000, 132000, 125000, 145000, 150000, 170000],
        borderColor: '#3b82f6'
      },
      {
        label: 'Target',
        data: [125000, 130000, 140000, 150000, 160000, 165000],
        borderColor: '#10b981',
        borderDash: [5, 5]
      }
    ]
  };

  // Cash flow chart data
  const cashflow: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Cash In',
        data: [180000, 190000, 185000, 205000, 210000, 220000],
        backgroundColor: '#22c55e'
      },
      {
        label: 'Cash Out',
        data: [150000, 145000, 155000, 160000, 165000, 170000],
        backgroundColor: '#ef4444'
      }
    ]
  };

  // Profitability chart data
  const profitability: ChartData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [{
      label: 'Profit Margin',
      data: [42, 38, 45, 32, 25],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    }]
  };

  useEffect(() => {
    // Simulate data fetching or calculations
    setTimeout(() => {
      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.status === "active"
            ? { ...project, completionRate: Math.min(project.completionRate + 5, 100) }
            : project
        )
      );
      setTeams(prevTeams =>
        prevTeams.map(team =>
          team.moraleScore < 5 ? { ...team, moraleScore: team.moraleScore + 1 } : team
        )
      );
    }, 5000);
  }, []);

  const getProjects = (): Project[] => {
    return projects;
  };

  const getContracts = (): Contract[] => {
    return contracts;
  };

  const getTeams = (): Team[] => {
    return teams;
  };

  const getAlerts = (): SystemAlert[] => {
    return alerts;
  };

  // Mock utility functions for the dashboard
  const refreshDashboard = () => {
    console.log("Refreshing executive dashboard...");
  };

  const shareDashboard = (method: string) => {
    console.log(`Sharing dashboard via ${method}...`);
  };

  const exportDashboard = () => {
    console.log("Exporting executive dashboard...");
  };

  return {
    getProjects,
    getContracts,
    getTeams,
    getAlerts,
    kpis,
    financialMetrics,
    financialRatios,
    executiveSummary,
    alerts,
    projectStats,
    salesTrends,
    cashflow,
    profitability,
    refreshDashboard,
    shareDashboard,
    exportDashboard
  };
};

export default useExecutiveDashboard;
