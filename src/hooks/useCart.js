import { useContext } from "react";
import { CartContext } from "../context/CartProvider.jsx"; // Adjust the import path if your context file is located elsewhere

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
