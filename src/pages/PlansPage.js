
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// export default function PlansPage() {
//   const navigate = useNavigate();

//   const plans = [
//     {
//       name: "Free",
//       price: "0 PKR",
//       duration: "15 Days Trial",
//       features: [
//         "1 Business Listing",
//         "Basic Support (Email only)",
//         "Limited Dashboard Access",
//         "Community Access",
//         "Standard Visibility",
//       ],
//       color: "border-teal-400",
//       button: "bg-teal-500 hover:bg-teal-600",
//     },
//     {
//       name: "Premium",
//       price: "1000 PKR",
//       duration: "30 Days",
//       features: [
//         "5 Business Listings",
//         "Priority Email & Chat Support",
//         "Full Dashboard Insights",
//         "Featured Placement on Homepage",
//         "Advanced Search Visibility",
//         "Weekly Performance Reports",
//       ],
//       color: "border-orange-400",
//       button: "bg-orange-500 hover:bg-orange-600",
//     },
//     {
//       name: "Enterprise",
//       price: "2500 PKR",
//       duration: "90 Days",
//       features: [
//         "Unlimited Listings",
//         "24/7 VIP Support (Phone + Chat)",
//         "Advanced Analytics & Insights",
//         "Top Featured Placement",
//         "Personalized Growth Consultation",
//         "API Access & Integrations",
//         "Dedicated Account Manager",
//       ],
//       color: "border-teal-600",
//       button:
//         "bg-gradient-to-r from-teal-600 to-orange-500 hover:opacity-90",
//     },
//   ];

//   const handleSelectPlan = (planName) => {
//     const user = JSON.parse(localStorage.getItem("user") || "null");

//     if (!user || !user.email) {
//       toast.error("Please login first to choose a plan.");
//       navigate("/login-required");
//       return;
//     }

//     // Free plan → sidha form
//     if (planName === "Free") {
//       toast.success("Free plan selected! Fill your business info now.");
//       setTimeout(() => {
//         navigate("/add-business", { state: { plan: planName } });
//       }, 1200);
//     } else {
//       // Paid plans → payment
//       toast.success(`${planName} plan selected! Proceed to payment.`);
//       setTimeout(() => {
//         navigate("/payment", { state: { plan: planName } });
//       }, 1200);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-teal-50 py-16 px-6">
//       <Toaster position="top-right" reverseOrder={false} />
//       <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
//         Choose the <span className="text-teal-600">Perfect Plan</span> for You
//       </h2>
//       <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
//         Start with a free trial, upgrade when you're ready, and unlock premium
//         features designed to grow your business visibility.
//       </p>

//       <div className="grid gap-10 md:grid-cols-3 max-w-7xl mx-auto">
//         {plans.map((plan) => (
//           <div
//             key={plan.name}
//             className={`border-2 ${plan.color} rounded-2xl shadow-xl p-8 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl bg-white`}
//           >
//             <h3 className="text-2xl font-semibold text-gray-800">
//               {plan.name}
//             </h3>
//             <p className="text-4xl font-bold text-gray-900 mt-4">
//               {plan.price}
//             </p>
//             <p className="text-gray-500 mb-6">{plan.duration}</p>

//             <ul className="text-gray-700 space-y-3 mb-8 w-full">
//               {plan.features.map((feature, idx) => (
//                 <li key={idx} className="flex items-center space-x-2">
//                   <span className="text-teal-500">✔</span>
//                   <span>{feature}</span>
//                 </li>
//               ))}
//             </ul>

//             <button
//               className={`text-white font-semibold px-8 py-3 rounded-lg transition ${plan.button}`}
//               onClick={() => handleSelectPlan(plan.name)}
//             >
//               Choose {plan.name}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function PlansPage() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "0 PKR",
      duration: "15 Days Trial",
      features: [
        "1 Business Listing",
        "Basic Support (Email only)",
        "Limited Dashboard Access",
        "Community Access",
        "Standard Visibility",
      ],
      color: "border-teal-400",
      button: "bg-teal-500 hover:bg-teal-600",
    },
    {
      name: "Premium",
      price: "1000 PKR",
      duration: "30 Days",
      features: [
        "5 Business Listings",
        "Priority Email & Chat Support",
        "Full Dashboard Insights",
        "Featured Placement on Homepage",
        "Advanced Search Visibility",
        "Weekly Performance Reports",
      ],
      color: "border-orange-400",
      button: "bg-orange-500 hover:bg-orange-600",
    },
    {
      name: "Enterprise",
      price: "2500 PKR",
      duration: "90 Days",
      features: [
        "Unlimited Listings",
        "24/7 VIP Support (Phone + Chat)",
        "Advanced Analytics & Insights",
        "Top Featured Placement",
        "Personalized Growth Consultation",
        "API Access & Integrations",
        "Dedicated Account Manager",
      ],
      color: "border-teal-600",
      button:
        "bg-gradient-to-r from-teal-600 to-orange-500 hover:opacity-90",
    },
  ];

  const handleSelectPlan = (planName) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user || !user.email) {
      toast.error("Please login first to choose a plan.");
      navigate("/login");
      return;
    }

    // ✅ Free plan → allow only 1 business
    if (planName === "Free") {
      const businessCount = user.businesses ? user.businesses.length : 0;

      if (businessCount >= 1) {
        toast.error("Free plan allows only 1 business listing.");
        return;
      }

      // Save plan info in user
      const updatedUser = {
        ...user,
        plan: "Free",
        planExpiry: new Date(
          Date.now() + 15 * 24 * 60 * 60 * 1000
        ).toISOString(),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Free plan selected! Fill your business info now.");
      setTimeout(() => {
        navigate("/add-business", { state: { plan: "Free" } });
      }, 1200);
    } else {
      // ✅ Paid plans → send to payment
      toast.success(`${planName} plan selected! Proceed to payment.`);
      setTimeout(() => {
        navigate("/payment", { state: { plan: planName } });
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50 py-16 px-6">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        Choose the <span className="text-teal-600">Perfect Plan</span> for You
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Start with a free trial, upgrade when you're ready, and unlock premium
        features designed to grow your business visibility.
      </p>

      <div className="grid gap-10 md:grid-cols-3 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border-2 ${plan.color} rounded-2xl shadow-xl p-8 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl bg-white`}
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              {plan.name}
            </h3>
            <p className="text-4xl font-bold text-gray-900 mt-4">
              {plan.price}
            </p>
            <p className="text-gray-500 mb-6">{plan.duration}</p>

            <ul className="text-gray-700 space-y-3 mb-8 w-full">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="text-teal-500">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`text-white font-semibold px-8 py-3 rounded-lg transition ${plan.button}`}
              onClick={() => handleSelectPlan(plan.name)}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
