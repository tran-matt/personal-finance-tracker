import React, { useState, useEffect } from 'react';
import '../components/expensehistory.css';

const ExpenseHistory = () => {
  const monthlyData = [
    { month: 'Jan', expense: 500 },
    { month: 'Feb', expense: 600 },
  
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Expense History</h1>

      {/* Display Bar Chart */}
      <div className="bar-chart">
        {monthlyData.map((data) => (
          <div key={data.month} className="bar" style={{ height: `${data.expense}px` }}>
            {data.expense}
          </div>
        ))}
      </div>

      {/* List of Monthly Expenses */}
      <ul>
        {monthlyData.map((data) => (
          <li key={data.month}>
            {data.month}: {data.expense}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseHistory;
