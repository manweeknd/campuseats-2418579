import React from "react";
import Header from "./Components/Header";
import VendorCard from "./Components/VendorCard";
import MenuItemCard from "./Components/MenuItemCard";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <section>
          <h2>Today’s vendors</h2>
          <VendorCard />
        </section>
        <section>
          <h2>Popular items</h2>
          <div>
            <MenuItemCard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
