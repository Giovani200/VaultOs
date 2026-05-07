import getMockData from '../data/mockData';
import Card from '../components/Card';
import type { Account } from '../types/index';

export default function Account() {
  const { user } = getMockData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mon compte
        </h1>
        <p className="text-gray-600">
          Gérez les paramètres de votre compte
        </p>
      </div>

      {/* Personal Information */}
      <Card title="Informations personnelles">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
            <p className="text-gray-900 font-medium">{user.firstName}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
            <p className="text-gray-900 font-medium">{user.lastName}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <p className="text-gray-900 font-medium">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
            <p className="text-gray-900 font-medium">{user.phoneNumber}</p>
          </div>
        </div>
      </Card>

      {/* Bank Accounts */}
      <Card title="Comptes bancaires">
        <div className="space-y-4">
          {user.accounts.map((account: Account) => (
            <div key={account.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{account.name}</h3>
                  <p className="text-sm text-gray-600">{account.accountNumber}</p>
                </div>
                <span className="text-2xl">💳</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-gray-900">
                  {account.balance.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: account.currency,
                  })}
                </p>
                <span className={`text-sm font-semibold ${
                  account.cardStatus === 'active' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {account.cardStatus === 'active' ? '✓ Actif' : '✗ Inactif'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Settings */}
      <Card title="Paramètres">
        <div className="space-y-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
            Modifier les paramètres
          </button>
          <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg transition-colors">
            Modifier le mot de passe
          </button>
          <button className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded-lg transition-colors">
            Supprimer le compte
          </button>
        </div>
      </Card>
    </div>
  );
}
