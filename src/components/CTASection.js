
// import { useNavigate } from "react-router-dom";

// const CTASection = () => {
//   const navigate = useNavigate(); // <-- ensure yeh top-level pe hai

//   const handleAddBusiness = () => {
//     let user = null;
//     try {
//       const data = localStorage.getItem("user");
//       if (data && data !== "undefined") {
//         user = JSON.parse(data);
//       }
//     } catch (err) {
//       console.error("Failed to parse user from localStorage:", err);
//       user = null;
//     }

//     if (user && user._id) {
//       // ✅ User logged in → show Plans page first
//       navigate("/plans");
//     } else {
//       // ❌ User not logged in → show Login Required page
//       navigate("/login-required");
//     }
//   };

//   return (
//     <section className="py-20 bg-teal-600 text-white">
//       <div className="container mx-auto px-4 text-center">
//         <h2 className="text-4xl font-bold mb-6">Ready to List Your Business?</h2>
//         <p className="text-xl mb-8 max-w-2xl mx-auto">
//           Join thousands of businesses already listed in our directory
//         </p>
//         <button
//           onClick={handleAddBusiness}
//           className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors transform hover:scale-105"
//         >
//           Add Your Business
//         </button>
//       </div>
//     </section>
//   );
// };

// export default CTASection;
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CTASection = () => {
  const navigate = useNavigate();

  const handleAddBusiness = () => {
    let user = null;
    try {
      const data = localStorage.getItem("user");
      if (data && data !== "undefined") {
        user = JSON.parse(data);
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      user = null;
    }

    if (user && user._id) {
      // ✅ User logged in
      const now = new Date();

      if (
        user.plan &&
        user.plan !== "Free" &&
        (!user.planExpiry || new Date(user.planExpiry) > now)
      ) {
        // 🔥 Paid & valid plan → go to add-business form
        navigate("/add-business");
      } else {
        // ⚠️ Free plan ya expired → redirect to plans
        toast.info("Please buy or renew a package first");
        navigate("/plans");
      }
    } else {
      // ❌ User not logged in
      toast.error("Please login first");
      navigate("/login");
    }
  };

  return (
    <section className="py-20 bg-teal-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to List Your Business?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of businesses already listed in our directory
        </p>
        <button
          onClick={handleAddBusiness}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors transform hover:scale-105"
        >
          Add Your Business
        </button>
      </div>
    </section>
  );
};

export default CTASection;

