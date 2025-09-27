// import { useState, useEffect } from "react"
// import { useParams, useNavigate, useLocation } from "react-router-dom"
// import mainBg from "../Assests/main.avif"
// import { Utensils, Hotel, ShoppingBag, Wrench, Stethoscope, GraduationCap } from "lucide-react"

// function Categories() {
//   const { name } = useParams()
//   const location = useLocation()
//   const navigate = useNavigate()
//   const [selectedCategory, setSelectedCategory] = useState("All")
//   const [searchTerm, setSearchTerm] = useState("")

//   const categories = [
//     {
//       name: "Restaurants", count: 45, icon: <Utensils className="w-6 h-6" />,
//       businesses: [
//         { name: "Sunset Restaurant", rating: 4.8, address: "123 Main St", phone: "(555) 123-4567" },
//         { name: "Pizza Palace", rating: 4.5, address: "456 Oak Ave", phone: "(555) 234-5678" },
//         { name: "Burger House", rating: 4.7, address: "789 Pine St", phone: "(555) 345-6789" },
//       ],
//     },
//     {
//       name: "Hotels", count: 32, icon: <Hotel className="w-6 h-6" />,
//       businesses: [
//         { name: "Grand Hotel", rating: 4.6, address: "321 Hotel Blvd", phone: "(555) 456-7890" },
//         { name: "Comfort Inn", rating: 4.3, address: "654 Sleep St", phone: "(555) 567-8901" },
//       ],
//     },
//     {
//       name: "Shopping", count: 67, icon: <ShoppingBag className="w-6 h-6" />,
//       businesses: [
//         { name: "Fashion Store", rating: 4.4, address: "987 Style Ave", phone: "(555) 678-9012" },
//         { name: "Electronics Hub", rating: 4.8, address: "147 Tech St", phone: "(555) 789-0123" },
//         { name: "Book Corner", rating: 4.6, address: "258 Read Rd", phone: "(555) 890-1234" },
//       ],
//     },
//     {
//       name: "Services", count: 89, icon: <Wrench className="w-6 h-6" />,
//       businesses: [
//         { name: "Tech Solutions", rating: 4.9, address: "369 Service St", phone: "(555) 901-2345" },
//         { name: "Home Repair", rating: 4.5, address: "741 Fix Ave", phone: "(555) 012-3456" },
//       ],
//     },
//     {
//       name: "Healthcare", count: 23, icon: <Stethoscope className="w-6 h-6" />,
//       businesses: [
//         { name: "City Hospital", rating: 4.7, address: "852 Health Blvd", phone: "(555) 123-4567" },
//         { name: "Dental Care", rating: 4.8, address: "963 Smile St", phone: "(555) 234-5678" },
//       ],
//     },
//     {
//       name: "Education", count: 34, icon: <GraduationCap className="w-6 h-6" />,
//       businesses: [
//         { name: "Learning Center", rating: 4.6, address: "159 Study Ave", phone: "(555) 345-6789" },
//         { name: "Music School", rating: 4.9, address: "357 Melody St", phone: "(555) 456-7890" },
//       ],
//     },
//   ]

//   useEffect(() => {
//     if (location.pathname.startsWith("/category/") && name) {
//       const formatted = name.replace(/-/g, " ").toLowerCase()
//       const matched = categories.find(cat => cat.name.toLowerCase() === formatted)
//       setSelectedCategory(matched ? matched.name : "All")
//     } else {
//       setSelectedCategory("All")
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [name, location.pathname])

//   const filteredCategories = categories.filter(
//     (cat) => selectedCategory === "All" || cat.name === selectedCategory
//   )

//   const filteredBusinesses = (businesses) =>
//     businesses.filter((b) =>
//       b.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* ✅ Hero Section with Background Image */}
//       <section
//         className="relative py-20 text-white text-center bg-cover bg-center"
//         style={{ backgroundImage: `url(${mainBg})` }}
//       >
//         {/* gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
//         <div className="relative z-10">
//           <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Business Categories</h1>
//           <p className="text-xl opacity-90">Explore businesses by category</p>
//         </div>
//       </section>

