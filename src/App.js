
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

// Components & Pages
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Blog from "./pages/Blog";
import Listingdetails from "./pages/Listingdetails";
import Pages from "./pages/Pages";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessDetail from "./pages/BusinessDetail";
import AddBusiness from "./pages/AddBusiness";
import Dashboard from "./pages/Dashboard";
import PlansPage from "./pages/PlansPage";
import PaymentPage from "./pages/PaymentPage";

// Admin Panel
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginRequired from "./pages/LoginRequired";

import "./App.css";

function Layout() {
  const location = useLocation();

  // Routes where header should be hidden
  const hideHeaderRoutes = ["/login", "/register"];

  return (
    <div className="App min-h-screen bg-white text-black">
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:name" element={<Categories />} />
        <Route path="/category/:name" element={<Categories />} /> {/* ✅ Added for CategoryGrid */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/listing/:id" element={<Listingdetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/business/:name" element={<BusinessDetail />} />

        {/* User Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-business"
          element={
            <ProtectedRoute>
              <AddBusiness />
            </ProtectedRoute>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Utility Routes */}
        <Route path="/login-required" element={<LoginRequired />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Router>
      <Layout />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
