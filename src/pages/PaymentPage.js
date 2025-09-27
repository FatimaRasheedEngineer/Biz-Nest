// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// export default function PaymentPage() {
//   const [method, setMethod] = useState("credit");
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Plan info aayega PlansPage se
//   const plan = location.state?.plan;

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     toast.success(`Payment successful with ${method.toUpperCase()}! 🎉`);

//     setTimeout(() => {
//       navigate("/add-business", { state: { plan } });
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
//       <Toaster position="top-right" reverseOrder={false} />
//       <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           {plan ? `Complete Payment for ${plan}` : "Choose Your Payment Method"}
//         </h2>

//         <form onSubmit={handlePayment} className="space-y-6">
//           {/* Payment Options */}
//           <div className="space-y-3">
//             <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-100">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="credit"
//                 checked={method === "credit"}
//                 onChange={() => setMethod("credit")}
//                 className="mr-3"
//               />
//               💳 Credit / Debit Card
//             </label>

//             <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-100">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="jazzcash"
//                 checked={method === "jazzcash"}
//                 onChange={() => setMethod("jazzcash")}
//                 className="mr-3"
//               />
//               📱 JazzCash
//             </label>

//             <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-100">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="bank"
//                 checked={method === "bank"}
//                 onChange={() => setMethod("bank")}
//                 className="mr-3"
//               />
//               🏦 Bank Transfer
//             </label>
//           </div>

//           {/* Card Details */}
//           {method === "credit" && (
//             <div className="space-y-4 mt-4">
//               <input
//                 type="text"
//                 placeholder="Card Number"
//                 className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 required
//               />
//               <div className="flex space-x-3">
//                 <input
//                   type="text"
//                   placeholder="MM/YY"
//                   className="w-1/2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="CVC"
//                   className="w-1/2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   required
//                 />
//               </div>
//             </div>
//           )}

//           {/* JazzCash Details */}
//           {method === "jazzcash" && (
//             <div className="space-y-4 mt-4 p-4 border rounded-xl bg-gray-50">
//               <p className="text-gray-700 font-semibold">Send payment to:</p>
//               <p className="text-gray-600">📱 JazzCash Number: <b>0301-1234567</b></p>
//               <input
//                 type="text"
//                 placeholder="Enter your JazzCash Transaction ID"
//                 className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 required
//               />
//             </div>
//           )}

//           {/* Bank Transfer Details */}
//           {method === "bank" && (
//             <div className="space-y-4 mt-4 p-4 border rounded-xl bg-gray-50">
//               <p className="text-gray-700 font-semibold">Transfer to Bank:</p>
//               <p className="text-gray-600">🏦 Bank Name: HBL</p>
//               <p className="text-gray-600">💳 Account No: 1234-567890</p>
//               <p className="text-gray-600">IBAN: PK12HBL1234567890</p>
//               <input
//                 type="text"
//                 placeholder="Enter Bank Transaction ID"
//                 className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 required
//               />
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
//           >
//             Pay Now
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function PaymentPage() {
  const [method, setMethod] = useState("credit");
  const location = useLocation();
  const navigate = useNavigate();

  // Plan info aayega PlansPage se
  const plan = location.state?.plan;

  // ✅ Plan durations (expiry set karne ke liye)
  const planDurations = {
    Premium: 30,
    Enterprise: 90,
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !user.email) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    // ✅ Save paid plan + expiry in user
    const days = planDurations[plan] || 30; // default 30
    const updatedUser = {
      ...user,
      plan,
      planExpiry: new Date(
        Date.now() + days * 24 * 60 * 60 * 1000
      ).toISOString(),
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success(`Payment successful for ${plan} with ${method.toUpperCase()}! 🎉`);

    setTimeout(() => {
      navigate("/add-business", { state: { plan } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {plan ? `Complete Payment for ${plan}` : "Choose Your Payment Method"}
        </h2>

        <form onSubmit={handlePayment} className="space-y-6">
          {/* Payment Options */}
          <div className="space-y-3">
            <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="payment"
                value="credit"
                checked={method === "credit"}
                onChange={() => setMethod("credit")}
                className="mr-3"
              />
              💳 Credit / Debit Card
            </label>

            <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="payment"
                value="jazzcash"
                checked={method === "jazzcash"}
                onChange={() => setMethod("jazzcash")}
                className="mr-3"
              />
              📱 JazzCash
            </label>

            <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={method === "bank"}
                onChange={() => setMethod("bank")}
                className="mr-3"
              />
              🏦 Bank Transfer
            </label>
          </div>

          {/* Card Details */}
          {method === "credit" && (
            <div className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-1/2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>
          )}

          {/* JazzCash Details */}
          {method === "jazzcash" && (
            <div className="space-y-4 mt-4 p-4 border rounded-xl bg-gray-50">
              <p className="text-gray-700 font-semibold">Send payment to:</p>
              <p className="text-gray-600">📱 JazzCash Number: <b>0301-1234567</b></p>
              <input
                type="text"
                placeholder="Enter your JazzCash Transaction ID"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          )}

          {/* Bank Transfer Details */}
          {method === "bank" && (
            <div className="space-y-4 mt-4 p-4 border rounded-xl bg-gray-50">
              <p className="text-gray-700 font-semibold">Transfer to Bank:</p>
              <p className="text-gray-600">🏦 Bank Name: HBL</p>
              <p className="text-gray-600">💳 Account No: 1234-567890</p>
              <p className="text-gray-600">IBAN: PK12HBL1234567890</p>
              <input
                type="text"
                placeholder="Enter Bank Transaction ID"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
