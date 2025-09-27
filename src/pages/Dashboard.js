
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   LineChart, Line, CartesianGrid
// } from "recharts";

// const API_BASE = "http://localhost:5000/api/auth";

// // ✅ Plan + Price + Limit mapping
// const planDetails = {
//   Free: { price: "0 PKR", limit: 1 },
//   Basic: { price: "500 PKR", limit: 3 },
//   Standard: { price: "1000 PKR", limit: 5 },
//   Premium: { price: "2000 PKR", limit: 10 },
// };

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("home");
//   const [stats, setStats] = useState({ totalBusinesses: 0, activeAds: 0, profileViews: 0 });
//   const [editingBusiness, setEditingBusiness] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const categories = ["Restaurants", "Hotels", "Shopping", "Services", "Healthcare", "Education"];

//   // ✅ Safe load user from localStorage
//   const loadUser = () => {
//     try {
//       const data = localStorage.getItem("user");
//       if (!data) return null;
//       return JSON.parse(data);
//     } catch (err) {
//       console.error("Invalid user in localStorage:", err);
//       return null;
//     }
//   };

//   // ✅ Update stats helper
//   const updateStats = (usr) => {
//     if (!usr) {
//       setStats({ totalBusinesses: 0, activeAds: 0, profileViews: 0 });
//       return;
//     }
//     setStats({
//       totalBusinesses: usr.businesses?.length || 0,
//       activeAds: usr.businesses?.filter(b => b.active).length || 0,
//       profileViews: usr.profileViews || 0,
//     });
//   };

