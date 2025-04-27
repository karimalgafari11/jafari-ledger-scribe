
import { assetAccounts } from './assets';
import { liabilityAccounts } from './liabilities';
import { equityAccounts } from './equity';
import { revenueAccounts } from './revenue';
import { expenseAccounts } from './expenses';

export const mockAccounts = [
  ...assetAccounts,
  ...liabilityAccounts,
  ...equityAccounts,
  ...revenueAccounts,
  ...expenseAccounts
];

export {
  assetAccounts,
  liabilityAccounts,
  equityAccounts,
  revenueAccounts,
  expenseAccounts
};
