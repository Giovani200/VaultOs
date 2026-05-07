import getMockData from '../data/mockData';
import TransactionList from '../components/TransactionList';

export default function Transactions() {
  const { transactions } = getMockData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Historique des transactions</h1>
        <p className="text-gray-600">Consultez toutes vos transactions</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Rechercher une transaction..."
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tous les types</option>
            <option>Depenses</option>
            <option>Revenus</option>
            <option>Transferts</option>
          </select>
        </div>
      </div>

      <TransactionList transactions={transactions} title="Toutes les transactions" />
    </div>
  );
}
