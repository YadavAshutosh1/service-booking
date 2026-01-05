import { Link } from "react-router-dom";

export default function Services() {
  // 🔥 Dummy services data
  const dummyServices = [
    {
      id: 1,
      name: "Hair Cut",
      price: 199,
      duration: "30 mins",
      category: "Salon & Spa",
      image: "https://via.placeholder.com/300?text=Hair+Cut",
    },
    {
      id: 2,
      name: "AC Repair",
      price: 499,
      duration: "1 hour",
      category: "AC Repair",
      image: "https://via.placeholder.com/300?text=AC+Repair",
    },
    {
      id: 3,
      name: "Electric Wiring",
      price: 299,
      duration: "45 mins",
      category: "Electrician",
      image: "https://via.placeholder.com/300?text=Electrician",
    },
    {
      id: 4,
      name: "Pipe Leakage Fix",
      price: 349,
      duration: "40 mins",
      category: "Plumber",
      image: "https://via.placeholder.com/300?text=Plumber",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Available Services
      </h1>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {dummyServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded shadow hover:shadow-lg transition"
          >
            {/* Image */}
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-40 object-cover rounded-t"
            />

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">
                {service.name}
              </h3>

              <p className="text-gray-600 text-sm mb-1">
                Category: {service.category}
              </p>

              <p className="text-gray-600 text-sm mb-1">
                Duration: {service.duration}
              </p>

              <p className="text-lg font-bold text-blue-600 mb-4">
                ₹{service.price}
              </p>

              {/* ✅ BOOK NOW → SERVICE BOOKING PAGE */}
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
    </div>
  );
}
