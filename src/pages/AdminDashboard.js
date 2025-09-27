// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminDashboard() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/auth/admin/dashboard")
//       .then((res) => setData(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   if (!data) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📊 Admin Dashboard</h1>

//       {/* Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
//         <div className="p-6 bg-teal-600 text-white rounded-xl shadow-md">
//           <h2 className="text-lg">Total Users</h2>
//           <p className="text-2xl font-bold">{data.totalUsers}</p>
//         </div>
//         <div className="p-6 bg-orange-500 text-white rounded-xl shadow-md">
//           <h2 className="text-lg">Total Revenue</h2>
//           <p className="text-2xl font-bold">Rs {data.totalRevenue}</p>
//         </div>
//       </div>

//       {/* Users + Businesses */}
//       <h2 className="text-2xl font-semibold mb-4 text-gray-700">👥 Users & Businesses</h2>
//       <div className="space-y-6">
//         {data.users.map((u) => (
//           <div key={u._id} className="bg-white shadow-md rounded-lg p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-800">{u.firstName} {u.lastName}</h3>
//               <span className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700">
//                 {u.plan} Plan
//               </span>
//             </div>
//             <p className="text-gray-600">📧 {u.email}</p>

//             {/* Businesses */}
//             <div className="mt-4">
//               <h4 className="font-semibold text-gray-700">Businesses:</h4>
//               {u.businesses.length > 0 ? (
//                 <ul className="list-disc pl-6 mt-2 space-y-1">
//                   {u.businesses.map((b) => (
//                     <li key={b._id} className="text-gray-700">
//                       <span className="font-semibold">{b.businessName}</span> — {b.category?.name || b.category}
//                       <p className="text-sm text-gray-500">{b.description}</p>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500">No businesses added.</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/admin/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-teal-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-medium">Total Users</h2>
          <p className="text-3xl font-bold">{data.totalUsers}</p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-medium">Total Revenue</h2>
          <p className="text-3xl font-bold">Rs {data.totalRevenue}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Businesses
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.users.map((u) => (
              <tr key={u._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {u.firstName} {u.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {u.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {u.plan}
                </td>
                <td className="px-6 py-4">
                  {u.businesses && u.businesses.length > 0 ? (
                    <ul className="space-y-2">
                      {u.businesses.map((b) => (
                        <li
                          key={b._id}
                          className="p-2 bg-gray-100 rounded-lg shadow-sm"
                        >
                          <p className="font-semibold">{b.businessName}</p>
                          <p className="text-xs text-gray-500">
                            Category: {b.category}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400 text-sm">No Businesses</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
