import type { Transaction } from '../types/index';
import Card from './Card';

interface TransactionItemProps {
  transaction: Transaction;
}

function TransactionItem({ transaction }: TransactionItemProps) {
  const isExpense = transaction.type === 'expense';
  const isIncome = transaction.type === 'income';
  
  const getIcon = () => {
    switch (transaction.type) {
      case 'expense':
        return '💸';
      case 'income':
        return '📥';
      case 'transfer':
        return '↔️';
      default:
        return '💳';
    }
  };

  const getAmountColor = () => {
    if (isExpense) return 'text-red-600';
    if (isIncome) return 'text-green-600';
    return 'text-blue-600';
  };

  const getAmountSign = () => {
    if (isExpense) return '-';
    if (isIncome) return '+';
    return '';
  };

  const getBgColor = () => {
    if (isExpense) return 'bg-red-50';
    if (isIncome) return 'bg-green-50';
    return 'bg-blue-50';
  };

  return (
    <div className={`flex items-center justify-between py-4 px-4 rounded-lg ${getBgColor()} hover:shadow-md transition-all duration-200 border border-gray-100`}>
      <div className="flex items-center gap-4 flex-1">
        <span className="text-2xl">{getIcon()}</span>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{transaction.description}</p>
          <p className="text-sm text-gray-500">
            {transaction.date.toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-lg ${getAmountColor()}`}>
          {getAmountSign()}{transaction.amount.toLocaleString('fr-FR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}€
        </p>
        <p className="text-xs text-gray-500">{transaction.category}</p>
      </div>
    </div>
  );
}

interface TransactionListProps {
  transactions: Transaction[];
  title?: string;
  limit?: number;
}

export default function TransactionList({ 
  transactions, 
  title = 'Transactions récentes',
  limit 
}: TransactionListProps) {
  const displayedTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <Card title={title}>
      {displayedTransactions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Aucune transaction</p>
      ) : (
        <div className="space-y-2">
          {displayedTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </Card>
  );
}
