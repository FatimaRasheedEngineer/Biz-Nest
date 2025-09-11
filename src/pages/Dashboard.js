import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Agar user login nahi hai, to login page redirect
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null; // Loading ya redirect ke liye

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {user.firstName}!</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Info</h2>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Business Name:</strong> {user.businessName || "Not Added Yet"}</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Actions</h2>
        <button
          onClick={() => navigate("/add-business")}
          className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
        >
          Add Your Business
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
