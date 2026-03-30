import type { Transaction } from '../types/user';

export const sortTransactionsByDate = (transactions: Transaction[], ascending: boolean = false) => {
  return transactions.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}