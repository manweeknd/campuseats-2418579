// File: src/Components/MenuList.jsx
import { useCart } from "../hooks/useCart.js";
import MenuItemCard from "./MenuItemCard.jsx";

// MODIFIED: Added vendorId to props
function MenuList({ items, vendorId }) {
  const { addToCart } = useCart();

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>;
  }
  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          vendorId={vendorId} // ADDED: Pass vendorId
          onAdd={addToCart}
        />
      ))}
    </div>
  );
}
export default MenuList;
