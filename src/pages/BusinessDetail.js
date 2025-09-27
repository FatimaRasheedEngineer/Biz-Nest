// import { useParams, Link } from "react-router-dom"

// const BusinessDetail = () => {
//   const { name } = useParams()

//   const businessData = {
//     "sunset-restaurant": {
//       name: "Sunset Restaurant",
//       rating: 4.8,
//       address: "123 Main St",
//       phone: "(555) 123-4567",
//       category: "Restaurants",
//       description: "A cozy place with sunset views and gourmet meals."
//     },
//     "pizza-palace": {
//       name: "Pizza Palace",
//       rating: 4.5,
//       address: "456 Oak Ave",
//       phone: "(555) 234-5678",
//       category: "Restaurants",
//       description: "Your favorite place for cheesy goodness."
//     },
//     "grand-hotel": {
//       name: "Grand Hotel",
//       rating: 4.6,
//       address: "321 Hotel Blvd",
//       phone: "(555) 456-7890",
//       category: "Hotels",
//       description: "Luxury stay with top-notch services."
//     },
//     "tech-solutions": {
//       name: "Tech Solutions",
//       rating: 4.9,
//       address: "369 Service St",
//       phone: "(555) 901-2345",
//       category: "Services",
//       description: "Expert IT solutions for businesses and homes."
//     },
//     // Add more entries as needed
//   }

//   const business = businessData[decodeURIComponent(name).toLowerCase()]

//   if (!business) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-800">Business Not Found</h1>
//           <p className="text-gray-500">We couldn't find details for this business.</p>
//           <Link to="/" className="text-orange-500 underline mt-4 inline-block">Go Back Home</Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-16 px-4">
//       <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
//         <h1 className="text-4xl font-bold mb-4 text-orange-600">{business.name}</h1>
//         <p className="text-lg text-gray-700 mb-2">⭐ {business.rating}</p>
//         <p className="text-gray-600 mb-1">📍 {business.address}</p>
//         <p className="text-gray-600 mb-4">📞 {business.phone}</p>
//         <p className="text-gray-700 mb-4">Category: {business.category}</p>
//         <p className="text-gray-800">{business.description}</p>

//         <Link to="/category/all" className="mt-6 inline-block bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600 transition">
//           Back to Categories
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default BusinessDetail
import { useParams, Link } from "react-router-dom"

const BusinessDetail = () => {
  const { name } = useParams()

  // ✅ Static business data (known entries)
  const businessData = {
    "sunset-restaurant": {
      name: "Sunset Restaurant",
      rating: 4.8,
      address: "123 Main St",
      phone: "(555) 123-4567",
      category: "Restaurants",
      description: "A cozy place with sunset views and gourmet meals.",
      openingHours: "Mon - Sun: 10:00 AM - 11:00 PM",
      services: ["Dine-in", "Takeaway", "Online Delivery"],
      website: "https://sunset-restaurant.example.com",
    },
    "pizza-palace": {
      name: "Pizza Palace",
      rating: 4.5,
      address: "456 Oak Ave",
      phone: "(555) 234-5678",
      category: "Restaurants",
      description: "Your favorite place for cheesy goodness.",
      openingHours: "Mon - Sat: 11:00 AM - 10:00 PM",
      services: ["Pizza Delivery", "Family Seating"],
      website: "https://pizza-palace.example.com",
    },
    "grand-hotel": {
      name: "Grand Hotel",
      rating: 4.6,
      address: "321 Hotel Blvd",
      phone: "(555) 456-7890",
      category: "Hotels",
      description: "Luxury stay with top-notch services.",
      openingHours: "Open 24/7",
      services: ["Room Service", "Free Wi-Fi", "Swimming Pool"],
      website: "https://grand-hotel.example.com",
    },
    "tech-solutions": {
      name: "Tech Solutions",
      rating: 4.9,
      address: "369 Service St",
      phone: "(555) 901-2345",
      category: "Services",
      description: "Expert IT solutions for businesses and homes.",
      openingHours: "Mon - Fri: 9:00 AM - 6:00 PM",
      services: ["Software Development", "IT Support", "Cloud Solutions"],
      website: "https://tech-solutions.example.com",
    },
    // ✅ Add more predefined entries as needed
  }

  // ✅ Dummy fallback (for new businesses)
  const dummyDetails = {
    rating: 4.2,
    address: "Not Provided",
    phone: "N/A",
    category: "General",
    description:
      "This is a professional business known for quality and customer satisfaction. Stay tuned for more details.",
    openingHours: "Mon - Sat: 9:00 AM - 6:00 PM",
    services: ["Consultation", "Customer Support", "Delivery Options"],
    website: "https://www.example.com",
  }

  // ✅ Business lookup (real data OR dummy fallback)
  const business =
    businessData[decodeURIComponent(name).toLowerCase()] || {
      name: decodeURIComponent(name),
      ...dummyDetails,
    }

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-4xl font-bold mb-4 text-orange-600">
          {business.name}
        </h1>
        <p className="text-lg text-gray-700 mb-2">⭐ {business.rating}</p>
        <p className="text-gray-600 mb-1">📍 {business.address}</p>
        <p className="text-gray-600 mb-4">📞 {business.phone}</p>
        <p className="text-gray-700 mb-4">
          <strong>Category:</strong> {business.category}
        </p>
        <p className="text-gray-800 mb-6">{business.description}</p>

        {/* ✅ Extra Sections */}
        <h2 className="text-xl font-semibold mb-2">Opening Hours</h2>
        <p className="text-gray-600 mb-4">{business.openingHours}</p>

        <h2 className="text-xl font-semibold mb-2">Services</h2>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          {business.services?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-2">Website</h2>
        <a
          href={business.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 underline"
        >
          {business.website}
        </a>

        <div className="mt-8">
          <Link
            to="/category/all"
            className="inline-block bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600 transition"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BusinessDetail
