import { Link } from "react-router-dom";
import '../components/navbar.css';

function NavBar({ onLogout, user }) {
  // function handleLogout() {
  //   fetch("/logout", {
  //     method: "DELETE",
  //   }).then(() => onLogout());
  // }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
        {/* <Link to="/loginform">Login Form</Link> */}
        <Link to="/faq">FAQ</Link>
        <Link to="/budgetpage">Budget Page</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/expensehistory">Expense History</Link>
      </div>
      {/* {user && (
        <button onClick={handleLogout}>Logout</button>
      )} */}
    </header>
  );
}

export default NavBar;
