import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

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
  const pending = bookings.filter(
    (b) => b.status === "PENDING"
  ).length;
  const confirmed = bookings.filter(
    (b) => b.status === "CONFIRMED"
  ).length;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        User Dashboard
      </h1>

      {/* Welcome Card */}
      <div className="bg-white p-6 rounded shadow mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            Welcome 👋
          </h2>
          <p className="text-gray-600">
            Manage your bookings & services
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total Bookings</h3>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {pending}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Confirmed</h3>
          <p className="text-2xl font-bold text-green-600">
            {confirmed}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          to="/services"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Book New Service
        </Link>

        <Link
          to="/my-bookings"
          className="bg-gray-800 text-white px-6 py-3 rounded"
        >
          My Bookings
        </Link>
      </div>
    </div>
  );
}
