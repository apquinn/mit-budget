import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Budget from "./Budget";
import Reports from "./Reports";
import Transactions from "./Transactions";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createBrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Budget />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
]);

root.render(
  <RouterProvider router={appRouter} />

  /*
	<React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Budget />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  </React.StrictMode>
*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
