import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ServiceBooking() {
  const { id } = useParams();

  // 🔥 SAME dummy services list (Services.jsx jaisi)
  const dummyServices = [
    {
      id: 1,
      name: "Hair Cut",
      price: 199,
      duration: "30 mins",
      image: "https://via.placeholder.com/400?text=Hair+Cut",
    },
    {
      id: 2,
      name: "AC Repair",
      price: 499,
      duration: "1 hour",
      image: "https://via.placeholder.com/400?text=AC+Repair",
    },
    {
      id: 3,
      name: "Electric Wiring",
      price: 299,
      duration: "45 mins",
      image: "https://via.placeholder.com/400?text=Electrician",
    },
    {
      id: 4,
      name: "Pipe Leakage Fix",
      price: 349,
      duration: "40 mins",
      image: "https://via.placeholder.com/400?text=Plumber",
    },
  ];

  // 🔥 ID ke base pe correct service nikaalo
  const service = dummyServices.find(
    (s) => s.id === Number(id)
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");

  if (!service) {
    return <p className="text-center mt-10">Service not found</p>;
  }

  const handleBooking = () => {
    if (!date || !time || !address) {
      alert("Please fill all details");
      return;
    }

    alert(`Booking confirmed for ${service.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
        {/* Service Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <img
            src={service.image}
            alt={service.name}
            className="rounded w-full"
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
