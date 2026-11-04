import { useLocalStorage } from "../hooks/useLocalStorage";

function MenuItemCard({ item, vendorId, onAdd }) {
  const [recentItems, setRecentItems] = useLocalStorage("recently_viewed", []);

  const handleAddClick = () => {
    const itemWithVendor = { ...item, vendorId };

    const filtered = recentItems.filter((i) => i.id !== item.id);
    setRecentItems([itemWithVendor, ...filtered].slice(0, 5));

    onAdd(item);
  };

  return (
    <article className="card menu-card">
      <div className="thumb" aria-hidden="true">
        {item.name.charAt(0)}
      </div>
      <p className="tag">{item.category}</p>
      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>

      <button
        className="btn"
        disabled={!item.available}
        onClick={handleAddClick}
      >
        {item.available ? "Add to cart" : "Sold out"}
      </button>
    </article>
  );
}
export default MenuItemCard;
