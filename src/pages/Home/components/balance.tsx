import { useQuery } from '@tanstack/react-query';
import useWalletStore from '../../../store/wallet.store';
import { formatCurrency } from '../../../utils/number';

export const Balance = () => {
  const { getBalance } = useWalletStore();
  
  const { data: balance } = useQuery({
    queryKey: ['balance'],
    queryFn: () => getBalance(),
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex flex-col w-full items-start gap-4">
      <span className="text-sm text-kredix-text font-semibold mb-4 uppercase">Current Balance</span>
      <p className="text-kredix-text">
        R$
        <span className="text-[70px] max-sm:text-[60px] text-kredix-text font-semibold mb-4">{formatCurrency(balance ?? 0)}</span>
      </p>
    </div>
  );
};