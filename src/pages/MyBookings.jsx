import { useEffect, useState } from "react";
import api from "../services/api";
import { Calendar, Clock, User, IndianRupee, Package } from "lucide-react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    setLoading(false);
    return;
  }

  api
    .get("/bookings/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setBookings(Array.isArray(res.data) ? res.data : []);
    })
    .catch((err) => {
      console.error("Bookings error:", err.response?.data || err);
      setBookings([]);
    })
    .finally(() => setLoading(false));
}, []);


  const getStatusStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-500";
      case "PENDING":
        return "bg-amber-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-8 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600">
            Manage and track all your service bookings
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-4">
              <Package className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No bookings yet
            </h3>
            <p className="text-gray-500">
              Start exploring services and make your first booking!
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="p-6">

                  {/* Top Row */}
                  <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {b.service?.title}
                      </h3>

                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-2 text-indigo-500" />
                        <span className="text-sm">
                          {b.vendor?.name}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-md self-start">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-5 h-5" />
                        <span className="text-2xl font-bold">
                          {Number(b.service?.price).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                      <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                      <span className="text-sm font-medium">
                        {new Date(b.bookingDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                      <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                      <span className="text-sm font-medium">
                        {new Date(b.bookingDate).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusStyle(
                        b.status
                      )}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${getStatusDot(
                          b.status
                        )}`}
                      ></span>
                      <span className="text-sm font-semibold">
                        {b.status}
                      </span>
                    </div>

                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium hover:underline">
                      View Details →
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