//       {/* ✅ Category Filter Section */}
//       <section className="py-8 bg-white shadow-sm">
//         <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => setSelectedCategory("All")}
//               className={`px-4 py-2 rounded-full transition ${
//                 selectedCategory === "All"
//                   ? "bg-orange-500 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               All
//             </button>
//             {categories.map((cat) => (
//               <button
//                 key={cat.name}
//                 onClick={() => setSelectedCategory(cat.name)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
//                   selectedCategory === cat.name
//                     ? "bg-orange-500 text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {cat.icon} {cat.name}
//               </button>
//             ))}
//           </div>

//           <input
//             type="text"
//             placeholder="Search businesses..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full max-w-md"
//           />
//         </div>
//       </section>

//       {/* ✅ Businesses List */}
//       <section className="py-12" data-aos="fade-up">
//         <div className="max-w-6xl mx-auto px-4">
//           {filteredCategories.map((cat) => (
//             <div key={cat.name} className="mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
//                 <span className="text-orange-500">{cat.icon}</span>
//                 {cat.name} <span className="text-orange-500">({cat.count})</span>
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
//                 {filteredBusinesses(cat.businesses).map((b, i) => (
//                   <div
//                     key={i}
//                     className="p-6 bg-white rounded-xl shadow hover:shadow-lg border hover:border-orange-300 transition cursor-pointer"
//                   >
//                     <h3 className="text-xl font-bold text-gray-800">{b.name}</h3>
//                     <p className="text-sm text-gray-500 mb-2">⭐ {b.rating}</p>
//                     <p className="text-gray-600">📍 {b.address}</p>
//                     <p className="text-gray-600">📞 {b.phone}</p>
//                     <button
//                       onClick={() =>
//                         navigate(`/business/${b.name.toLowerCase().replace(/\s+/g, "-")}`)
//                       }
//                       className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Categories
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import mainBg from "../Assests/main.avif";
import {
  Utensils,
  Hotel,
  ShoppingBag,
  Wrench,
  Stethoscope,
  GraduationCap,
} from "lucide-react";

