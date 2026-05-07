import type { Account } from '../types/index';
import Card from './Card';

interface BalanceCardProps {
  account: Account;
}

export default function BalanceCard({ account }: BalanceCardProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden relative" variant="gradient">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 opacity-10 text-9xl">💳</div>
      <div className="absolute bottom-0 left-0 opacity-10 text-9xl">💰</div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-blue-100 text-sm mb-1">Solde disponible</p>
            <h2 className="text-5xl font-bold tracking-tight">{account.balance.toLocaleString('fr-FR', {
              style: 'currency',
              currency: account.currency,
            })}</h2>
          </div>
          <span className="text-4xl animate-bounce">💳</span>
        </div>
        
        <div className="border-t border-blue-400 pt-6 flex justify-between items-end">
          <div>
            <p className="text-blue-100 text-xs mb-1 uppercase tracking-widest">Numéro de compte</p>
            <p className="text-sm font-mono font-semibold">{account.accountNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-xs mb-1 uppercase tracking-widest">Statut</p>
            <p className={`text-sm font-semibold ${account.cardStatus === 'active' ? 'text-green-300' : 'text-yellow-300'}`}>
              {account.cardStatus === 'active' ? '✓ Actif' : '⚠ Inactif'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
