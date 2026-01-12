import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categories";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((res) => {
        console.log("Categories API:", res.data);
        setCategories(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Category API Error:", err);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Services Booking
          </h1>

          <div className="flex gap-4">
            <Link to="/login" className="text-gray-700 font-medium hover:text-blue-600">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:shadow-lg"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white text-center py-24">
        <h2 className="text-5xl font-extrabold mb-6">
          Book Trusted Home Services
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Salon, AC Repair, Electrician, Plumber – All at one place
        </p>
        <Link
          to="/services"
          className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl"
        >
          Explore Services →
        </Link>
      </section>

      {/* Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h3 className="text-4xl font-bold mb-2">Browse by Category</h3>
          <p className="text-gray-600">Find the perfect service for your needs</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-red-500">No categories found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/services?category=${cat.id}`}
                className="group bg-white p-6 rounded-xl shadow hover:shadow-xl transform hover:-translate-y-2 transition"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <img
                    src={
                      cat.image?.startsWith("http")
                        ? cat.image
                        : `${import.meta.env.VITE_API_URL}/uploads/${cat.image}`
                    }
                    alt={cat.name}
                    className="w-16 h-16 object-cover rounded-xl"
                    onError={(e) =>
                      (e.currentTarget.src = "https://via.placeholder.com/100")
                    }
                  />
                </div>

                <h4 className="font-semibold text-gray-800 group-hover:text-blue-600">
                  {cat.name}
                </h4>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Popular Services */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h3 className="text-4xl font-bold mb-2">Popular Services</h3>
          <p className="text-gray-600">Most booked services this month</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-8 bg-gray-50 rounded-2xl shadow hover:shadow-xl">
              <h4 className="font-bold text-xl mb-2">Service Name</h4>
              <p className="text-gray-600 mb-3">Starting from</p>
              <p className="text-2xl font-bold text-blue-600">₹499</p>

              <Link
                to="/services"
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8">
        © 2026 Services. All rights reserved.
      </footer>
    </div>
  );
}
