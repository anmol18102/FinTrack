import * as React from "react";
import { useWalletStore } from "../../stores/walletStore";
import { TransactionList } from "../transaction/TransactionList";
import { TransactionCategory, TransactionType } from "../../types";

export function TransactionsScreen({ navigation }) {
  const { wallet } = useWalletStore();
  const [selectedType, setSelectedType] = React.useState<TransactionType | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = React.useState<TransactionCategory | 'ALL'>('ALL');

  const filteredTransactions = React.useMemo(() => {
    if (!wallet?.transactions) return [];
    
    return wallet.transactions
      .filter(t => selectedType === 'ALL' || t.type === selectedType)
      .filter(t => selectedCategory === 'ALL' || t.category === selectedCategory)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [wallet?.transactions, selectedType, selectedCategory]);

  return (
    <flexboxLayout className="flex-1">
      {/* Filters */}
      <stackLayout className="p-4 bg-white border-b border-gray-200">
        <scrollView orientation="horizontal" className="mb-4">
          <flexboxLayout className="space-x-2">
            {['ALL', 'SEND', 'RECEIVE'].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-full ${
                  selectedType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                text={type}
                onTap={() => setSelectedType(type as TransactionType | 'ALL')}
              />
            ))}
          </flexboxLayout>
        </scrollView>

        <scrollView orientation="horizontal">
          <flexboxLayout className="space-x-2">
            {['ALL', 'SAVINGS', 'FOOD', 'SALARY', 'ENTERTAINMENT', 'TRANSPORTATION', 'UTILITIES', 'OTHER'].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                text={category}
                onTap={() => setSelectedCategory(category as TransactionCategory | 'ALL')}
              />
            ))}
          </flexboxLayout>
        </scrollView>
      </stackLayout>

      {/* Transaction List */}
      <TransactionList
        transactions={filteredTransactions}
        onTransactionPress={(transaction) => 
          navigation.navigate("TransactionDetail", { transaction })
        }
      />

      {/* FAB for new transaction */}
      <button
        className="bg-blue-500 text-white rounded-full w-14 h-14 text-2xl"
        text="+"
        onTap={() => navigation.navigate("NewTransaction")}
        style={{
          horizontalAlignment: "right",
          verticalAlignment: "bottom",
          margin: 16
        }}
      />
    </flexboxLayout>
  );
}