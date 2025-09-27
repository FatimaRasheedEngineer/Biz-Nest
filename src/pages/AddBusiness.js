
// import { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AddBusiness() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();

//   // Safe user parsing
//   const getUser = () => {
//     const data = localStorage.getItem("user");
//     if (!data) return null; // agar kuch nahi hai
//     try {
//       return JSON.parse(data);
//     } catch {
//       console.warn("localStorage 'user' invalid, resetting");
//       localStorage.removeItem("user"); // safe reset
//       return null;
//     }
//   };

//   const [user, setUser] = useState(getUser());
//   const [formData, setFormData] = useState({
//     businessName: "",
//     address: "",
//     phone: "",
//     description: "",
//     category: "",
//     plan: "Free",
//   });

//   const [categories] = useState([
//     "Restaurants",
//     "Hotels",
//     "Shopping",
//     "Services",
//     "Healthcare",
//     "Education",
//   ]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (!user?.email) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }

//     // plan fallback
//     setFormData((prev) => ({
//       ...prev,
//       plan: location.state?.plan || user.plan || "Free",
//     }));

//     // edit mode
//     if (id && user.businesses) {
//       const existing = user.businesses.find((b) => b._id === id);
//       if (existing) setFormData(existing);
//     }
//   }, [id, user, navigate, location.state]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.businessName || !formData.address || !formData.phone || !formData.category) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const updatedUser = { ...user };
//       if (!updatedUser.businesses) updatedUser.businesses = [];

//       if (id) {
//         updatedUser.businesses = updatedUser.businesses.map((b) =>
//           b._id === id ? { ...formData, _id: id } : b
//         );
//       } else {
//         updatedUser.businesses.push({ ...formData, _id: Date.now().toString() });
//       }

//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setUser(updatedUser);
//       toast.success("Business saved successfully!");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
//       <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           {id ? "Edit Business" : "Add Your Business"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="text"
//             name="businessName"
//             value={formData.businessName}
//             onChange={handleChange}
//             placeholder="Business Name"
//             required
//             className="w-full px-4 py-3 border rounded-xl"
//           />
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Business Address"
//             required
//             className="w-full px-4 py-3 border rounded-xl"
//           />
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Phone"
//             required
//             className="w-full px-4 py-3 border rounded-xl"
//           />
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="w-full px-4 py-3 border rounded-xl"
//           />
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 border rounded-xl"
//           >
//             <option value="">Select Category</option>
//             {categories.map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>

//           <input
//             type="text"
//             name="plan"
//             value={formData.plan}
//             readOnly
//             placeholder="Selected Plan"
//             className="w-full px-4 py-3 border rounded-xl bg-gray-100"
//           />

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full py-3 bg-teal-600 text-white rounded-xl"
//           >
//             {isSubmitting ? (id ? "Updating..." : "Adding...") : id ? "Update Business" : "Add Business"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// // }
// import { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AddBusiness() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();

//   // Safe user parsing
//   const getUser = () => {
//     const data = localStorage.getItem("user");
//     if (!data) return null;
//     try {
//       return JSON.parse(data);
//     } catch {
//       console.warn("localStorage 'user' invalid, resetting");
//       localStorage.removeItem("user");
//       return null;
//     }
//   };

//   const [user, setUser] = useState(getUser());
//   const [formData, setFormData] = useState({
//     businessName: "",
//     address: "",
//     phone: "",
//     description: "",
//     category: "",
//     plan: "Free",
//   });

//   const [categories] = useState([
//     "Restaurants",
//     "Hotels",
//     "Shopping",
//     "Services",
//     "Healthcare",
//     "Education",
//   ]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (!user?.email) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }

//     // 🔑 Plan validation
//     const now = new Date();
//     if (
//       !user.plan ||
//       user.plan === "Free" ||
//       (user.planExpiry && new Date(user.planExpiry) < now)
//     ) {
//       toast.info("Please buy or renew a package first");
//       navigate("/plans");
//       return;
//     }

//     // Plan fallback
//     setFormData((prev) => ({
//       ...prev,
//       plan: location.state?.plan || user.plan,
//     }));

