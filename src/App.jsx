import { useState, useEffect } from "react";
import Header from "./Components/Header.jsx";
import VendorCard from "./Components/VendorCard.jsx";
import MenuList from "./Components/MenuList.jsx";
import Footer from "./Components/Footer.jsx";
import CartPage from "./Components/CartPage.jsx";
import { Loading, ErrorMessage } from "./Components/Status.jsx";

function App() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("menu"); // 'menu' | 'cart' | 'done'[cite: 6, 7]
  const [lastOrder, setLastOrder] = useState(null);

  // B2: Fetch vendors with AbortController and cleanup[cite: 5]
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch("/api/vendors.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        if (data.length > 0) {
          setSelectedVendorId(data[0].id); // Select first vendor once data arrives[cite: 5]
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);

  // B3: Total quantity computed with reduce for header badge[cite: 6]
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  // B3: Adding an item that is already in the cart increases its qty[cite: 6]
  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id);
      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...prevCart, { item, qty: 1 }];
    });
  }

  // B3: Change qty, remove line if qty reaches 0[cite: 6]
  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    );
  }

  // B3: Remove item line completely[cite: 6]
  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId));
  }

  // B5: Handle order placement[cite: 11]
  function handlePlaceOrder(details) {
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0,
    );
    setLastOrder({ ...details, total });
    setCart([]);
    setView("done");
  }

  let content;
  if (view === "cart") {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  } else if (view === "done") {
    content = (
      <div className="card">
        <h2>Order Placed!</h2>
        <p>
          Thank you, <strong>{lastOrder?.name}</strong>.
        </p>
        <p>
          Your order will be delivered to Mahallah{" "}
          <strong>{lastOrder?.mahallah}</strong> by{" "}
          <strong>{lastOrder?.pickupTime}</strong>.
        </p>
        <p className="cart-total">Total: RM {lastOrder?.total.toFixed(2)}</p>
        <button className="btn" onClick={() => setView("menu")}>
          Back to vendors
        </button>
      </div>
    );
  } else if (loading) {
    content = <Loading />;
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    );
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    );
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView("menu")}
        onShowCart={() => setView("cart")}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  );
}

export default App;
