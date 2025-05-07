
import { RouteObject } from "react-router-dom";
import { receivablesRoutes } from "./receivablesRoutes";
import { payablesRoutes } from "./payablesRoutes";

export const receivablesPayablesRoutes: RouteObject[] = [
  ...receivablesRoutes,
  ...payablesRoutes,
];
