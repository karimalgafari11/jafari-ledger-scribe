
import { RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";
import EmployeesPage from "@/pages/hr/EmployeesPage";
import PositionsPage from "@/pages/hr/PositionsPage";
import TrainingPage from "@/pages/hr/TrainingPage";
import AttendancePage from "@/pages/hr/AttendancePage";
import RewardsPage from "@/pages/hr/RewardsPage";
import EvaluationPage from "@/pages/hr/EvaluationPage";
import RecruitmentPage from "@/pages/hr/RecruitmentPage";
import HRSupportPage from "@/pages/hr/HRSupportPage";

export const hrRoutes: RouteObject[] = [
  {
    path: "hr/employees",
    element: <EmployeesPage />
  },
  {
    path: "hr/positions",
    element: <PositionsPage />
  },
  {
    path: "hr/training",
    element: <TrainingPage />
  },
  {
    path: "hr/attendance",
    element: <AttendancePage />
  },
  {
    path: "hr/rewards",
    element: <RewardsPage />
  },
  {
    path: "hr/evaluation",
    element: <EvaluationPage />
  },
  {
    path: "hr/recruitment",
    element: <RecruitmentPage />
  },
  {
    path: "hr/support",
    element: <HRSupportPage />
  },
];
