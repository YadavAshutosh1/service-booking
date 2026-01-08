import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServices } from "../services/services";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((res) => {
        setServices(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Service error:", err);
        setServices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading services...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Available Services
      </h1>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">
          No services available
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded shadow hover:shadow-lg transition"
            >
              {/* IMAGE (category image) */}
              <img
                src={
                  service.category?.image
                    ? `${import.meta.env.VITE_API_URL}/uploads/${service.category.image}`
                    : "https://via.placeholder.com/300"
                }
                alt={service.name}
                className="w-full h-40 object-cover rounded-t"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://via.placeholder.com/300")
                }
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">
                  {service.name}
                </h3>

                <p className="text-gray-600 text-sm mb-1">
                  Category: {service.category?.name}
                </p>

                <p className="text-gray-600 text-sm mb-1">
                  Duration: {service.duration}
                </p>

                <p className="text-lg font-bold text-blue-600 mb-4">
                  ₹{Number(service.price)}
                </p>

                <Link
                  to={`/services/${service.id}`}
                  className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
