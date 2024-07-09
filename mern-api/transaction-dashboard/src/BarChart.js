import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTransactionBarChartData } from './api';

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await getTransactionBarChartData(month);
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: 'Number of Items',
              data: data.counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch bar chart data:', error);
      }
    };

    fetchChartData();
  }, [month]);

  const monthName = new Date(0, month - 1).toLocaleString('en', { month: 'long' });

  return (
    <div className="bar-chart">
      <h3>Bar Chart Stats - {monthName}</h3>
      <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default BarChart;
