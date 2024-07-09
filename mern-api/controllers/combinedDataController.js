import fetch from 'node-fetch';

export const getCombinedData = async (req, res) => {
  try {
    // URLs of your existing APIs
    const transactionsUrl = 'http://localhost:3000/transactions?page=1&perPage=10';
    const statsUrl = 'http://localhost:3000/stats?month=November';
    const barChartUrl = 'http://localhost:3000/bar-chart?month=November';

    // Fetch data from all APIs in parallel
    const [transactionsResponse, statsResponse, barChartResponse] = await Promise.all([
      fetch(transactionsUrl).then(res => res.json()),
      fetch(statsUrl).then(res => res.json()),
      fetch(barChartUrl).then(res => res.json())
    ]);

    // Combine responses into a single object
    const combinedData = {
      transactions: transactionsResponse,
      stats: statsResponse,
      barChart: barChartResponse
    };

    res.json(combinedData);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};