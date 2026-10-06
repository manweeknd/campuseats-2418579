export default function Header() {
  const cartCount = 0;

  return (
    <header className="header">
      <div className="logo">
        <h1>CampusEats</h1>
      </div>
      <nav className="nav-links">
        <a href="#">Vendors</a>
        <a href="#">My Orders</a>
        <a href="#">
          Cart <span className="cart-count">{cartCount}</span>
        </a>
      </nav>
    </header>
  );
}
