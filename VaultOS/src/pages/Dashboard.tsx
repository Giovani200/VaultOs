import { useState } from 'react';
import getMockData from '../data/mockData';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';

export default function Dashboard() {
  const { user, recentTransactions } = getMockData();
  const [selectedAccount] = useState(user.accounts[0]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bienvenue, {user.firstName}
        </h1>
        <p className="text-gray-600">
          Gérez votre compte et consultez vos transactions
        </p>
      </div>

      {/* Balance Card */}
      <BalanceCard account={selectedAccount} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left">
          <span className="text-2xl mb-2 block">💸</span>
          <h3 className="font-semibold text-gray-900">Virement</h3>
          <p className="text-sm text-gray-600">Envoyer de l'argent</p>
        </button>
        <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left">
          <span className="text-2xl mb-2 block">💳</span>
          <h3 className="font-semibold text-gray-900">Mes cartes</h3>
          <p className="text-sm text-gray-600">Gérer les cartes bancaires</p>
        </button>
        <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left">
          <span className="text-2xl mb-2 block">📊</span>
          <h3 className="font-semibold text-gray-900">Statistiques</h3>
          <p className="text-sm text-gray-600">Analyser les dépenses</p>
        </button>
      </div>

      {/* Recent Transactions */}
      <TransactionList 
        transactions={recentTransactions} 
        title="Transactions récentes"
      />
    </div>
  );
}
