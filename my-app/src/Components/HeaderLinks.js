import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function HeaderLinks() {
  useEffect(() => {
    console.log(window.location.pathname);
    document.getElementById("headerTransactions").classList.remove("active");
    document.getElementById("headerBudget").classList.remove("active");
    document.getElementById("headerReport").classList.remove("active");
    if (window.location.pathname === "/")
      document.getElementById("headerBudget").classList.add("active");
    else if (window.location.pathname === "/transactions/")
      document.getElementById("headerTransactions").classList.add("active");
    else if (window.location.pathname === "/reports/")
      document.getElementById("headerReport").classList.add("active");
  }, []);

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          id="headerTransactions"
          key="headerTransactions"
          className="nav-link "
          to="/transactions/"
        >
          Transactions
        </Link>
      </li>
      <li className="nav-item">
        <Link
          id="headerBudget"
          key="headerBudget"
          className="nav-link active"
          to="/"
        >
          Budget
        </Link>
      </li>
      <li className="nav-item">
        <Link
          id="headerReport"
          key="headerReport"
          className="nav-link"
          to="/reports/"
        >
          Reports
        </Link>
      </li>
    </ul>
  );
}
