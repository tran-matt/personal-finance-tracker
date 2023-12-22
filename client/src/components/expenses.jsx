import React, { useState, useEffect } from 'react';
import '../components/budgetpage.css';

const BUDGET_CATEGORIES = [
  "Housing",
  "Transportation",
  "Food",
  "Insurance",
  "Debt Payments",
  "Personal Care",
  "Entertainment",
  "Savings",
  "Education",
  "Clothing",
  "Gifts/Donations",
  "Miscellaneous"
];

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ amount: 0, category: '' });
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch expenses from the server when the component mounts
    fetch('http://localhost:5555/expenses')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExpenses(data);
        } else {
          console.error('Invalid data structure:', data);
        }
      })
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  const handleAddExpense = () => {
    const amount = parseFloat(newExpense.amount);
  
    fetch('http://localhost:5555/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount, category: newExpense.category, userId: userId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to add expense - ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const expenseWithDate = { ...data, date: new Date().toISOString() };

        setExpenses((prevExpenses) => [expenseWithDate, ...prevExpenses]);
        setNewExpense({ amount: 0, category: '' });
      })
      .catch((error) => console.error('Error adding expense:', error.message));
  };
  
  const handleEditExpense = (id) => {
    setEditExpenseId(id);

    fetch(`http://localhost:5555/expenses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNewExpense(data);
      })
      .catch((error) => console.error('Error fetching expense data:', error));
  };

  const handleUpdateExpense = () => {
    fetch(`http://localhost:5555/expenses/${editExpenseId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    })
      .then((response) => response.json())
      .then((data) => {
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) => (expense.id === editExpenseId ? { ...expense, ...data } : expense))
        );
  
        setEditExpenseId(null);
        setNewExpense({ amount: 0, category: '' });
      })
      .catch((error) => console.error('Error updating expense:', error));
  };
  

  const handleDeleteExpense = (id) => {
    fetch(`http://localhost:5555/expenses/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete expense');
        }
        return response.json();
      })
      .then(() => setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id)))
      .catch((error) => console.error('Error deleting expense:', error));
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleFetchExpenses = () => {
    // Fetch expenses for the specified user ID
    fetch(`http://localhost:5555/expenses/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error('Error fetching expenses:', error));
  };

  return (
    <div>
      <h1>Expenses</h1>

      {/* Add/Edit Expense Form */}
      <form>
        <label>
          User ID:
          <input type="text" name="userId" value={userId} onChange={handleUserIdChange} />
        </label>
        <label>
          Amount:
          <input type="number" name="amount" value={newExpense.amount} onChange={handleInputChange} />
        </label>
        <label>
          Category:
          <select name="category" value={newExpense.category} onChange={handleInputChange}>
            <option value="">Select a category</option>
            {BUDGET_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        {editExpenseId ? (
          <>
            <button type="button" onClick={handleUpdateExpense}>
              Update Expense
            </button>
            <button type="button" onClick={() => setEditExpenseId(null)}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={handleAddExpense}>
            Add Expense
          </button>
        )}
      </form>

      {/* List of Expenses */}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            User ID: {expense.user_id}, Date: {expense.date}, Category: {expense.category}, Amount: {expense.amount}{' '}
            <button type="button" onClick={() => handleDeleteExpense(expense.id)}>
              Delete
            </button>
            <button type="button" onClick={() => handleEditExpense(expense.id)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      {/* Fetch Expenses for User */}
      {/* <div>
        <label>
          Enter User ID to Fetch Expenses:
          <input type="text" value={userId} onChange={handleUserIdChange} />
        </label>
        <button type="button" onClick={handleFetchExpenses}>
          Fetch Expenses
        </button>
      </div> */}
    </div>
  );
};

export default Expenses;
