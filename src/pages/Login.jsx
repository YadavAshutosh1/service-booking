import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState("USER"); // 🔥 USER or VENDOR

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.access_token;
      const payload = JSON.parse(atob(token.split(".")[1]));

      // 🔐 Role validation
      if (loginType === "VENDOR" && payload.role !== "VENDOR") {
        alert("This account is not registered as Vendor");
        setLoading(false);
        return;
      }

      if (loginType === "USER" && payload.role !== "USER") {
        alert("This account is not registered as User");
        setLoading(false);
        return;
      }

      // Save token only if role matches
      localStorage.setItem("token", token);
      localStorage.setItem("role", payload.role);
      
      
      if (payload.role === "VENDOR") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-blue-100">Login to access your account</p>
          </div>

          {/* Form */}
          <div className="px-8 py-10 space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-xl"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-xl"
              />
            </div>

            {/* 🔥 Login Type Selector */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setLoginType("USER")}
                className={`flex-1 py-2 rounded-lg border ${
                  loginType === "USER" ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                User
              </button>

              <button
                type="button"
                onClick={() => setLoginType("VENDOR")}
                className={`flex-1 py-2 rounded-lg border ${
                  loginType === "VENDOR" ? "bg-green-600 text-white" : "bg-gray-100"
                }`}
              >
                Vendor
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-xl font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
