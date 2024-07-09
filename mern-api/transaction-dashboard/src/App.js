import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TransactionsTable from './TransactionsTable';
import TransactionStats from './TransactionStats';
import BarChart from './BarChart';
import { getTransactions } from './api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('03'); // Default to March
  const [page, setPage] = useState(1);

  const fetchTransactions = useCallback(async () => {
    try {
      const data = await getTransactions(selectedMonth, page, searchTerm);
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  }, [selectedMonth, page, searchTerm]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="container">
      <div className="dashboard">
        <h2>Transaction Dashboard</h2>
        <div className="controls">
          <input
            type="text"
            id="search-box"
            placeholder="Search transaction"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                {new Date(0, i).toLocaleString('en', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <TransactionStats month={selectedMonth} />
        <BarChart month={selectedMonth} />
        <TransactionsTable transactions={transactions} />
        <div className="pagination">
          <button onClick={handlePrevious} disabled={page === 1}>
            Previous
          </button>
          <span>Page No: {page}</span>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