//   // ✅ Fetch user's businesses from backend
//   const fetchUserAndBusinesses = async (storedUser) => {
//     if (!storedUser?.email) return;
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_BASE}/businesses/${storedUser.email}`);

//       const freshBusinesses = Array.isArray(res.data)
//         ? res.data
//         : res.data.businesses || [];

//       const updatedUser = { ...storedUser, businesses: freshBusinesses };
//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       updateStats(updatedUser);
//     } catch (err) {
//       console.error("Failed to load businesses:", err?.response?.data || err.message);
//       setUser(storedUser);
//       updateStats(storedUser);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const storedUser = loadUser();
//     if (!storedUser?._id) {
//       navigate("/login");
//       return;
//     }
//     fetchUserAndBusinesses(storedUser);
//   }, [navigate]);

//   useEffect(() => {
//     const handleStorage = () => {
//       const updatedUser = loadUser();
//       if (updatedUser) {
//         fetchUserAndBusinesses(updatedUser);
//       } else {
//         setUser(null);
//       }
//     };
//     window.addEventListener("storage", handleStorage);
//     return () => window.removeEventListener("storage", handleStorage);
//   }, []);

//   if (!user) return <div className="p-8 text-xl">Loading Dashboard...</div>;

//   // ✅ Chart Data
//   const chartData = [
//     { name: "Businesses", value: stats.totalBusinesses },
//     { name: "Active Ads", value: stats.activeAds },
//     { name: "Profile Views", value: stats.profileViews },
//   ];

 

//   const handleDeleteBusiness = async (id) => {
//     if (!id) {
//       alert("Invalid business ID");
//       return;
//     }
//     if (!window.confirm("Are you sure you want to delete this business?")) return;
//     try {
//       const res = await axios.delete(`${API_BASE}/business/${id}`, { data: { email: user.email } });
//       alert(res.data.message || "Deleted");
//       await fetchUserAndBusinesses(user);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error deleting business");
//     }
//   };

//   const handleSaveBusiness = async (e) => {
//     e.preventDefault();
//     if (!editingBusiness) return;
//     try {
//       let res;
//       if (editingBusiness._id) {
//         res = await axios.put(`${API_BASE}/business/${editingBusiness._id}`, {
//           email: user.email,
//           businessName: editingBusiness.businessName,
//           address: editingBusiness.address,
//           phone: editingBusiness.phone,
//           description: editingBusiness.description,
//           category: editingBusiness.category,
//           plan: editingBusiness.plan || user.plan || "Free"
//         });
//       } else {
//         res = await axios.post(`${API_BASE}/add-business`, {
//           email: user.email,
//           businessName: editingBusiness.businessName,
//           address: editingBusiness.address,
//           phone: editingBusiness.phone,
//           description: editingBusiness.description,
//           category: editingBusiness.category,
//           plan: editingBusiness.plan || user.plan || "Free"
//         });
//       }
//       alert(res.data.message || "Saved");

//       // ✅ after save, fetch fresh businesses
//       const freshUser = loadUser();
//       await fetchUserAndBusinesses(freshUser);

//       setEditingBusiness(null);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error saving business");
//     }
//   };

//   const startEdit = (biz) => {
//     setEditingBusiness(biz ? { ...biz } : {});
//   };

//   const userCategories = [...new Set(user.businesses?.map(b => b.category).filter(Boolean))];

//   // ✅ plan details
//   const currentPlan = planDetails[user.plan || "Free"];
//   const used = user.businesses?.length || 0;
//   const remaining = currentPlan.limit - used;

//   return (
//     <div className="min-h-screen flex bg-stone-100">
//       {/* ✅ Side Navbar */}
//       <div className="w-64 bg-orange-500 flex flex-col justify-between h-screen p-4">
//         <div>
//           <h2 className="text-white text-2xl font-bold mb-6">BizNest</h2>
//           <button
//             className={`w-full text-left py-2 px-4 mb-2 rounded-lg ${activeTab==="home"?"bg-orange-600 text-white":"text-white hover:bg-orange-600"}`}
//             onClick={()=>setActiveTab("home")}
//           >Home</button>
//           <button
//             className={`w-full text-left py-2 px-4 rounded-lg ${activeTab==="categories"?"bg-orange-600 text-white":"text-white hover:bg-orange-600"}`}
//             onClick={()=>setActiveTab("categories")}
//           >Categories</button>
//         </div>
//       <div>
//           <button
//     className="w-full bg-white text-orange-500 py-2 px-4  rounded-lg font-semibold hover:bg-orange-100"
//     onClick={()=>startEdit(null)}
//   >Add Business</button> </div>
          
        
//       </div>

//       {/* ✅ Main Content */}
//       <div className="flex-1 p-6 overflow-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           Let’s Rock✨: {user.firstName} {user.lastName}!
//         </h1>

//         {/* ✅ Home Tab */}
//         {activeTab === "home" && <>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             {/* ✅ User Info */}
//             <div className="bg-white shadow-lg p-6 rounded-lg">
//               <h2 className="text-xl font-semibold mb-4">User Info</h2>
//               <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Phone:</strong> {user.phone}</p>
//               <p>
//                 <strong>Plan:</strong> {user.plan || "Free"}  
//                 <span className="ml-2 text-sm text-gray-600">
//                   ({currentPlan.price})
//                 </span>
//               </p>
//               <p><strong>Limit:</strong> {currentPlan.limit}</p>
//               <p><strong>Used:</strong> {used}</p>
//               <p><strong>Remaining:</strong> {remaining}</p>
//             </div>

//             {/* ✅ Business Info */}
//             <div className="bg-white shadow-lg p-6 rounded-lg">
//               <h2 className="text-xl font-semibold mb-4">Business Info</h2>
//               {loading && <p>Loading businesses...</p>}
//               {!loading && (!user.businesses || user.businesses.length === 0) && <p>No businesses yet.</p>}
//               {!loading && user.businesses?.map((b,i)=>(
//                 <div key={b._id || i} className="mt-2 p-2 border rounded relative">
//                   <p><strong>Name:</strong> {b.businessName}</p>
//                   <p><strong>Category:</strong> {b.category}</p>
//                   <p><strong>Address:</strong> {b.address}</p>
//                   <p><strong>Phone:</strong> {b.phone}</p>
//                   <p>
//                     <strong>Plan:</strong> {b.plan || user.plan || "Free"}  
//                     <span className="ml-2 text-sm text-gray-600">
//                       ({planDetails[b.plan || user.plan || "Free"].price})
//                     </span>
//                   </p>
//                   <div className="absolute top-2 right-2 flex gap-2">
//                     <button
//                       className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
//                       onClick={()=>startEdit(b)}
//                     >Edit</button>
//                     <button
//                       className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700"
//                       onClick={()=>{
//                         // create slug: lowercase and hyphenate spaces so Categories page can read /categories/:name
//                         const slug = (b.category || "").toLowerCase().replace(/\s+/g, "-");
//                         navigate(`/categories/${encodeURIComponent(slug)}?businessId=${b._id}`);
//                       }}
//                     >View</button>
//                     <button
//                       className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
//                       onClick={()=>handleDeleteBusiness(b._id)}
//                     >Delete</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ✅ Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-white shadow-lg p-6 text-center rounded-lg">
//               <h3 className="text-xl font-semibold text-gray-700">Businesses</h3>
//               <p className="text-3xl font-bold text-orange-500">{stats.totalBusinesses}</p>
//             </div>
//             <div className="bg-white shadow-lg p-6 text-center rounded-lg">
//               <h3 className="text-xl font-semibold text-gray-700">Active Ads</h3>
//               <p className="text-3xl font-bold text-teal-600">{stats.activeAds}</p>
//             </div>
//             <div className="bg-white shadow-lg p-6 text-center rounded-lg">
//               <h3 className="text-xl font-semibold text-gray-700">Profile Views</h3>
//               <p className="text-3xl font-bold text-purple-600">{stats.profileViews}</p>
//             </div>
//           </div>

//           {/* ✅ Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white shadow-lg p-6 rounded-lg">
//               <h2 className="text-xl font-semibold mb-4 text-gray-700">Overview (Bar Chart)</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={chartData}>
//                   <XAxis dataKey="name"/>
//                   <YAxis domain={[1,6]}/> {/* ✅ Start from 2 */}
//                   <Tooltip/>
//                   <Bar dataKey="value" fill="#10b981"/>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="bg-white shadow-lg p-6 rounded-lg">
//               <h2 className="text-xl font-semibold mb-4 text-gray-700">Growth (Line Chart)</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3"/>
//                   <XAxis dataKey="name"/>
//                   <YAxis domain={[1, 6]}/> {/* ✅ Start from 2 */}
//                   <Tooltip/>
//                   <Line type="monotone" dataKey="value" stroke="#f97316"/>
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </>}

//         {/* ✅ Categories Tab */}
//         {activeTab==="categories" && <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Your Selected Categories</h2>
//           {userCategories.length>0 ? userCategories.map((cat,i)=>
//             <div key={i} className="p-3 mb-2 border rounded">{cat}</div>
//           ) : <p>No categories selected yet.</p>}
//         </div>}

//         {/* ✅ Add/Edit Modal */}
//         {editingBusiness !== null && <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-lg">
//             <h2 className="text-xl font-bold mb-4">{editingBusiness._id ? "Edit Business" : "Add Business"}</h2>
//             <form onSubmit={handleSaveBusiness}>
//               <input type="text" value={editingBusiness.businessName||""} onChange={e=>setEditingBusiness(prev=>({...prev,businessName:e.target.value}))} placeholder="Business Name" className="w-full border px-3 py-2 rounded mb-2" required/>
//               <input type="text" value={editingBusiness.address||""} onChange={e=>setEditingBusiness(prev=>({...prev,address:e.target.value}))} placeholder="Address" className="w-full border px-3 py-2 rounded mb-2" required/>
//               <input type="text" value={editingBusiness.phone||""} onChange={e=>setEditingBusiness(prev=>({...prev,phone:e.target.value}))} placeholder="Phone" className="w-full border px-3 py-2 rounded mb-2" required/>
//               <textarea value={editingBusiness.description||""} onChange={e=>setEditingBusiness(prev=>({...prev,description:e.target.value}))} placeholder="Description" className="w-full border px-3 py-2 rounded mb-2"/>
//               <select value={editingBusiness.category||""} onChange={e=>setEditingBusiness(prev=>({...prev,category:e.target.value}))} className="w-full border px-3 py-2 rounded mb-4" required>
//                 <option value="">Select Category</option>
//                 {categories.map(cat=><option key={cat} value={cat}>{cat}</option>)}
//               </select>
//               <div className="flex justify-end gap-2">
//                 <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={()=>setEditingBusiness(null)}>Cancel</button>
//                 <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">{editingBusiness._id ? "Update" : "Add"}</button>
//               </div>
//             </form>
//           </div>
//         </div>}
//       </div>
//     </div>
//   );
// };

// // export default Dashboard;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   LineChart, Line, CartesianGrid
// } from "recharts";

// const API_BASE = "http://localhost:5000/api/auth";

// const planDetails = {
//   Free: { price: "0 PKR", limit: 1 },
//   Basic: { price: "500 PKR", limit: 3 },
//   Standard: { price: "1000 PKR", limit: 5 },
//   Premium: { price: "2000 PKR", limit: 10 },
// };

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("home");
//   const [stats, setStats] = useState({ totalBusinesses: 0, activeAds: 0, profileViews: 0 });
//   const [editingBusiness, setEditingBusiness] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const categories = ["Restaurants", "Hotels", "Shopping", "Services", "Healthcare", "Education"];

//   const loadUser = () => {
//     try {
//       const data = localStorage.getItem("user");
//       if (!data) return null;
//       return JSON.parse(data);
//     } catch {
//       return null;
//     }
//   };

//   const updateStats = (usr) => {
//     if (!usr) {
//       setStats({ totalBusinesses: 0, activeAds: 0, profileViews: 0 });
//       return;
//     }
//     setStats({
//       totalBusinesses: usr.businesses?.length || 0,
//       activeAds: usr.businesses?.filter(b => b.active).length || 0,
//       profileViews: usr.profileViews || 0,
//     });
//   };

//   const fetchUserAndBusinesses = async (storedUser) => {
//     if (!storedUser?.email) return;
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_BASE}/businesses/${storedUser.email}`);
//       const freshBusinesses = Array.isArray(res.data) ? res.data : res.data.businesses || [];
//       const updatedUser = { ...storedUser, businesses: freshBusinesses };
//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       updateStats(updatedUser);
//     } catch {
//       setUser(storedUser);
//       updateStats(storedUser);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const storedUser = loadUser();
//     if (!storedUser?._id) {
//       navigate("/login");
//       return;
//     }
//     fetchUserAndBusinesses(storedUser);
//   }, [navigate]);

