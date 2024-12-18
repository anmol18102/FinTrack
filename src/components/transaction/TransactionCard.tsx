import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { Transaction } from "../../types";
import { formatTransactionDate, formatCurrency } from "../../utils/date";

interface TransactionCardProps {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
}

export function TransactionCard({ transaction, onPress }: TransactionCardProps) {
  const isIncome = transaction.type === 'RECEIVE';

  return (
    <gridLayout
      className={`p-4 mb-2 rounded-lg ${isIncome ? 'bg-green-50' : 'bg-red-50'}`}
      rows="auto, auto"
      columns="*, auto"
      onTap={() => onPress(transaction)}
    >
      <label
        row={0}
        col={0}
        className="font-semibold"
        text={transaction.description || transaction.category}
      />
      <label
        row={0}
        col={1}
        className={`font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}
        text={formatCurrency(transaction.amount)}
      />
      <label
        row={1}
        col={0}
        className="text-sm text-gray-500"
        text={formatTransactionDate(transaction.createdAt)}
      />
      {transaction.isRecurring && (
        <label
          row={1}
          col={1}
          className="text-sm text-blue-500"
          text="Recurring"
        />
      )}
    </gridLayout>
  );
}