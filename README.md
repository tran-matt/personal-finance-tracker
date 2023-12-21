# Personal Finance Tracker

This is a simple web application for personal finance tracking. It includes features to manage budgets, expenses, and view expense history.

## Table of Contents

- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)


## Usage
Access the application by visiting http://localhost:3000 in your web browser.
Explore different sections like Budgets, Expenses, and Expense History.

## API Endpoints
Get All Users: GET /users
Get User by ID: GET /users/:id
Delete User: DELETE /users/:id
Update User: PUT /users/:id
Get All Budgets: GET /budgets
Get Budget by ID: GET /budgets/:id
Create Budget: POST /budgets
Delete Budget: DELETE /budgets/:id
Update Budget: PATCH /budgets/:id
Get Budgets by User ID: GET /budgets/user/:user_id
Get All Expenses: GET /expenses
Create Expense: POST /expenses
Delete Expense: DELETE /expenses/:id
Update Expense: PATCH /expenses/:id
Get Expenses by User ID: GET /expenses/user/:user_id

## Technologies Used
Flask (Python)
React (JavaScript)
SQLAlchemy (Python)
Formik (React)
Yup (JavaScript)
PostgreSQL (Database)
