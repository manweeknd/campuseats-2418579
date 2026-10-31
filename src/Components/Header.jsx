import { Link, NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="header">
      {/* Wrap the logo in a Link pointing to /vendors */}
      <h1 className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          CampusEats
        </Link>
      </h1>
      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Vendors
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Orders
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "link cart active" : "link cart"
          }
        >
          Cart <span className="badge">{count}</span>
        </NavLink>
      </nav>
    </header>
  );
}
