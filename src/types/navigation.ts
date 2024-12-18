import { Transaction } from './wallet';

export type RootStackParamList = {
  Home: undefined;
  Transactions: undefined;
  NewTransaction: undefined;
  TransactionDetail: { transaction: Transaction };
  Profile: undefined;
  Settings: undefined;
};