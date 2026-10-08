import vendors from "./data/vendor.js";
import Header from "./Components/Header.jsx";
import MenuList from "./Components/MenuList.jsx";
import Footer from "./Components/Footer.jsx";
function App() {
  const selectedVendor = vendors[1];
  return (
    <>
      <Header />
      <main className="container">
        <section>
          <h2 className="section-title">Menu: {selectedVendor.name}</h2>
          <MenuList items={selectedVendor.menu} />
        </section>
      </main>
      <Footer />
    </>
  );
}
export default App;
