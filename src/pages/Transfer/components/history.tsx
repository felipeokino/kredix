import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import useWalletStore from "../../../store/wallet.store";
import { formatCurrency } from "../../../utils/number";

const HistoryItem = ({ description, amount, date }: { description?: string; amount: number; date: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-neutral-700">
    <div>
      <p className="text-kredix-text font-semibold">{description || 'No description'}</p>
      <p className="text-sm text-neutral-500">{date}</p>
    </div>
    <p className={cn('flex justify-between min-w-20 gap-1 items-center text-kredix-text font-semibold',
      {
        'text-accent': amount > 0,
      }
    )}>
      <span>R$</span>
      <span>{formatCurrency(amount, 'auto')}</span>
    </p>
  </div>
);
export const History = () => {
  const { account } = useWalletStore();

  const transactions = useMemo(() => {
    if (!account) return [];
    return account.history.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [account]);

  return (
    <div className="p-6">
      <h2 className="text-kredix-text text-2xl font-semibold mb-4">Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="text-kredix-text text-sm">No transactions found.</p>
      ) : (
        transactions.map(tx => (
          <HistoryItem key={tx.id} description={tx.description} amount={tx.type === 'credit' ? tx.amount : -tx.amount} date={new Date(tx.date).toLocaleDateString()} />
        ))
      )}
    </div>
  )
}