//   const handleDeleteBusiness = async (id) => {
//     if (!id) return;
//     if (!window.confirm("Are you sure you want to delete this business?")) return;
//     try {
//       await axios.delete(`${API_BASE}/business/${id}`, { data: { email: user.email } });
//       const freshUser = loadUser();
//       fetchUserAndBusinesses(freshUser);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error deleting business");
//     }
//   };

//   const handleSaveBusiness = async (e) => {
//     e.preventDefault();
//     if (!editingBusiness) return;
//     try {
//       let res;
//       if (editingBusiness._id) {
//         res = await axios.put(`${API_BASE}/business/${editingBusiness._id}`, {
//           email: user.email,
//           ...editingBusiness
//         });
//       } else {
//         res = await axios.post(`${API_BASE}/add-business`, {
//           email: user.email,
//           ...editingBusiness
//         });
//       }
//       alert(res.data.message || "Saved");
//       const freshUser = loadUser();
//       fetchUserAndBusinesses(freshUser);
//       setEditingBusiness(null);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error saving business");
//     }
//   };

//   const startEdit = (biz) => setEditingBusiness(biz ? { ...biz } : {});

//   if (!user) return <div className="p-8 text-xl">Loading Dashboard...</div>;

//   const chartData = [
//     { name: "Businesses", value: stats.totalBusinesses },
//     { name: "Active Ads", value: stats.activeAds },
//     { name: "Profile Views", value: stats.profileViews },
//   ];

