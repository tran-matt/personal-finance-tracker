// expenses.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    // Fetch expenses from the server when the component mounts
    fetch('/expenses')
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  const handleAddExpense = () => {
    // Make a POST request to add a new expense
    fetch('/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    })
      .then((response) => response.json())
      .then((data) => {
        setExpenses((prevExpenses) => [...prevExpenses, data]);
        setNewExpense({ amount: 0, category: '' }); // Clear the form
      })
      .catch((error) => console.error('Error adding expense:', error));
  };

  const handleDeleteExpense = (id) => {
    // Make a DELETE request to delete an expense
    fetch(`/expenses/${id}`, {
      method: 'DELETE',
    })
      .then(() => setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id)))
      .catch((error) => console.error('Error deleting expense:', error));
  };

  return (
    <div>
      <h1>Expenses</h1>
      
      {/* Add New Expense Form */}
      <form>
        <label>
          Amount:
          <input type="number" name="amount" value={newExpense.amount} onChange={handleInputChange} />
        </label>
        <label>
          Category:
          {/* Use a select element for the dropdown list of categories */}
          <select name="category" value={newExpense.category} onChange={handleInputChange}>
            <option value="">Select a category</option>
            {BUDGET_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={handleAddExpense}>
          Add Expense
        </button>
      </form>

      {/* List of Expenses */}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            Amount: {expense.amount}, Category: {expense.category}{' '}
            <button type="button" onClick={() => handleDeleteExpense(expense.id)}>
              Delete
            </button>
            {/* Add an edit button with a link to the edit page */}
            <Link to={`/expenses/${expense.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
