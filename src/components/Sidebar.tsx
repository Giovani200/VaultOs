import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/transactions', label: 'Transactions', icon: '💳' },
    { path: '/account', label: 'Mon Compte', icon: '👤' },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen flex flex-col shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🏦</span>
          <div>
            <h2 className="text-2xl font-bold">VaultOS</h2>
            <p className="text-gray-400 text-xs">Néobanque</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-gray-700 space-y-3">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
          <span>⚙️</span>
          <span>Paramètres</span>
        </button>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
          <span>🚪</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
