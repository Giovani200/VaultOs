export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
}

export interface Account {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  currency: string;
  cardNumber?: string;
  cardStatus?: 'active' | 'inactive' | 'blocked';
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  registeredAt: Date;
  accounts: Account[];
}

export interface DashboardData {
  user: User;
  recentTransactions: Transaction[];
}
