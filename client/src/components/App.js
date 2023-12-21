// import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
// import LoginForm from "./loginform";
import FAQ from "./faq";
import BudgetPage from "./budgetpage";
import Expenses from "./expenses";
import ExpenseHistory from "./expensehistory";
import Navbar from "./navbar";

function App() {
  // const [user, setUser] = useState(null);
  // const [loginFormData, setLoginFormData] = useState({});

  // useEffect(() => {
  //   fetch('/check_session')
  //     .then((response) => {
  //       if (response.ok) {
  //         response.json().then((userData) => setUser(userData));
  //       } else {
  //         console.error("Server error:", response.status, response.statusText);
  //         alert("Error: Unable to log in user");
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Fetch error:", error);
  //       alert("Error: Unable to log in user");
  //     });
  // }, []);
  
  // function logInUser(event) {
  //   event.preventDefault();
  //   fetch('http://localhost:5555/login', {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(loginFormData)
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       response.json().then(userData => setUser(userData));
  //     } else {
  //       console.error("Error logging in user:", response.statusText);
  //       // Handle the error in a more informative way
  //     }
  //   })
  //   .catch(error => {
  //     console.error("Fetch error:", error);
  //     // Handle the error in a more informative way
  //   });
  // }
  

  // function updateLoginForm(event) {
  //   setLoginFormData({ ...loginFormData, [event.target.name]: event.target.value });
  // }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/loginform" element={<LoginForm logInUser={logInUser} updateLoginForm={updateLoginForm} />} /> */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/budgetpage" element={<BudgetPage />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expensehistory" element={<ExpenseHistory />} />
      </Routes>
    </>
  );
}

export default App;
