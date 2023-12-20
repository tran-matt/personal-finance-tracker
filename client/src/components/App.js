// App.js
import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./home";
import LoginForm from "./loginform";
import FAQ from "./faq";
import BudgetPage from "./budgetpage";
import Expenses from "./expenses";
import ExpenseHistory from "./expensehistory";
import Navbar from "./navbar";

function App() {
  
  return (
    <>
      <Navbar />
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/budgetpage" element={<BudgetPage />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expensehistory" element={<ExpenseHistory />} />
        
      </Routes>
    </>
  );
}

export default App;
