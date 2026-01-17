import { useEffect, useState } from "react";
import {
  getAllServices,
  getVendors,
  assignServicesToVendor,
} from "../services/vendor";

export default function VendorServices() {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState([]);
  const [vendorId, setVendorId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllServices(), getVendors()])
      .then(([serviceRes, vendorRes]) => {
        setServices(serviceRes.data || []);

        // 🔥 Logged-in vendor
        const vendor = vendorRes.data[0]; // temporary
        setVendorId(vendor?.id);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleService = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const saveServices = async () => {
    if (!vendorId || selected.length === 0) {
      alert("Select at least one service");
      return;
    }

    try {
      await assignServicesToVendor(vendorId, selected);
      alert("Services linked successfully 🎉");
    } catch (err) {
      alert("Failed to assign services");
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading services...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Vendor Services
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          Select Services You Provide
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s) => (
            <label
              key={s.id}
              className="flex items-center gap-3 border p-3 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(s.id)}
                onChange={() => toggleService(s.id)}
              />
              <span>
                {s.title} – ₹{s.price}
              </span>
            </label>
          ))}
        </div>

        <button
          onClick={saveServices}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Services
        </button>
      </div>
    </div>
  );
}
