import { useEffect, useState } from "react";
import api from "../services/api";

export default function VendorDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/bookings/vendor/me")
      .then((res) => {
        setBookings(res.data || []);
      })
      .catch((err) => {
        console.error("Vendor bookings error:", err);
        setBookings([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading vendor bookings...
      </p>
    );
  }
  const updateStatus = async (bookingId, status) => {
  try {
    await api.patch(`/bookings/${bookingId}/status`, {
      status,
    });

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status } : b
      )
    );
  } catch (err) {
    alert("Failed to update status");
    console.error(err);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Vendor Dashboard
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No bookings yet
        </p>
      ) : (
        <div className="space-y-4 max-w-5xl mx-auto">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-5 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {b.service?.title}
                </h3>

                <p className="text-sm text-gray-600">
                  Customer: {b.user?.name}
                </p>

                <p className="text-sm text-gray-600">
                  Date:{" "}
                  {new Date(b.bookingDate).toLocaleString()}
                </p>
              </div>
            <div className="flex gap-2 mt-2">
  {b.status === "PENDING" && (
    <>
      <button
        onClick={() => updateStatus(b.id, "CONFIRMED")}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        Confirm
      </button>

      <button
        onClick={() => updateStatus(b.id, "CANCELLED")}
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Cancel
      </button>
    </>
  )}
</div>

              <span
                className={`font-semibold px-3 py-1 rounded ${
                  b.status === "CONFIRMED"
                    ? "bg-green-100 text-green-700"
                    : b.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {b.status}
              </span>
            </div>

            
          ))}
        </div>
      )}
    </div>
  );
}
