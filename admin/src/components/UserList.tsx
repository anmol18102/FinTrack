import { trpc } from '../utils/trpc';

export function UserList() {
  const utils = trpc.useContext();
  const { data: users, isLoading } = trpc.user.getAll.useQuery();
  const toggleActive = trpc.user.toggleActive.useMutation({
    onSuccess: () => utils.user.getAll.invalidate(),
  });
  const resetCredentials = trpc.user.resetCredentials.useMutation();

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">User Management</h2>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {users?.map((user) => (
            <li key={user.id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleActive.mutate({
                      userId: user.id,
                      isActive: !user.isActive,
                    })}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      user.isActive
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => resetCredentials.mutate({ userId: user.id })}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium"
                  >
                    Reset Credentials
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}