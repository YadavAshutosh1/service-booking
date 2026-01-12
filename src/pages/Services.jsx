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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Available Services
          </h1>
          <p className="text-xl text-blue-100">
            Professional services at your doorstep
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {services.length === 0 ? (
          <p className="text-center text-gray-500">
            No services available
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-56 bg-blue-50">
                  <img
                    src="https://placehold.co/400x300?text=Service"
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />

                  {/* Category */}
                  <span className="absolute top-4 left-4 bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
                    {service.category?.name}
                  </span>

                  {/* Price */}
                  <span className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-1 rounded-full font-bold">
                    ₹{Number(service.price)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-1">
                    Vendor: {service.vendor?.name}
                  </p>

                  <p className="text-gray-600 mb-4">
                    Duration: {service.duration}
                  </p>

                  <Link
                    to={`/services/${service.id}`}
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
