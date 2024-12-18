import * as React from "react";
import { useWalletStore } from "../../stores/walletStore";
import { TransactionCategory, TransactionType } from "../../types";
import { api } from "../../utils/api";

const CATEGORIES: TransactionCategory[] = [
  'SAVINGS', 'FOOD', 'SALARY', 'ENTERTAINMENT',
  'TRANSPORTATION', 'UTILITIES', 'OTHER'
];

export function NewTransactionScreen({ route, navigation }) {
  const { type = 'SEND' } = route.params;
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState<TransactionCategory>('OTHER');
  const [description, setDescription] = React.useState('');
  const [isRecurring, setIsRecurring] = React.useState(false);
  const [recurringInterval, setRecurringInterval] = React.useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('MONTHLY');
  const { addTransaction } = useWalletStore();

  const handleSubmit = async () => {
    try {
      const transaction = await api.createTransaction({
        type: type as TransactionType,
        amount: parseFloat(amount),
        category,
        description,
        isRecurring,
        recurringInterval: isRecurring ? recurringInterval : undefined,
        createdAt: new Date(),
      });
      
      addTransaction(transaction);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to create transaction:', error);
    }
  };

  return (
    <scrollView className="flex-1 bg-gray-50">
      <stackLayout className="p-4 space-y-4">
        {/* Amount Input */}
        <stackLayout className="bg-white p-4 rounded-lg">
          <label className="text-gray-600 mb-2">Amount</label>
          <textField
            className="border-b border-gray-300 p-2 text-2xl"
            keyboardType="number"
            hint="Enter amount"
            text={amount}
            onTextChange={(e) => setAmount(e.value)}
          />
        </stackLayout>

        {/* Category Selection */}
        <stackLayout className="bg-white p-4 rounded-lg">
          <label className="text-gray-600 mb-2">Category</label>
          <listView
            items={CATEGORIES}
            className="h-40"
            onItemTap={(event) => setCategory(CATEGORIES[event.index])}
          >
            <listView.itemTemplate>
              <gridLayout columns="auto, *" className={`p-2 ${category === '$value' ? 'bg-blue-50' : ''}`}>
                <label col="1" text="$value" className="text-lg" />
              </gridLayout>
            </listView.itemTemplate>
          </listView>
        </stackLayout>

        {/* Description Input */}
        <stackLayout className="bg-white p-4 rounded-lg">
          <label className="text-gray-600 mb-2">Description (Optional)</label>
          <textField
            className="border-b border-gray-300 p-2"
            hint="Enter description"
            text={description}
            onTextChange={(e) => setDescription(e.value)}
          />
        </stackLayout>

        {/* Recurring Transaction */}
        <stackLayout className="bg-white p-4 rounded-lg">
          <flexboxLayout className="justify-between items-center">
            <label className="text-gray-600">Recurring Transaction</label>
            <switch checked={isRecurring} onCheckedChange={(e) => setIsRecurring(e.value)} />
          </flexboxLayout>

          {isRecurring && (
            <listView
              items={['DAILY', 'WEEKLY', 'MONTHLY']}
              className="h-32 mt-2"
              onItemTap={(event) => setRecurringInterval(event.object.items[event.index])}
            >
              <listView.itemTemplate>
                <gridLayout columns="auto, *" className={`p-2 ${recurringInterval === '$value' ? 'bg-blue-50' : ''}`}>
                  <label col="1" text="$value" className="text-lg" />
                </gridLayout>
              </listView.itemTemplate>
            </listView>
          )}
        </stackLayout>

        {/* Submit Button */}
        <button
          className={`p-4 rounded-lg text-white text-lg ${
            amount ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          text="Create Transaction"
          isEnabled={!!amount}
          onTap={handleSubmit}
        />
      </stackLayout>
    </scrollView>
  );
}