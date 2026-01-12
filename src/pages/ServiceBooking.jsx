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
      .then((res) => {
        setService(res.data);
      })
      .catch(() => {
        setService(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading service...
      </p>
    );
  }

  if (!service) {
    return (
      <p className="text-center mt-10 text-red-500">
        Service not found
      </p>
    );
  }
  
  const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  navigate("/login");
  return;
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
        serviceId: service.id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Booking successful 🎉");
    navigate("/my-bookings");
  } catch (err) {
    console.error(err.response?.data || err);
    alert(err.response?.data?.message || "Booking failed");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
        {/* Service Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <img
  src={
    service.image?.startsWith("http")
      ? service.image
      : `${import.meta.env.VITE_API_URL}/uploads/${service.image}`
  }
  alt={service.name}
  className="rounded w-full"
  onError={(e) => {
    e.currentTarget.src =
      "https://placehold.co/400x300?text=No+Image";
  }}
/>
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {service.name}
            </h2>

            <p className="text-gray-600 mb-2">
              Duration: {service.duration}
            </p>

            <p className="text-xl font-semibold text-blue-600 mb-4">
              ₹{service.price}
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Book This Service
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="date"
              className="border p-2 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="time"
              className="border p-2 rounded"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <input
              type="text"
              placeholder="Your Address"
              className="border p-2 rounded md:col-span-3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button
            onClick={handleBooking}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
