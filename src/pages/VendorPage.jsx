import { useParams } from "react-router-dom";
import MenuList from "../Components/MenuList.jsx";
import { useVendors } from "../hooks/useVendors.js";
import { Loading, ErrorMessage } from "../Components/Status.jsx";

export default function VendorPage() {
  const { id } = useParams();
  const { vendors, loading, error, reload } = useVendors();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const vendor = vendors.find((v) => v.id === id);

  if (!vendor) {
    return (
      <div className="card">
        <h2>Vendor not found</h2>
      </div>
    );
  }

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <MenuList items={vendor.menu} />
    </section>
  );
}
