import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-blue-100">
              Register to get started
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-8 py-10 space-y-6"
          >

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Register As
              </label>
              <select
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
                className="w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                <option value="USER">User</option>
                <option value="VENDOR">Vendor</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-xl font-semibold hover:scale-105 transition"
            >
              Register
            </button>

            {/* Login link */}
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                Login
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}
