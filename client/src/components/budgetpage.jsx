// budgetpage.jsx
import React, { useState, useEffect } from 'react';

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ monthly_pay: 0, savings_goal: 0, user_id: 0 });
  const [editBudgetId, setEditBudgetId] = useState(null);

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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBudget),
    })
      .then((response) => response.json())
      .then((data) => {
        setBudgets((prevBudgets) => [...prevBudgets, data]);
        setNewBudget({ monthly_pay: 0, savings_goal: 0, user_id: 0 });
      })
      .catch((error) => console.error('Error adding budget:', error));
  };

  const handleEditBudget = (id) => {
    // Fetch the budget data to populate the form for editing
    fetch(`http://localhost:5555/budgets/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Populate your form fields with the data received
        // ...
  
        // Now you can make changes and send a PATCH request to update the budget
        fetch(`http://localhost:5555/budgets/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ /* your updated data */ }),
        })
          .then((response) => response.json())
          .then((updatedData) => {
            // Handle the updated data as needed
            // ...
          })
          .catch((error) => console.error('Error updating budget:', error));
      })
      .catch((error) => console.error('Error fetching budget data:', error));
  };
  

  const handleUpdateBudget = () => {
    // Make a PATCH request to update the existing budget
    fetch(`http://localhost:5555/budgets/${editBudgetId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBudget),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the budget in the state
        setBudgets((prevBudgets) =>
          prevBudgets.map((budget) => (budget.id === editBudgetId ? data : budget))
        );

        // Clear the edit mode
        setEditBudgetId(null);
        setNewBudget({ monthly_pay: 0, savings_goal: 0, user_id: 0 });
      })
      .catch((error) => console.error('Error updating budget:', error));
  };

  const handleDeleteBudget = (id) => {
    fetch(`http://localhost:5555/budgets/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete budget (HTTP ${response.status})`);
        }
        return response.json();
      })
      .then(() => setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget.id !== id)))
      .catch((error) => console.error('Error deleting budget:', error.message));
  };

  return (
    <div>
      <h1>Budgets</h1>

      {/* Add/Edit Budget Form */}
      <form>
        <label>
          Monthly Pay:
          <input
            type="number"
            name="monthly_pay"
            value={newBudget.monthly_pay}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Savings Goal:
          <input
            type="number"
            name="savings_goal"
            value={newBudget.savings_goal}
            onChange={handleInputChange}
          />
        </label>
        <label>
          User ID:
          <input type="number" name="user_id" value={newBudget.user_id} onChange={handleInputChange} />
        </label>
        {editBudgetId ? (
          <button type="button" onClick={handleUpdateBudget}>
            Update Budget
          </button>
        ) : (
          <button type="button" onClick={handleAddBudget}>
            Add Budget
          </button>
        )}
      </form>

      {/* List of Budgets */}
      <ul>
        {budgets.map((budget) => (
          <li key={budget.id}>
            Monthly Pay: {budget.monthly_pay}, Savings Goal: {budget.savings_goal}{' '}
            <button type="button" onClick={() => handleDeleteBudget(budget.id)}>
              Delete
            </button>
            <button type="button" onClick={() => handleEditBudget(budget.id)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetPage;
