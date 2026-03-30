import { useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { cn } from '../../lib/utils';
import useWalletStore from '../../store/wallet.store';
import { formatCurrency } from '../../utils/number';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { compileTransactionsByMonth, getLastMonths } from './utils/dashboard.utils';

export const Dashboard = () => {
  const { account } = useWalletStore();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const months = getLastMonths(isMobile ? 3 : 6);

  const history = compileTransactionsByMonth(account?.history.transactions || []);

  const handleInteraction = (month: string, year: number) => {
    const key = `${month} ${year}`;
    if (selectedMonth !== key) {
      setSelectedMonth(key);
    }
  }
  return (
    <div className='h-full flex flex-col items-center justify-between'>
      <div className='flex flex-col gap-2 mt-2 max-sm:mt-0 max-sm:mb-4'>
        <p className="text-kredix-text text-3xl">Monthly Analytics</p>
        <p className='text-xs text-kredix-text/70 text-left'>Spending Overview</p>
      </div>
      <div className='flex w-full justify-between text-kredix-text flex-1 max-w-200'>
        {months.map(({ month, year }, index) => (
          <Popover key={month + year} onOpenChange={(open) => !open ? setSelectedMonth(null) : handleInteraction(month, year)}>
            <PopoverTrigger asChild className='flex flex-col items-center gap-2 h-min my-auto' id={`${month} ${year}`} >
              <div key={index} className='flex flex-col justify-center items-center' >
                <div className={cn('h-30 w-16 bg-neutral-600 rounded-t-full rounded-b-full relative cursor-pointer', {
                  'bg-primary': selectedMonth === `${month} ${year}`,
                })}>
                  <div className={cn('absolute bottom-0 left-0 right-0 bg-neutral-700 rounded-b-full z-10',{
                    'rounded-t-full': (history[`${month} ${year}`]?.expensePercentage || 0) >= 75,
                    'bg-accent': selectedMonth === `${month} ${year}`,
                  })} style={{ height: `${(history[`${month} ${year}`]?.expensePercentage || 0)}%` }} />
                </div>
                <span className='capitalize'>{month} {year}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className='bg-neutral-600 text-kredix-text p-2 rounded-md' popoverTarget="pointer">
              <div className='flex flex-col'>
                <p className='text-lg font-bold mb-4! text-accent capitalize'>{month} {year}</p>
                <p className='text-sm'>Income: R${formatCurrency(history[`${month} ${year}`]?.income || 0)}</p>
                <p className='text-sm'>Expenses: R${formatCurrency(history[`${month} ${year}`]?.expense || 0)}</p>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
};