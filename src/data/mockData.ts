import type { User, Account, Transaction } from '../types/index';

const mockAccounts: Account[] = [
  {
    id: 'acc_001',
    name: 'Compte Courant',
    accountNumber: 'FR1420041010050500013M02606',
    balance: 3250.5,
    currency: 'EUR',
    cardNumber: '4532 **** **** 1234',
    cardStatus: 'active',
  },
  {
    id: 'acc_002',
    name: 'Compte Epargne',
    accountNumber: 'FR1420041010050500013M02607',
    balance: 15000.0,
    currency: 'EUR',
  },
];

const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    date: new Date('2026-05-07'),
    description: 'Paiement Spotify',
    amount: 12.99,
    type: 'expense',
    category: 'Divertissement',
  },
  {
    id: 'txn_002',
    date: new Date('2026-05-06'),
    description: 'Virement salaire',
    amount: 2500.0,
    type: 'income',
    category: 'Salaire',
  },
  {
    id: 'txn_003',
    date: new Date('2026-05-05'),
    description: 'Amazon Prime',
    amount: 9.99,
    type: 'expense',
    category: 'Divertissement',
  },
  {
    id: 'txn_004',
    date: new Date('2026-05-04'),
    description: 'Carrefour Supermarche',
    amount: 87.45,
    type: 'expense',
    category: 'Courses',
  },
  {
    id: 'txn_005',
    date: new Date('2026-05-03'),
    description: 'Virement a Martin',
    amount: 50.0,
    type: 'transfer',
    category: 'Transfert',
  },
  {
    id: 'txn_006',
    date: new Date('2026-05-02'),
    description: 'Shell Station',
    amount: 65.0,
    type: 'expense',
    category: 'Transport',
  },
  {
    id: 'txn_007',
    date: new Date('2026-05-01'),
    description: 'Netflix',
    amount: 15.99,
    type: 'expense',
    category: 'Divertissement',
  },
  {
    id: 'txn_008',
    date: new Date('2026-04-30'),
    description: 'Remboursement Uber',
    amount: 24.5,
    type: 'income',
    category: 'Remboursement',
  },
];

const mockUser: User = {
  id: 'user_001',
  firstName: 'Giovanni',
  lastName: 'Rousseau',
  email: 'giovanni.rousseau@example.com',
  phoneNumber: '+33 6 12 34 56 78',
  registeredAt: new Date('2024-01-15'),
  accounts: mockAccounts,
};

export const getMockData = () => ({
  user: mockUser,
  accounts: mockAccounts,
  transactions: mockTransactions,
  recentTransactions: mockTransactions.slice(0, 5),
});

export default getMockData;
