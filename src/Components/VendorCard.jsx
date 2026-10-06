import React from "react";

export default function VendorCard() {
  const vendor = {
    name: "Mahallah Zubair Drinks & Juice Stall",
    location: "Mahallah Zubair Cafe",
    openHours: "10:00 AM - 10:00 PM",
    isOpen: true,
  };

  return (
    <div className="vendor-card">
      <div className="avatar">{vendor.name.charAt(0)}</div>
      <div className="vendor-info">
        <h2>{vendor.name}</h2>
        <p className="location">{vendor.location}</p>
        <p className="hours">{vendor.openHours}</p>
        <span className={`status ${vendor.isOpen ? "open" : "closed"}`}>
          {vendor.isOpen ? "Open now" : "Closed"}
        </span>
      </div>
    </div>
  );
}
