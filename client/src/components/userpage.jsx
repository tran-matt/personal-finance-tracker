import React, { useState, useEffect } from 'react';

const UserPage = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:5555/users/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        setError(data.error || 'Failed to fetch user data');
      }
    } catch (error) {
      setError('An error occurred while fetching user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div>
      <h1>User Page</h1>
      <label>
        Enter User ID:
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <button onClick={fetchUserData}>Fetch User Data</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData && (
        <div>
          <h2>User Information</h2>
          <p>User ID: {userData.id}</p>
          <p>Username: {userData.username}</p>

          <h2>Budgets</h2>
          {userData.budgets.length > 0 ? (
            userData.budgets.map((budget) => (
              <div key={budget.id}>
                <p>Budget ID: {budget.id}</p>
                <p>Monthly Pay: {budget.monthly_pay}</p>
                <p>Savings Goal: {budget.savings_goal}</p>
              </div>
            ))
          ) : (
            <p>No budgets available.</p>
          )}

          <h2>Expenses</h2>
          {userData.expenses.length > 0 ? (
            userData.expenses.map((expense) => (
              <div key={expense.id}>
                <p>Expense ID: {expense.id}</p>
                <p>Amount: {expense.amount}</p>
                <p>Category: {expense.category}</p>
              </div>
            ))
          ) : (
            <p>No expenses available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPage;
