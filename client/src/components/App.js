// App.js
import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import FAQ from "./faq";
import { BudgetPage } from "./budgetpage";
import { Expenses } from "./expenses";
import { ExpenseHistory } from "./expensehistory";
import Navbar from "./navbar";
import Register from "./register";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check the user session when the component mounts
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
      });
  }, []);

  const handleRegister = (registeredUser) => {
    setUser(registeredUser);
  };

  return (
    <>
      <Navbar onLogout={() => setUser(null)} />
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/budgetpage" element={<BudgetPage />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expensehistory" element={<ExpenseHistory />} />
        {/* Conditionally render a welcome message or the login component based on the user state */}
        {user ? <h2>Welcome, {user.username}!</h2> : null}
      </Routes>
    </>
  );
}

export default App;
