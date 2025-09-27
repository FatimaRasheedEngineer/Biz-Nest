// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
// import axios from "axios";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     businessName: "",
//     agreeToTerms: false,
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!formData.password) newErrors.password = "Password is required";
//     if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
//     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
//     if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       const res = await axios.post("http://localhost:5000/api/auth/register", formData);

//       // ✅ Save full user object from backend
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       alert("✅ Registration successful!");
//       navigate("/dashboard"); 
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "❌ Error registering user");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-stone-100 py-12 px-4 relative">
//       <button
//         onClick={() => navigate("/")}
//         className="fixed top-5 right-5 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold shadow-lg transition-colors z-50"
//       >
//         Go Back to Home
//       </button>

//       <div className="max-w-2xl mx-auto">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <span className="text-4xl font-bold italic" style={{ color: "#f97316", fontFamily: "'Playfair Display', serif" }}>Biz</span>
//             <span className="text-4xl font-bold italic" style={{ color: "#14b8a6", fontFamily: "'Playfair Display', serif" }}>Nest</span>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h1>
//           <p className="text-gray-600">Join our directory and start growing your business</p>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Info */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       id="firstName"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
//                       placeholder="Enter your first name"
//                     />
//                   </div>
//                   {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       id="lastName"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
//                       placeholder="Enter your last name"
//                     />
//                   </div>
//                   {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
//                 </div>
//               </div>
//             </div>

//             {/* Contact Info */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"}`}
//                       placeholder="Enter your email"
//                     />
//                   </div>
//                   {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.phone ? "border-red-500" : "border-gray-300"}`}
//                       placeholder="Enter your phone number"
//                     />
//                   </div>
//                   {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
//                 </div>
//               </div>
//             </div>

//             {/* Business Info */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information (Optional)</h3>
//               <div>
//                 <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
//                 <input
//                   type="text"
//                   id="businessName"
//                   name="businessName"
//                   value={formData.businessName}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   placeholder="Enter your business name (if applicable)"
//                 />
//               </div>
//             </div>

//             {/* Security */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       id="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.password ? "border-red-500" : "border-gray-300"}`}
//                       placeholder="Create a password"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                   </div>
//                   {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
//                       placeholder="Confirm your password"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                   </div>
//                   {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
//                 </div>
//               </div>
//             </div>

//             {/* Terms */}
//             <div>
//               <div className="flex items-start">
//                 <input
//                   id="agreeToTerms"
//                   name="agreeToTerms"
//                   type="checkbox"
//                   checked={formData.agreeToTerms}
//                   onChange={handleInputChange}
//                   className={`h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded mt-1 ${errors.agreeToTerms ? "border-red-500" : ""}`}
//                 />
//                 <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
//                   I agree to the{" "}
//                   <a href="/" className="text-orange-500 hover:text-orange-600 font-medium">Terms of Service</a>{" "}
//                   and{" "}
//                   <a href="/" className="text-orange-500 hover:text-orange-600 font-medium">Privacy Policy</a>
//                 </label>
//               </div>
//               {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                   Creating Account...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      // Send registration data to backend
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);

      // Save full user object from backend
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("✅ Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Error registering user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 py-12 px-4 relative">
      <button
        onClick={() => navigate("/")}
        className="fixed top-5 right-5 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold shadow-lg transition-colors z-50"
      >
        Go Back to Home
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-4xl font-bold italic" style={{ color: "#f97316", fontFamily: "'Playfair Display', serif" }}>Biz</span>
            <span className="text-4xl font-bold italic" style={{ color: "#14b8a6", fontFamily: "'Playfair Display', serif" }}>Nest</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join our directory and start growing your business</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Enter your first name"
                    />
                  </div>
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Enter your last name"
                    />
                  </div>
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information (Optional)</h3>
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your business name (if applicable)"
                />
              </div>
            </div>

            {/* Security */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.password ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Terms */}
            <div>
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className={`h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded mt-1 ${errors.agreeToTerms ? "border-red-500" : ""}`}
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="/" className="text-orange-500 hover:text-orange-600 font-medium">Terms of Service</a>{" "}
                  and{" "}
                  <a href="/" className="text-orange-500 hover:text-orange-600 font-medium">Privacy Policy</a>
                </label>
              </div>
              {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

