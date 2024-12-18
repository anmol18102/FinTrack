export type TransactionType = 'SEND' | 'RECEIVE';

export type TransactionCategory = 
  | 'SAVINGS' 
  | 'FOOD' 
  | 'SALARY' 
  | 'ENTERTAINMENT'
  | 'TRANSPORTATION'
  | 'UTILITIES'
  | 'OTHER';

export interface Transaction {
  id: string;
  walletId: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  description?: string;
  createdAt: Date;
  isRecurring?: boolean;
  recurringInterval?: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  nextRecurringDate?: Date;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  transactions: Transaction[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}