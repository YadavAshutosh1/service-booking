import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Calendar,
  CheckCircle,
  Clock,
  LogOut,
  Plus,
  List,
  TrendingUp,
  Package,
} from "lucide-react";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/bookings/my")
      .then((res) => {
        setBookings(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Dashboard booking error:", err);
        setBookings([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED").length;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-indigo-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Welcome Back 👋
              </h1>
              <p className="text-gray-600">
                Manage your bookings and explore new services
              </p>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-600 rounded-2xl p-6 text-white">
            <Calendar className="w-8 h-8 mb-2" />
            <p>Total Bookings</p>
            <p className="text-4xl font-bold">{total}</p>
          </div>

          <div className="bg-amber-500 rounded-2xl p-6 text-white">
            <Clock className="w-8 h-8 mb-2" />
            <p>Pending</p>
            <p className="text-4xl font-bold">{pending}</p>
          </div>

          <div className="bg-emerald-500 rounded-2xl p-6 text-white">
            <CheckCircle className="w-8 h-8 mb-2" />
            <p>Confirmed</p>
            <p className="text-4xl font-bold">{confirmed}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/services"
            className="bg-white p-8 rounded-2xl shadow hover:shadow-xl"
          >
            <Plus className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="text-xl font-bold">Book New Service</h3>
            <p className="text-gray-600">Explore available services</p>
          </Link>

          <Link
            to="/my-bookings"
            className="bg-white p-8 rounded-2xl shadow hover:shadow-xl"
          >
            <List className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="text-xl font-bold">My Bookings</h3>
            <p className="text-gray-600">View & manage bookings</p>
          </Link>
        </div>

        {/* Recent */}
        {bookings.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
            {bookings.slice(0, 3).map((b) => (
              <div
                key={b.id}
                className="flex justify-between border-b py-3"
              >
                <div>
                  <p className="font-semibold">
                    {b.service?.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {b.vendor?.name}
                  </p>
                </div>
                <span
                  className={`font-semibold ${
                    b.status === "CONFIRMED"
                      ? "text-green-600"
                      : b.status === "PENDING"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {bookings.length === 0 && (
          <div className="bg-white p-12 text-center rounded-2xl shadow">
            <Package className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
            <p className="text-gray-600">No bookings yet</p>
            <Link
              to="/services"
              className="inline-block mt-4 bg-indigo-600 text-white px-6 py-3 rounded"
            >
              Browse Services
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
