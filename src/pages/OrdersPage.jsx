import { useCart } from "../hooks/useCart.js";

export default function OrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="card">
        <h2>No past orders found.</h2>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Your Orders</h2>
      {orders.map((order, index) => (
        <div
          key={index}
          className="order-item"
          style={{
            marginBottom: "1rem",
            borderBottom: "1px solid #eee",
            paddingBottom: "1rem",
          }}
        >
          <p>
            <strong>Name:</strong> {order.name}
          </p>
          <p>
            <strong>Mahallah:</strong> {order.mahallah}
          </p>
          <p>
            <strong>Pickup Time:</strong> {order.pickupTime}
          </p>
          <p>
            <strong>Total:</strong> RM {order.total.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
