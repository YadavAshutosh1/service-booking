import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categories";

export default function Home() {
  // 🔥 Dummy categories
  const dummyCategories = [
    {
      id: 1,
      name: "Salon & Spa",
      image: "https://via.placeholder.com/100?text=Salon",
    },
    {
      id: 2,
      name: "AC Repair",
      image: "https://via.placeholder.com/100?text=AC",
    },
    {
      id: 3,
      name: "Electrician",
      image: "https://via.placeholder.com/100?text=Electrician",
    },
    {
      id: 4,
      name: "Plumber",
      image: "https://via.placeholder.com/100?text=Plumber",
    },
  ];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];

        // ✅ If backend has data → use it
        // ❌ Else → use dummy
        setCategories(data.length > 0 ? data : dummyCategories);
      })
      .catch((err) => {
        console.error("Category error:", err);
        setCategories(dummyCategories);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      {/* Navbar */}
<nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
  <h1 className="text-xl font-bold text-blue-600">
    Services Booking
  </h1>

  <div className="space-x-4">
    <Link to="/login" className="text-gray-700">
      Login
    </Link>

    <Link
      to="/register"
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Register
    </Link>

    {/* ✅ Dashboard Link */}
    <Link
      to="/dashboard"
      className="bg-gray-800 text-white px-4 py-2 rounded"
    >
      Dashboard
    </Link>
  </div>
</nav>


      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-600 text-white">
        <h2 className="text-4xl font-bold mb-4">
          Book Trusted Home Services
        </h2>
        <p className="mb-6">
          Salon, AC Repair, Electrician, Plumber – All at one place
        </p>
        <Link
          to="/services"
          className="bg-white text-blue-600 px-6 py-3 rounded font-semibold"
        >
          Explore Services
        </Link>
      </section>

      {/* Categories */}
      <section className="py-16 px-8">
        <h3 className="text-2xl font-bold mb-6">Categories</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-6 rounded shadow text-center hover:shadow-lg"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-20 h-20 mx-auto mb-3 object-cover rounded"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://via.placeholder.com/100")
                }
              />

              <h4 className="font-semibold text-lg">
                {cat.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Services */}
      <section className="bg-white py-16 px-8">
        <h3 className="text-2xl font-bold text-center mb-10">
          Popular Services
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border p-6 rounded shadow hover:shadow-lg"
            >
              <h4 className="font-semibold text-lg mb-2">
                Service Name
              </h4>
              <p className="text-gray-600 mb-4">
                Starting from ₹499
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2026 Services. All rights reserved.
      </footer>
    </div>
  );
}
