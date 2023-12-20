import React, { useState, useEffect } from 'react';
import '../components/expensehistory.css'; // Import your CSS file for styling

const ExpenseHistory = () => {
  // Assuming you have an array of monthly data, where each object has a 'month' and 'expense' property
  const monthlyData = [
    { month: 'Jan', expense: 500 },
    { month: 'Feb', expense: 600 },
    // ... add more months
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Replace with a loading spinner or other UI
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