//   const userCategories = [...new Set(user.businesses?.map(b => b.category).filter(Boolean))];
//   const currentPlan = planDetails[user.plan || "Free"];
//   const used = user.businesses?.length || 0;
//   const remaining = currentPlan.limit - used;

//   return (
//     <div className="min-h-screen flex bg-stone-100">
//       {/* Side Navbar */}
//       <div className="w-64 bg-orange-500 flex flex-col justify-between h-screen p-4">
//         <div>
//           <h2 className="text-white text-2xl font-bold mb-6">BizNest</h2>
//           <button className={`w-full text-left py-2 px-4 mb-2 rounded-lg ${activeTab==="home"?"bg-orange-600":"text-white hover:bg-orange-600"}`} onClick={()=>setActiveTab("home")}>Home</button>
//           <button className={`w-full text-left py-2 px-4 rounded-lg ${activeTab==="categories"?"bg-orange-600":"text-white hover:bg-orange-600"}`} onClick={()=>setActiveTab("categories")}>Categories</button>
//         </div>
//         <div>
//           <button className="w-full bg-white text-orange-500 py-2 px-4 rounded-lg font-semibold hover:bg-orange-100" onClick={()=>startEdit(null)}>Add Business</button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 overflow-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Let’s Rock✨: {user.firstName} {user.lastName}!</h1>

