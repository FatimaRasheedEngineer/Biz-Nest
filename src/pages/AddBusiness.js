import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBusiness = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    phone: "",
    description: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get logged in user
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Load categories once
  useEffect(() => {
    setCategories(["Restaurants", "Hotels", "Shopping", "Services", "Healthcare", "Education"]);
    if (!user?.email) navigate("/login");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.category) newErrors.category = "Category is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/add-business", {
        email: user.email,
        businessName: formData.businessName,
        phone: formData.phone,
        address: formData.address,
        description: formData.description,
        category: formData.category,
      });

      alert(res.data?.message || "Business added successfully!");

      // Update local storage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Redirect to selected category page
      navigate(`/category/${formData.category.toLowerCase().replace(/\s+/g, "-")}`);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.message || "Something went wrong. Please try again.";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Your Business</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.businessName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter business name"
            />
            {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter address"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Optional business description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            {isSubmitting ? "Adding..." : "Add Business"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBusiness;
