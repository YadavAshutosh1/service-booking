import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import ServiceBooking from "./pages/ServiceBooking";
import UserDashboard from "./pages/UserDashboard";
import MyBookings from "./pages/MyBookings";
import VendorDashboard from "./pages/VendorDashboard";
import VendorServices from "./pages/VendorServices";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceBooking />} />
        <Route path="/vendor/services" element={<VendorServices />} />

        {/* USER */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute role="USER">
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* VENDOR */}
        <Route
          path="/vendor/dashboard"
          element={
            <ProtectedRoute role="VENDOR">
              <VendorDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