//         {activeTab==="home" && <>
//           {/* User + Business Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="bg-white shadow-lg p-6 rounded-lg">
//               <h2 className="text-xl font-semibold mb-4">User Info</h2>
//               <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Phone:</strong> {user.phone}</p>
//               <p><strong>Plan:</strong> {user.plan || "Free"} ({currentPlan.price})</p>
//               <p><strong>Limit:</strong> {currentPlan.limit}</p>
//               <p><strong>Used:</strong> {used}</p>
//               <p><strong>Remaining:</strong> {remaining}</p>
//             </div>

//             <div className="bg-white shadow-lg p-6 rounded-lg">
//               <h2 className="text-xl font-semibold mb-4">Business Info</h2>
//               {loading && <p>Loading businesses...</p>}
//               {!loading && (!user.businesses || user.businesses.length===0) && <p>No businesses yet.</p>}
//               {!loading && user.businesses?.map((b,i)=>(
//                 <div key={b._id || i} className="mt-2 p-2 border rounded relative">
//                   <p><strong>Name:</strong> {b.businessName}</p>
//                   <p><strong>Category:</strong> {b.category}</p>
//                   <p><strong>Address:</strong> {b.address}</p>
//                   <p><strong>Phone:</strong> {b.phone}</p>
//                   <p><strong>Plan:</strong> {b.plan || user.plan || "Free"} ({planDetails[b.plan || user.plan || "Free"].price})</p>
//                   <div className="absolute top-2 right-2 flex gap-2">
//                     <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600" onClick={()=>startEdit(b)}>Edit</button>
//                     <button className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700" onClick={()=>navigate(`/categories/${encodeURIComponent((b.category||"").toLowerCase().replace(/\s+/g,"-"))}?businessId=${b._id}`)}>View</button>
//                     <button className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600" onClick={()=>handleDeleteBusiness(b._id)}>Delete</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Stats + Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-white shadow-lg p-6 text-center rounded-lg">
//               <h3 className="text-xl font-semibold text-gray-700">Businesses</h3>
//               <p className="text-3xl font-bold text-orange-500">{stats.totalBusinesses}</p>
//             </div>
//             <div className="bg-white shadow-lg p-6 text-center rounded-lg">
//               <h3 className="text-xl font-semibold text-gray-700">Active Ads</h3>
//               <p className="text-3xl font-bold text-teal-600">{stats.activeAds}</p>
//             </div>
//             <div className="bg-white shadow-lg p-6 text-center rounded-lg">
//               <h3 className="text-xl font-semibold text-gray-700">Profile Views</h3>
//               <p className="text-3xl font-bold text-purple-600">{stats.profileViews}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white shadow-lg p-6 rounded-lg">
//               <h2 className="text-xl font-semibold mb-4 text-gray-700">Overview (Bar Chart)</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={chartData}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value" fill="#10b981"/></BarChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="bg-white shadow-lg p-6 rounded-lg">
//               <h2 className="text-xl font-semibold mb-4 text-gray-700">Growth (Line Chart)</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={chartData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Line type="monotone" dataKey="value" stroke="#f97316"/></LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </>}

//         {/* Categories Tab */}
//         {activeTab==="categories" && <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Your Selected Categories</h2>
//           {userCategories.length>0 ? userCategories.map((cat,i)=><div key={i} className="p-3 mb-2 border rounded">{cat}</div>) : <p>No categories selected yet.</p>}
//         </div>}

