export interface Transaction {
  date: string | Date | number;
  type: 'income' | 'expense';
  amount: number;
}

type CompiledResult = Record<string, { income: number; expense: number; balance: number; expensePercentage: number }>;


export const getLastMonths = (monthsCount = 6, locale = "pt-BR") => {
  const result = [];
  const currentDate = new Date();
  
  currentDate.setDate(1);

  for (let i = 0; i < monthsCount; i++) {
    const month = currentDate.toLocaleString(locale, { month: "short" });
    const year = currentDate.getFullYear();
    
    result.unshift({ month, year });
    currentDate.setMonth(currentDate.getMonth() - 1);
  }

  return result;
};

export const getWeekDays = (daysCount = 7, locale = "pt-BR") => {
  const days = [];
  const currentDate = new Date();

  for (let i = 0; i < daysCount; i++) {
    const day = currentDate.toLocaleString(locale, { weekday: "short" });
    
    days.unshift(day);
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return days;
};

const compileTransactions = (
  transactions: Transaction[],
  getKey: (date: Date) => string
): CompiledResult => {
  
  const compiled = transactions.reduce((acc, tx) => {
    const date = new Date(tx.date);
    const key = getKey(date);

    if (!acc[key]) {
      acc[key] = { income: 0, expense: 0, balance: 0, expensePercentage: 0 };
    }

    acc[key][tx.type] += tx.amount;
    return acc;
  }, {} as CompiledResult);

  // Calcula balanço e porcentagem apenas no final, reaproveitando código
  Object.values(compiled).forEach(item => {
    item.balance = item.income - item.expense;
    item.expensePercentage = item.income > 0 ? (item.expense / item.income) * 100 : 0;
  });

  return compiled;
};


export const compileTransactionsByDay = (transactions: Transaction[], locale = "pt-BR") => {
  return compileTransactions(transactions, (date) => date.toLocaleDateString(locale));
};

export const compileTransactionsByMonth = (transactions: Transaction[], locale = "pt-BR") => {
  return compileTransactions(transactions, (date) => 
    `${date.toLocaleString(locale, { month: "short" })} ${date.getFullYear()}`
  );
};