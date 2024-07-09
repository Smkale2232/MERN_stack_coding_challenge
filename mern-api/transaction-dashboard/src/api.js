export const getTransactions = async (month, page, searchQuery) => {
  const response = await fetch(`http://localhost:3000/transactions?month=${month}&search=${searchQuery}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  const data = await response.json();
  return data.transactions;
};

export const getTransactionStats = async (month) => {
  const response = await fetch(`http://localhost:3000/transactions/stats?month=${month}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transaction stats');
  }
  const data = await response.json();
  return data;
};

export const getTransactionBarChartData = async (month) => {
  const response = await fetch(`http://localhost:3000/bar-chart?month=${month}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transaction bar chart data');
  }
  const data = await response.json();
  return data;
};