//         {/* Add/Edit Modal */}
//         {editingBusiness!==null && <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-lg">
//             <h2 className="text-xl font-bold mb-4">{editingBusiness._id ? "Edit Business" : "Add Business"}</h2>
//             <form onSubmit={handleSaveBusiness}>
//               <input type="text" value={editingBusiness.businessName||""} onChange={e=>setEditingBusiness(prev=>({...prev,businessName:e.target.value}))} placeholder="Business Name" className="w-full border px-3 py-2 rounded mb-2" required/>
//               <input type="text" value={editingBusiness.address||""} onChange={e=>setEditingBusiness(prev=>({...prev,address:e.target.value}))} placeholder="Address" className="w-full border px-3 py-2 rounded mb-2" required/>
//               <input type="text" value={editingBusiness.phone||""} onChange={e=>setEditingBusiness(prev=>({...prev,phone:e.target.value}))} placeholder="Phone" className="w-full border px-3 py-2 rounded mb-2" required/>
//               <textarea value={editingBusiness.description||""} onChange={e=>setEditingBusiness(prev=>({...prev,description:e.target.value}))} placeholder="Description" className="w-full border px-3 py-2 rounded mb-2"/>
//               <select value={editingBusiness.category||""} onChange={e=>setEditingBusiness(prev=>({...prev,category:e.target.value}))} className="w-full border px-3 py-2 rounded mb-4" required>
//                 <option value="">Select Category</option>
//                 {categories.map(cat=><option key={cat} value={cat}>{cat}</option>)}
//               </select>
//               <div className="flex justify-end gap-2">
//                 <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={()=>setEditingBusiness(null)}>Cancel</button>
//                 <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">{editingBusiness._id ? "Update" : "Add"}</button>
//               </div>
//             </form>
//           </div>
//         </div>}

//       </div>
//     </div>
//   );
// };

// // export default Dashboard;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   LineChart, Line, CartesianGrid
// } from "recharts";

// const API_BASE = "http://localhost:5000/api/auth";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [stats, setStats] = useState({
//     totalBusinesses: 0,
//     activeListings: 0,
//     pendingReviews: 0,
//   });

//   // ✅ localStorage se user load karna
//   const loadUser = () => JSON.parse(localStorage.getItem("user"));

//   // ✅ stats update helper
//   const updateStats = (userData) => {
//     setStats({
//       totalBusinesses: userData.businesses?.length || 0,
//       activeListings: userData.businesses?.filter(b => b.status === "active").length || 0,
//       pendingReviews: userData.businesses?.filter(b => b.status === "pending").length || 0,
//     });
//   };

//   // ✅ user + businesses fetch
//   const fetchUserAndBusinesses = async (freshUser) => {
//     try {
//       const res = await axios.get(`${API_BASE}/me`, {
//         headers: { Authorization: `Bearer ${freshUser.token}` },
//       });
//       setUser(res.data);
//       updateStats(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));
//     } catch (err) {
//       console.error("Error fetching user:", err);
//       navigate("/login");
//     }
//   };

//   // ✅ Delete business
//   const handleDeleteBusiness = async (id) => {
//     if (!id) return;
//     if (!window.confirm("Are you sure you want to delete this business?")) return;

//     try {
//       await axios.delete(`${API_BASE}/business/${id}?email=${user.email}`); // ✅ email as query param
//       const freshUser = loadUser();
//       fetchUserAndBusinesses(freshUser);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error deleting business");
//     }
//   };

//   // ✅ Edit business
//   const handleEditBusiness = async (id, updatedData) => {
//     try {
//       await axios.put(`${API_BASE}/business/${id}`, updatedData);
//       const freshUser = loadUser();
//       fetchUserAndBusinesses(freshUser);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error editing business");
//     }
//   };

//   // ✅ on mount
//   useEffect(() => {
//     const freshUser = loadUser();
//     if (!freshUser) return navigate("/login");
//     fetchUserAndBusinesses(freshUser);
//   }, []);

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

//       {/* Stats Section */}
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="p-4 bg-white shadow rounded">
//           <h2>Total Businesses</h2>
//           <p>{stats.totalBusinesses}</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded">
//           <h2>Active Listings</h2>
//           <p>{stats.activeListings}</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded">
//           <h2>Pending Reviews</h2>
//           <p>{stats.pendingReviews}</p>
//         </div>
//       </div>

//       {/* Businesses List */}
//       <div>
//         <h2 className="text-xl font-semibold mb-3">My Businesses</h2>
//         <ul>
//           {user.businesses?.map((b) => (
//             <li key={b._id} className="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded">
//               <span>{b.name}</span>
//               <div className="space-x-2">
//                 <button
//                   onClick={() => handleEditBusiness(b._id, { name: prompt("New name:", b.name) })}
//                   className="px-3 py-1 bg-blue-500 text-white rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteBusiness(b._id)}
//                   className="px-3 py-1 bg-red-500 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from "recharts";

