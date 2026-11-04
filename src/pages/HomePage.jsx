import React, { useEffect, useState } from "react";
import VendorCard from "../Components/VendorCard.jsx";
import RecentlyViewedSection from "../Components/RecentlyViewedSection.jsx"; // Import your separate component

export default function HomePage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vendors.json")
      .then((res) => res.json())
      .then((data) => {
        setVendors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load vendors", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-page container">
      {/* Hero Welcome Banner */}
      <section
        className="hero-section card"
        style={{ marginBottom: "2rem", padding: "2rem" }}
      >
        <h2>Welcome to CampusEats</h2>
        <p className="muted">
          Discover food stalls, cafes, and campus bookstores right from your
          device.
        </p>
      </section>

      {/* Main Vendor List Section */}
      <section className="vendors-section">
        <h3 className="section-title">Campus Vendors</h3>
        {loading ? (
          <p className="muted">Loading vendors...</p>
        ) : (
          <div className="grid">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}
      </section>

      {/* Clean import called right here! */}
      <RecentlyViewedSection />
    </div>
  );
}
