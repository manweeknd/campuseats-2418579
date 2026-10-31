import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";
import CartItem from "../Components/CartItem.jsx";
import CheckoutForm from "../Components/CheckoutForm.jsx";

export default function CartPage() {
  const { cart, changeQty, removeFromCart, placeOrder, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <p className="muted">
        Your cart is empty. Pick something from a menu first.
      </p>
    );
  }

  function handleCheckout(details) {
    placeOrder(details);
    navigate("/orders");
  }

  return (
    <div className="cart-layout">
      <div className="card">
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
            />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
      </div>
      <CheckoutForm onPlaceOrder={handleCheckout} />
    </div>
  );
}
