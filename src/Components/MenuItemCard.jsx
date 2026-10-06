import React from "react";

export default function MenuItemCard() {
  const item = {
    name: "Apple Juice",
    description: "Freshly blended ice apple juice",
    price: 7.5,
    available: true,
  };

  return (
    <div className="menu-item-card">
      <h3>{item.name}</h3>
      <p className="description">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>
      <button className="btn" disabled={!item.available}>
        {item.available ? "Add to cart" : "Sold out"}
      </button>
    </div>
  );
}
