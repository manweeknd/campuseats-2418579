import React from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function RecentlyViewedSection() {
  const [recentItems] = useLocalStorage("recently_viewed", []);

  return (
    <section className="recently-viewed-section" style={{ marginTop: "2rem" }}>
      <h3>Recently Viewed Items</h3>
      {recentItems.length === 0 ? (
        <p className="muted">No recently viewed items yet.</p>
      ) : (
        <div className="grid" style={{ marginTop: "1rem" }}>
          {recentItems.map((item) => {
            const targetVendorId =
              item.vendorId || item.vendor_id || "my-restaurant";

            return (
              <div key={item.id} className="card menu-card">
                <div className="thumb" aria-hidden="true">
                  {item.name ? item.name.charAt(0) : "I"}
                </div>
                <h4>{item.name}</h4>
                <p className="muted" style={{ margin: "0.25rem 0" }}>
                  {item.description || "No description available."}
                </p>
                <p className="price" style={{ fontWeight: "bold" }}>
                  RM {item.price ? item.price.toFixed(2) : "0.00"}
                </p>

                <Link
                  to={`/vendor/${targetVendorId}`}
                  className="btn"
                  style={{
                    display: "inline-block",
                    textAlign: "center",
                    textDecoration: "none",
                    marginTop: "0.5rem",
                    color: "white",
                  }}
                >
                  View Vendor
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
