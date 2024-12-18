import { trpc } from '../utils/trpc';

export function WalletList() {
  const utils = trpc.useContext();
  const { data: wallets, isLoading } = trpc.wallet.getAll.useQuery();
  const toggleFreeze = trpc.wallet.toggleFreeze.useMutation({
    onSuccess: () => utils.wallet.getAll.invalidate(),
  });

  if (isLoading) return <div>Loading wallets...</div>;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Wallet Management</h2>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {wallets?.map((wallet) => (
            <li key={wallet.id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Wallet ID: {wallet.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Balance: ${wallet.balance.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => toggleFreeze.mutate({
                    walletId: wallet.id,
                    isActive: !wallet.isActive,
                  })}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    wallet.isActive
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {wallet.isActive ? 'Freeze' : 'Unfreeze'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}