function Categories() {
  const { name } = useParams(); // this is the slug (e.g. "restaurants" or "health-care")
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [userBusinesses, setUserBusinesses] = useState([]);

  const categoryRefs = useRef({}); // for scrolling to a category section

  // ✅ Default static categories
  const categories = [
    {
      name: "Restaurants",
      count: 45,
      icon: <Utensils className="w-6 h-6" />,
      businesses: [
        {
          name: "Sunset Restaurant",
       
          address: "123 Main St",
          phone: "(555) 123-4567",
        },
        {
          name: "Pizza Palace",
         
          address: "456 Oak Ave",
          phone: "(555) 234-5678",
        },
      ],
    },
    {
      name: "Hotels",
      count: 32,
      icon: <Hotel className="w-6 h-6" />,
      businesses: [
        {
          name: "Grand Hotel",
         
          address: "321 Hotel Blvd",
          phone: "(555) 456-7890",
        },
      ],
    },
    {
      name: "Shopping",
      count: 67,
      icon: <ShoppingBag className="w-6 h-6" />,
      businesses: [
        {
          name: "Fashion Store",
        
          address: "987 Style Ave",
          phone: "(555) 678-9012",
        },
      ],
    },
    {
      name: "Services",
      count: 89,
      icon: <Wrench className="w-6 h-6" />,
      businesses: [
        {
          name: "Tech Solutions",
        
          address: "369 Service St",
          phone: "(555) 901-2345",
        },
      ],
    },
    {
      name: "Healthcare",
      count: 23,
      icon: <Stethoscope className="w-6 h-6" />,
      businesses: [
        {
          name: "City Hospital",
          
          address: "852 Health Blvd",
          phone: "(555) 123-4567",
        },
      ],
    },
    {
      name: "Education",
      count: 34,
      icon: <GraduationCap className="w-6 h-6" />,
      businesses: [
        {
          name: "Learning Center",
         
          address: "159 Study Ave",
          phone: "(555) 345-6789",
        },
      ],
    },
  ];

  // ✅ Load user businesses from localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem("user");
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.businesses) {
          setUserBusinesses(parsed.businesses);
        }
      }
    } catch (err) {
      console.error("Error loading businesses:", err);
    }
  }, []);

  // read highlighted businessId from query
  const query = new URLSearchParams(location.search);
  const highlightedBusinessId = query.get("businessId");

  // Handle category filter via route (slug -> category name)
  useEffect(() => {
    if (name) {
      // decode slug -> "my-category" -> "my category" then match
      const slug = decodeURIComponent(name || "").toLowerCase();
      const formatted = slug.replace(/-/g, " ");
      const matched = categories.find(
        (cat) => cat.name.toLowerCase() === formatted
      );
      setSelectedCategory(matched ? matched.name : "All");
    } else {
      setSelectedCategory("All");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, location.pathname]);

  // Merge static + user businesses (case-insensitive match)
  const mergedCategories = categories.map((cat) => {
    const extraBusinesses = userBusinesses.filter(
      (b) => (b.category || "").toLowerCase() === cat.name.toLowerCase()
    );
    return {
      ...cat,
      businesses: [...cat.businesses, ...extraBusinesses],
      count: cat.count + extraBusinesses.length,
    };
  });

  // After merged categories rendered, if route param present, scroll to that category section
  useEffect(() => {
    if (!name) return;
    // small delay so DOM renders
    const slug = decodeURIComponent(name || "").toLowerCase();
    const formatted = slug.replace(/-/g, " ");
    const matched = mergedCategories.find(
      (cat) => cat.name.toLowerCase() === formatted
    );
    if (matched) {
      const el = categoryRefs.current[matched.name];
      if (el && typeof el.scrollIntoView === "function") {
        // slight timeout to ensure AOS / layout finished
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          // if a specific businessId is passed, try to scroll that card into center
          if (highlightedBusinessId) {
            const bizEl = el.querySelector(`#biz-${highlightedBusinessId}`);
            if (bizEl && typeof bizEl.scrollIntoView === "function") {
              setTimeout(() => bizEl.scrollIntoView({ behavior: "smooth", block: "center" }), 250);
            }
          }
        }, 120);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, mergedCategories, highlightedBusinessId]);

  const filteredCategories = mergedCategories.filter(
    (cat) => selectedCategory === "All" || cat.name === selectedCategory
  );

  const filteredBusinesses = (businesses) =>
    businesses.filter((b) =>
      (b.businessName || b.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

  // helper to build id slug same as Dashboard navigation
  const categoryToId = (catName) => catName.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Hero Section */}
      <section
        className="relative py-20 text-white text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${mainBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Business Categories
          </h1>
          <p className="text-xl opacity-90">Explore businesses by category</p>
        </div>
      </section>

      {/* ✅ Category Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedCategory("All"); navigate("/categories"); }}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === "All"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              All
            </button>
            {mergedCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  // navigate to slug route too (so URL reflects selection and can be shared)
                  const slug = categoryToId(cat.name);
                  navigate(`/categories/${encodeURIComponent(slug)}`);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  selectedCategory === cat.name
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full max-w-md"
          />
        </div>
      </section>

      {/* ✅ Businesses List */}
      <section className="py-12" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat.name}
              id={`category-${categoryToId(cat.name)}`}
              ref={(el) => (categoryRefs.current[cat.name] = el)}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="text-orange-500">{cat.icon}</span>
                {cat.name}{" "}
                <span className="text-orange-500">({cat.count})</span>
              </h2>

              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                data-aos="fade-up"
              >
                {filteredBusinesses(cat.businesses).map((b, i) => {
                  const bizId = b._id || b.id || `static-${i}`;
                  const isHighlighted = highlightedBusinessId && String(highlightedBusinessId) === String(bizId);
                  return (
                    <div
                      key={bizId}
                      id={`biz-${bizId}`}
                      className={`p-6 bg-white rounded-xl shadow hover:shadow-lg border transition cursor-pointer ${
                        isHighlighted ? "border-4 border-orange-500" : "hover:border-orange-300"
                      }`}
                    >
                      <h3 className="text-xl font-bold text-gray-800">
                        {b.businessName || b.name}
                      </h3>
                     
                      <p className="text-gray-600">
                        📍 {b.address || "No address"}
                      </p>
                      <p className="text-gray-600">📞 {b.phone || "N/A"}</p>
                      <button
                        onClick={() =>
                          navigate(
                            `/business/${(b.businessName || b.name)
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`
                          )
                        }
                        className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                      >
                        View Details
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Categories;