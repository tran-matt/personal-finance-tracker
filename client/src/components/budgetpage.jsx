// budgetpage.jsx
import React, { useState, useEffect } from 'react';

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ monthlyPay: 0, savingsGoal: 0 });

  useEffect(() => {
    // Fetch budgets from the server when the component mounts
    fetch('http://localhost:5555/budgets')
      .then((response) => response.json())
      .then((data) => setBudgets(data))
      .catch((error) => console.error('Error fetching budgets:', error));
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget((prevBudget) => ({ ...prevBudget, [name]: value }));
  };

  const handleAddBudget = () => {
    // Make a POST request to add a new budget
    fetch('http://localhost:5555/budgets', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBudget),
    })
      .then((response) => response.json())
      .then((data) => {
        setBudgets((prevBudgets) => [...prevBudgets, data]);
        setNewBudget({ monthlyPay: 0, savingsGoal: 0 });
      })
      .catch((error) => console.error('Error adding budget:', error));
  };

  const handleDeleteBudget = (id) => {
    // Make a DELETE request to delete a budget
    fetch(`/budgets/${id}`, {
      method: 'DELETE',
    })
      .then(() => setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget.id !== id)))
      .catch((error) => console.error('Error deleting budget:', error));
  };

  // Add logic for viewing and editing budgets as needed

  return (
    <div>
      <h1>Budgets</h1>
      
      {/* Add New Budget Form */}
      <form>
        <label>
          Monthly Pay:
          <input type="number" name="monthlyPay" value={newBudget.monthlyPay} onChange={handleInputChange} />
        </label>
        <label>
          Savings Goal:
          <input type="number" name="savingsGoal" value={newBudget.savingsGoal} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleAddBudget}>
          Add Budget
        </button>
      </form>

      {/* List of Budgets */}
      <ul>
        {budgets.map((budget) => (
          <li key={budget.id}>
            Monthly Pay: {budget.monthlyPay}, Savings Goal: {budget.savingsGoal}{' '}
            <button type="button" onClick={() => handleDeleteBudget(budget.id)}>
              Delete
            </button>
            {/* Add an edit button with a link to the edit page */}
            {/* <Link to={`/budgets/${budget.id}/edit`}>Edit</Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetPage;
