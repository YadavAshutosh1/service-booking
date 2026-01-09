import { useEffect, useState } from "react";
import api from "../services/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/bookings/my")
      .then((res) => {
        setBookings(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Bookings error:", err);
        setBookings([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading bookings...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No bookings found
        </p>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-5 rounded shadow flex justify-between items-center"
            >
              <div>
                {/* ✅ FIXED: title */}
                <h3 className="text-lg font-semibold">
                  {b.service?.title}
                </h3>

                <p className="text-sm text-gray-600">
                  Vendor:{" "}
                  <span className="font-medium">
                    {b.vendor?.name}
                  </span>
                </p>

                <p className="text-sm text-gray-600">
                  Date:{" "}
                  {new Date(b.bookingDate).toLocaleDateString()}{" "}
                  {new Date(b.bookingDate).toLocaleTimeString()}
                </p>

                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={`font-semibold px-2 py-1 rounded ${
                      b.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : b.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </p>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">
                  ₹{Number(b.service?.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