const API_BASE = "http://localhost:5000/api/auth";

const planDetails = {
  Free: { price: "0 PKR", limit: 1 },
  Basic: { price: "500 PKR", limit: 3 },
  Standard: { price: "1000 PKR", limit: 5 },
  Premium: { price: "2000 PKR", limit: 10 },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [stats, setStats] = useState({ totalBusinesses: 0, activeAds: 0, profileViews: 0 });
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = ["Restaurants", "Hotels", "Shopping", "Services", "Healthcare", "Education"];

  // Load user from localStorage
  const loadUser = () => {
    try {
      const data = localStorage.getItem("user");
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  // Update stats
  const updateStats = (usr) => {
    if (!usr) {
      setStats({ totalBusinesses: 0, activeAds: 0, profileViews: 0 });
      return;
    }
    setStats({
      totalBusinesses: usr.businesses?.length || 0,
      activeAds: usr.businesses?.filter((b) => b.active).length || 0,
      profileViews: usr.profileViews || 0,
    });
  };

  // Fetch businesses for user
  const fetchUserAndBusinesses = async (storedUser) => {
    if (!storedUser?.email) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/businesses/${storedUser.email}`);
      const freshBusinesses = Array.isArray(res.data) ? res.data : res.data.businesses || [];
      const updatedUser = { ...storedUser, businesses: freshBusinesses };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      updateStats(updatedUser);
    } catch {
      setUser(storedUser);
      updateStats(storedUser);
    } finally {
      setLoading(false);
    }
  };

  // On mount
  useEffect(() => {
    const storedUser = loadUser();
    if (!storedUser?._id) {
      navigate("/login");
      return;
    }
    fetchUserAndBusinesses(storedUser);
  }, [navigate]);

  // Delete business
  const handleDeleteBusiness = async (id) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this business?")) return;
    try {
      await axios.delete(`${API_BASE}/business/${id}`, { data: { email: user.email } });
      const freshUser = loadUser();
      fetchUserAndBusinesses(freshUser);
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting business");
    }
  };

  // Save (add or edit) business
  const handleSaveBusiness = async (e) => {
    e.preventDefault();
    if (!editingBusiness) return;
    try {
      let res;
      if (editingBusiness._id) {
        res = await axios.put(`${API_BASE}/business/${editingBusiness._id}`, {
          email: user.email,
          ...editingBusiness,
        });
      } else {
        res = await axios.post(`${API_BASE}/add-business`, {
          email: user.email,
          ...editingBusiness,
        });
      }
      alert(res.data.message || "Saved");
      const freshUser = loadUser();
      fetchUserAndBusinesses(freshUser);
      setEditingBusiness(null);
    } catch (err) {
      alert(err.response?.data?.message || "Error saving business");
    }
  };

  const startEdit = (biz) => setEditingBusiness(biz ? { ...biz } : {});

  if (!user) return <div className="p-8 text-xl">Loading Dashboard...</div>;

  // Chart data
  const chartData = [
    { name: "Businesses", value: stats.totalBusinesses },
    { name: "Active Ads", value: stats.activeAds },
    { name: "Profile Views", value: stats.profileViews },
  ];

  const userCategories = [...new Set(user.businesses?.map((b) => b.category).filter(Boolean))];
  const currentPlan = planDetails[user.plan || "Free"];
  const used = user.businesses?.length || 0;
  const remaining = currentPlan.limit - used;

  return (
    <div className="min-h-screen flex bg-stone-100">
      {/* Side Navbar */}
      <div className="w-64 bg-orange-500 flex flex-col justify-between h-screen p-4">
        <div>
          <h2 className="text-white text-2xl font-bold mb-6">BizNest</h2>
          <button
            className={`w-full text-left py-2 px-4 mb-2 rounded-lg ${
              activeTab === "home" ? "bg-orange-600" : "text-white hover:bg-orange-600"
            }`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeTab === "categories" ? "bg-orange-600" : "text-white hover:bg-orange-600"
            }`}
            onClick={() => setActiveTab("categories")}
          >
            Categories
          </button>
        </div>
        <div>
          <button
            className="w-full bg-white text-orange-500 py-2 px-4 rounded-lg font-semibold hover:bg-orange-100"
            onClick={() => startEdit(null)}
          >
            Add Business
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Let’s Rock✨: {user.firstName} {user.lastName}!
        </h1>

        {activeTab === "home" && (
          <>
            {/* User + Business Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* User Info */}
              <div className="bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">User Info</h2>
                <p>
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Plan:</strong> {user.plan || "Free"} ({currentPlan.price})
                </p>
                <p>
                  <strong>Limit:</strong> {currentPlan.limit}
                </p>
                <p>
                  <strong>Used:</strong> {used}
                </p>
                <p>
                  <strong>Remaining:</strong> {remaining}
                </p>
              </div>

              {/* Business Info */}
              <div className="bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Business Info</h2>
                {loading && <p>Loading businesses...</p>}
                {!loading && (!user.businesses || user.businesses.length === 0) && (
                  <p>No businesses yet.</p>
                )}
                {!loading &&
                  user.businesses?.map((b, i) => (
                    <div key={b._id || i} className="mt-2 p-2 border rounded relative">
                      <p>
                        <strong>Name:</strong> {b.businessName}
                      </p>
                      <p>
                        <strong>Category:</strong> {b.category}
                      </p>
                      <p>
                        <strong>Address:</strong> {b.address}
                      </p>
                      <p>
                        <strong>Phone:</strong> {b.phone}
                      </p>
                      <p>
                        <strong>Plan:</strong>{" "}
                        {b.plan || user.plan || "Free"} (
                        {planDetails[b.plan || user.plan || "Free"].price})
                      </p>
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                          onClick={() => startEdit(b)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700"
                          onClick={() =>
                            navigate(
                              `/categories/${encodeURIComponent(
                                (b.category || "").toLowerCase().replace(/\s+/g, "-")
                              )}?businessId=${b._id}`
                            )
                          }
                        >
                          View
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                          onClick={() => handleDeleteBusiness(b._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Stats + Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white shadow-lg p-6 text-center rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">Businesses</h3>
                <p className="text-3xl font-bold text-orange-500">{stats.totalBusinesses}</p>
              </div>
              <div className="bg-white shadow-lg p-6 text-center rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">Active Ads</h3>
                <p className="text-3xl font-bold text-teal-600">{stats.activeAds}</p>
              </div>
              <div className="bg-white shadow-lg p-6 text-center rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">Profile Views</h3>
                <p className="text-3xl font-bold text-purple-600">{stats.profileViews}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Overview (Bar Chart)</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Growth (Line Chart)</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#f97316" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Selected Categories</h2>
            {userCategories.length > 0 ? (
              userCategories.map((cat, i) => (
                <div key={i} className="p-3 mb-2 border rounded">
                  {cat}
                </div>
              ))
            ) : (
              <p>No categories selected yet.</p>
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        {editingBusiness !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">
                {editingBusiness._id ? "Edit Business" : "Add Business"}
              </h2>
              <form onSubmit={handleSaveBusiness}>
                <input
                  type="text"
                  value={editingBusiness.businessName || ""}
                  onChange={(e) =>
                    setEditingBusiness((prev) => ({ ...prev, businessName: e.target.value }))
                  }
                  placeholder="Business Name"
                  className="w-full border px-3 py-2 rounded mb-2"
                  required
                />
                <input
                  type="text"
                  value={editingBusiness.address || ""}
                  onChange={(e) =>
                    setEditingBusiness((prev) => ({ ...prev, address: e.target.value }))
                  }
                  placeholder="Address"
                  className="w-full border px-3 py-2 rounded mb-2"
                  required
                />
                <input
                  type="text"
                  value={editingBusiness.phone || ""}
                  onChange={(e) =>
                    setEditingBusiness((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="Phone"
                  className="w-full border px-3 py-2 rounded mb-2"
                  required
                />
                <textarea
                  value={editingBusiness.description || ""}
                  onChange={(e) =>
                    setEditingBusiness((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Description"
                  className="w-full border px-3 py-2 rounded mb-2"
                />
                <select
                  value={editingBusiness.category || ""}
                  onChange={(e) =>
                    setEditingBusiness((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="w-full border px-3 py-2 rounded mb-4"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                    onClick={() => setEditingBusiness(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2 rounded"
                  >
                    {editingBusiness._id ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
