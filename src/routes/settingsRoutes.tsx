
import { RouteObject } from "react-router-dom";
import SystemSettingsPage from "@/pages/settings/SystemSettingsPage";
import UserRolesPage from "@/pages/settings/UserRolesPage";
import UsersPage from "@/pages/settings/UsersPage";
import BackupPage from "@/pages/settings/BackupPage";
import BackupTestPage from "@/pages/settings/BackupTestPage";
import ActivityLogPage from "@/pages/settings/ActivityLogPage";
import BranchesPage from "@/pages/settings/BranchesPage";
import NotificationsPage from "@/pages/settings/NotificationsPage";
import NotificationSettingsPage from "@/pages/settings/NotificationSettingsPage";
import SendNotificationPage from "@/pages/settings/SendNotificationPage";
import AiEngineSettingsPage from "@/pages/settings/AiEngineSettingsPage";
import PageManagementPage from "@/pages/settings/PageManagementPage";
import ThemeCustomizationPage from "@/pages/settings/ThemeCustomizationPage";

export const settingsRoutes: RouteObject[] = [
  { path: "settings/system", element: <SystemSettingsPage /> },
  { path: "settings/roles", element: <UserRolesPage /> },
  { path: "settings/users", element: <UsersPage /> },
  { path: "settings/backup", element: <BackupPage /> },
  { path: "settings/backup-test", element: <BackupTestPage /> },
  { path: "settings/activity-log", element: <ActivityLogPage /> },
  { path: "settings/branches", element: <BranchesPage /> },
  { path: "settings/notifications", element: <NotificationsPage /> },
  { path: "settings/notification-settings", element: <NotificationSettingsPage /> },
  { path: "settings/send-notification", element: <SendNotificationPage /> },
  { path: "settings/ai-engine", element: <AiEngineSettingsPage /> },
  { path: "settings/page-management", element: <PageManagementPage /> },
  { path: "settings/theme", element: <ThemeCustomizationPage /> }
];
