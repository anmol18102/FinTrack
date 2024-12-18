import { trpc } from '../utils/trpc';
import { UserList } from '../components/UserList';
import { WalletList } from '../components/WalletList';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6">
          <UserList />
          <WalletList />
        </div>
      </main>
    </div>
  );
}