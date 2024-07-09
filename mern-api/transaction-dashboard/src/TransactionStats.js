import React, { useState, useEffect } from 'react';
import { getTransactionStats } from './api';

const TransactionStats = ({ month }) => {
  const [stats, setStats] = useState({ totalSale: 0, totalSoldItems: 0, totalNotSoldItems: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getTransactionStats(month);
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch transaction stats:', error);
      }
    };

    fetchStats();
  }, [month]);

  const monthName = new Date(0, month - 1).toLocaleString('en', { month: 'long' });

  return (
    <div className="stats">
      <h3>Statistics - {monthName}</h3>
      <div className="stats-box">
        <p>Total sale: {stats.totalSale}</p>
        <p>Total sold items: {stats.totalSoldItems}</p>
        <p>Total not sold items: {stats.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default TransactionStats;
