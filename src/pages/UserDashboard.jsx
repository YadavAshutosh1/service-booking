import { Link } from "react-router-dom";g

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        User Dashboard
      </h1>

      {/* Welcome Card */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold">
          Welcome 👋
        </h2>
        <p className="text-gray-600">
          Manage your bookings & services easily
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total Bookings</h3>
          <p className="text-2xl font-bold">3</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            1
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Confirmed</h3>
          <p className="text-2xl font-bold text-green-600">
            2
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
