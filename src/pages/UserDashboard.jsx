import { Link } from "react-router-dom";

export default function UserDashboard() {
  // 🔥 Dummy user data
  const user = {
    name: "Aadi Yadav",
    email: "aadi@gmail.com",
  };

  // 🔥 Dummy bookings
  const bookings = [
    {
      id: 1,
      service: "Hair Cut",
      date: "2026-01-05",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      service: "AC Repair",
      date: "2026-01-06",
      time: "2:00 PM",
      status: "Approved",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        User Dashboard
      </h1>

      {/* Profile Card */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Profile
        </h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-8">
        <Link
          to="/services"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Book New Service
        </Link>

        <Link
          to="/my-bookings"
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          View All Bookings
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          Recent Bookings
        </h2>

        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Service</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="text-center">
                  <td className="p-2 border">
                    {b.service}
                  </td>
                  <td className="p-2 border">{b.date}</td>
                  <td className="p-2 border">{b.time}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      b.status === "Approved"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {b.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
