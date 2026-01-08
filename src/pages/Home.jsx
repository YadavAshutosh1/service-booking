import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categories";

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        console.log("Categories API Response:", res.data);

        // ✅ PURE API DATA ONLY
        setCategories(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Category API error:", err);
        setCategories([]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Services Booking</h1>

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

        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-600 text-white">
        <h2 className="text-4xl font-bold mb-4">Book Trusted Home Services</h2>
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

        {categories.length === 0 ? (
          <p className="text-gray-500">No categories found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/services?category=${cat.id}`}
                className="bg-white p-6 rounded shadow text-center hover:shadow-lg"
              >
                <img
                  src={
                    cat.image?.startsWith("http")
                      ? cat.image
                      : `${import.meta.env.VITE_API_URL}/uploads/${cat.image}`
                  }
                  alt={cat.name}
                  className="w-20 h-20 mx-auto mb-3 object-cover rounded"
                  onError={(e) =>
                    (e.currentTarget.src = "https://via.placeholder.com/100")
                  }
                />

                <h4 className="font-semibold text-lg">{cat.name}</h4>
              </Link>
            ))}
          </div>
        )}
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
              <h4 className="font-semibold text-lg mb-2">Service Name</h4>
              <p className="text-gray-600 mb-4">Starting from ₹499</p>
              <Link
                to="/services"
                className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
              >
                Book Now
              </Link>
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
