import * as React from "react";
import { useWalletStore } from "../../stores/walletStore";
import { formatCurrency } from "../../utils/date";
import { TransactionList } from "../transaction/TransactionList";

export function HomeScreen({ navigation }) {
  const { wallet } = useWalletStore();
  const recentTransactions = wallet?.transactions.slice(0, 5) || [];

  return (
    <flexboxLayout className="flex-1">
      {/* Balance Card */}
      <stackLayout className="p-6 bg-blue-500">
        <label className="text-white text-lg">Current Balance</label>
        <label className="text-white text-3xl font-bold">
          {formatCurrency(wallet?.balance || 0)}
        </label>
      </stackLayout>

      {/* Quick Actions */}
      <gridLayout rows="auto" columns="*, *" className="p-4">
        <button
          col={0}
          className="bg-green-500 text-white p-4 m-2 rounded-lg"
          onTap={() => navigation.navigate("NewTransaction", { type: 'RECEIVE' })}
          text="Receive"
        />
        <button
          col={1}
          className="bg-blue-500 text-white p-4 m-2 rounded-lg"
          onTap={() => navigation.navigate("NewTransaction", { type: 'SEND' })}
          text="Send"
        />
      </gridLayout>

      {/* Recent Transactions */}
      <stackLayout className="flex-1">
        <gridLayout rows="auto" columns="*, auto" className="p-4">
          <label col={0} className="text-lg font-semibold">Recent Transactions</label>
          <button
            col={1}
            className="text-blue-500"
            onTap={() => navigation.navigate("Transactions")}
            text="See All"
          />
        </gridLayout>
        
        <TransactionList
          transactions={recentTransactions}
          onTransactionPress={(transaction) => 
            navigation.navigate("TransactionDetail", { transaction })
          }
        />
      </stackLayout>
    </flexboxLayout>
  );
}