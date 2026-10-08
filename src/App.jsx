import Header from "./Components/Header";
import VendorCard from "./Components/VendorCard";
import MenuItemCard from "./Components/MenuItemCard";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <section>
          <h2 className="section-title">Today's vendors</h2>
          <VendorCard />
        </section>
        <section>
          <h2 className="section-title">Popular items</h2>
          <div className="grid">
            <MenuItemCard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default App;
