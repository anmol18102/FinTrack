import { Transaction, Wallet } from '../types';

const API_BASE_URL = 'YOUR_API_URL';

export const api = {
  async getWallet(userId: string): Promise<Wallet> {
    const response = await fetch(`${API_BASE_URL}/wallets/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch wallet');
    return response.json();
  },

  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('Failed to create transaction');
    return response.json();
  },

  async updateTransaction(
    transactionId: string, 
    updates: Partial<Transaction>
  ): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions/${transactionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update transaction');
    return response.json();
  },
};