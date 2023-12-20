

import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Your Personal Finance Tracker!</h1>
      
      <div className="feature-container">
        <div className="feature-text">
          <h2>Track Your Expenses</h2>
          <p>
            Easily monitor your spending habits and keep a detailed record of your expenses.
          </p>
        </div>
        <div className="feature-image">
          <img src="https://www.livetecs.com/wp-content/uploads/2019/05/Time-Expense-Tracking-.png" alt="Expense Tracking" />
        </div>
      </div>

      <div className="feature-container">
        <div className="feature-text">
          <h2>Create Budgets</h2>
          <p>
            Set budget goals for different categories and stay on top of your financial plans.
          </p>
        </div>
        <div className="feature-image">
          <img src="https://cdnlearnblog.etmoney.com/wp-content/uploads/2022/09/personal-budget-in-6-steps-1.jpg" alt="Create Budgets" />
        </div>
      </div>

      {/* Repeat the structure for other features */}

    </div>
  );
};

export default Home;
