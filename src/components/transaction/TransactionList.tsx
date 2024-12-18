import * as React from "react";
import { Transaction } from "../../types";
import { TransactionCard } from "./TransactionCard";

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionPress: (transaction: Transaction) => void;
}

export function TransactionList({ transactions, onTransactionPress }: TransactionListProps) {
  return (
    <scrollView className="flex-1">
      <stackLayout className="p-4">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onPress={onTransactionPress}
          />
        ))}
      </stackLayout>
    </scrollView>
  );
}