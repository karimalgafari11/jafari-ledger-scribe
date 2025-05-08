import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SystemAlert } from '@/types/ai';

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

  // Update the alerts creation to conform to SystemAlert type
  const alerts = [
    {
      id: uuidv4(),
      title: "Budget Overrun",
      message: "Project A has exceeded budget by 20%",
      type: "financial" as const, // Change from "budget" to "financial"
      priority: "high" as const,
      severity: "high" as const,
      timestamp: new Date(),
      read: false,
      data: { projectId: "1", budgetExceeded: 20000 }
      // Remove actionRequired as it's not in the SystemAlert type
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
      // Remove actionRequired as it's not in the SystemAlert type
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
      // Remove actionRequired as it's not in the SystemAlert type
    }
  ];

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

  return {
    getProjects,
    getContracts,
    getTeams,
    getAlerts
  };
};

export default useExecutiveDashboard;
