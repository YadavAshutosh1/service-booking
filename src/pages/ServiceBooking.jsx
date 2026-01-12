import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function ServiceBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");

  // 🔹 Fetch service by ID
  useEffect(() => {
    api
      .get(`/services/${id}`)
      .then((res) => setService(res.data))
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  }, [id]);

  // 🔐 Login Check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading service...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-xl">Service not found</p>
      </div>
    );
  }

  const handleBooking = async () => {
    if (!date || !time || !address) {
      alert("Please fill all details");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const bookingDate = `${date}T${time}:00`;

    try {
      await api.post(
        "/bookings",
        {
          bookingDate,
          serviceId: service.id,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking successful 🎉");
      navigate("/my-bookings");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT - Service Info */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-96 bg-blue-50">
            <img
              src={
                service.image?.startsWith("http")
                  ? service.image
                  : `${import.meta.env.VITE_API_URL}/uploads/${service.image}`
              }
              alt={service.name}
              className="w-full h-full object-cover"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/600x400?text=Service")
              }
            />
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold mb-2">{service.name}</h1>
            <p className="text-gray-600 mb-2">
              Category: {service.category?.name}
            </p>
            <p className="text-gray-600 mb-4">
              Duration: {service.duration}
            </p>
            <p className="text-3xl font-bold text-blue-600">
              ₹{service.price}
            </p>
          </div>
        </div>

        {/* RIGHT - Booking Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-6">Book This Service</h3>

          <div className="space-y-4">
            <input
              type="date"
              className="w-full border-2 p-3 rounded-xl"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="time"
              className="w-full border-2 p-3 rounded-xl"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <textarea
              placeholder="Your Address"
              className="w-full border-2 p-3 rounded-xl"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              onClick={handleBooking}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold hover:shadow-xl"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
