import { create } from 'zustand';
import { Transaction, Wallet } from '../types';

interface WalletState {
  wallet: Wallet | null;
  isLoading: boolean;
  error: string | null;
}

interface WalletActions {
  setWallet: (wallet: Wallet) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transactionId: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (transactionId: string) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useWalletStore = create<WalletState & WalletActions>((set) => ({
  wallet: null,
  isLoading: false,
  error: null,

  setWallet: (wallet) => set({ wallet }),

  addTransaction: (transaction) =>
    set((state) => ({
      wallet: state.wallet
        ? {
            ...state.wallet,
            transactions: [...state.wallet.transactions, transaction],
            balance:
              state.wallet.balance +
              (transaction.type === 'RECEIVE' ? transaction.amount : -transaction.amount),
          }
        : null,
    })),

  updateTransaction: (transactionId, updates) =>
    set((state) => ({
      wallet: state.wallet
        ? {
            ...state.wallet,
            transactions: state.wallet.transactions.map((t) =>
              t.id === transactionId ? { ...t, ...updates } : t
            ),
          }
        : null,
    })),

  deleteTransaction: (transactionId) =>
    set((state) => ({
      wallet: state.wallet
        ? {
            ...state.wallet,
            transactions: state.wallet.transactions.filter((t) => t.id !== transactionId),
          }
        : null,
    })),

  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
}));