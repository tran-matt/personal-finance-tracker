// App.js
import {Route, Routes, Link} from "react-router-dom"
import {Home} from "./home"
import {Login} from "./login"
import {FAQ} from "./faq"
import {BudgetPage} from "./budgetpage"
import {Expenses} from "./expenses"
import {ExpenseHistory} from "./expensehistory"

function App() {
  return (
  <>
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/faq">FAQ</Link>
      </li>
      <li>
        <Link to="/budgetpage">Budget Page</Link>
      </li>
      <li>
        <Link to="/expenses">Expenses</Link>
      </li>
      <li>
        <Link to="/expensehistory">Expense History</Link>
      </li>
     
    </ul>
  </nav>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/faq" element={<FAQ />}/>
    <Route path="/budgetpage" element={<BudgetPage />}/>
    <Route path="/expenses" element={<Expenses />}/>
    <Route path="/expensehistory" element={<ExpenseHistory />}/>
  </Routes>
  </>
  )
}

export default App;
 