//     // Edit mode
//     if (id && user.businesses) {
//       const existing = user.businesses.find((b) => b._id === id);
//       if (existing) setFormData(existing);
//     }
//   }, [id, user, navigate, location.state]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.businessName || !formData.address || !formData.phone || !formData.category) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const updatedUser = { ...user };
//       if (!updatedUser.businesses) updatedUser.businesses = [];

//       if (id) {
//         updatedUser.businesses = updatedUser.businesses.map((b) =>
//           b._id === id ? { ...formData, _id: id } : b
//         );
//       } else {
//         updatedUser.businesses.push({ ...formData, _id: Date.now().toString() });
//       }

//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setUser(updatedUser);
//       toast.success("Business saved successfully!");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
//       <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           {id ? "Edit Business" : "Add Your Business"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="text"
//             name="businessName"
//             value={formData.businessName}
//             onChange={handleChange}
//             placeholder="Business Name"
//             required
//             className="w-full px-4 py-3 border rounded-xl"
//           />
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Business Address"
//             required
//             className="w-full px-4 py-3 border rounded-xl"
//           />
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Phone"
//             required
//             className="w-full px-4 py-3 border rounded-xl"
//           />
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="w-full px-4 py-3 border rounded-xl"
//           />
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 border rounded-xl"
//           >
//             <option value="">Select Category</option>
//             {categories.map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>

//           <input
//             type="text"
//             name="plan"
//             value={formData.plan}
//             readOnly
//             placeholder="Selected Plan"
//             className="w-full px-4 py-3 border rounded-xl bg-gray-100"
//           />

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full py-3 bg-teal-600 text-white rounded-xl"
//           >
//             {isSubmitting ? (id ? "Updating..." : "Adding...") : id ? "Update Business" : "Add Business"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBusiness() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Safe user parsing
  const getUser = () => {
    const data = localStorage.getItem("user");
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      console.warn("localStorage 'user' invalid, resetting");
      localStorage.removeItem("user");
      return null;
    }
  };

  const [user, setUser] = useState(getUser());
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    phone: "",
    description: "",
    category: "",
    plan: "Free",
  });

  const [categories] = useState([
    "Restaurants",
    "Hotels",
    "Shopping",
    "Services",
    "Healthcare",
    "Education",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user?.email) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    // 🔑 Plan validation (allow Free plan too)
    const now = new Date();
    if (!user.plan) {
      toast.info("Please choose a plan first");
      navigate("/plans");
      return;
    }

    if (user.planExpiry && new Date(user.planExpiry) < now) {
      toast.info("Your plan has expired, please renew");
      navigate("/plans");
      return;
    }

    // ✅ Keep plan from payment page or fallback to user's plan
    setFormData((prev) => ({
      ...prev,
      plan: location.state?.plan || user.plan,
    }));

    // Edit mode
    if (id && user.businesses) {
      const existing = user.businesses.find((b) => b._id === id);
      if (existing) setFormData(existing);
    }
  }, [id, user, navigate, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.businessName || !formData.address || !formData.phone || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedUser = { ...user };
      if (!updatedUser.businesses) updatedUser.businesses = [];

      if (id) {
        updatedUser.businesses = updatedUser.businesses.map((b) =>
          b._id === id ? { ...formData, _id: id } : b
        );
      } else {
        updatedUser.businesses.push({ ...formData, _id: Date.now().toString() });
      }

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Business saved successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {id ? "Edit Business" : "Add Your Business"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Business Name"
            required
            className="w-full px-4 py-3 border rounded-xl"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Business Address"
            required
            className="w-full px-4 py-3 border rounded-xl"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full px-4 py-3 border rounded-xl"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-4 py-3 border rounded-xl"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="plan"
            value={formData.plan}
            readOnly
            placeholder="Selected Plan"
            className="w-full px-4 py-3 border rounded-xl bg-gray-100"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-teal-600 text-white rounded-xl"
          >
            {isSubmitting ? (id ? "Updating..." : "Adding...") : id ? "Update Business" : "Add Business"}
          </button>
        </form>
      </div>
    </div>
  );
}
