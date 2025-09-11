import { useParams, Link } from "react-router-dom"

const BusinessDetail = () => {
  const { name } = useParams()

  const businessData = {
    "sunset-restaurant": {
      name: "Sunset Restaurant",
      rating: 4.8,
      address: "123 Main St",
      phone: "(555) 123-4567",
      category: "Restaurants",
      description: "A cozy place with sunset views and gourmet meals."
    },
    "pizza-palace": {
      name: "Pizza Palace",
      rating: 4.5,
      address: "456 Oak Ave",
      phone: "(555) 234-5678",
      category: "Restaurants",
      description: "Your favorite place for cheesy goodness."
    },
    "grand-hotel": {
      name: "Grand Hotel",
      rating: 4.6,
      address: "321 Hotel Blvd",
      phone: "(555) 456-7890",
      category: "Hotels",
      description: "Luxury stay with top-notch services."
    },
    "tech-solutions": {
      name: "Tech Solutions",
      rating: 4.9,
      address: "369 Service St",
      phone: "(555) 901-2345",
      category: "Services",
      description: "Expert IT solutions for businesses and homes."
    },
    // Add more entries as needed
  }

  const business = businessData[decodeURIComponent(name).toLowerCase()]

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Business Not Found</h1>
          <p className="text-gray-500">We couldn't find details for this business.</p>
          <Link to="/" className="text-orange-500 underline mt-4 inline-block">Go Back Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-4xl font-bold mb-4 text-orange-600">{business.name}</h1>
        <p className="text-lg text-gray-700 mb-2">⭐ {business.rating}</p>
        <p className="text-gray-600 mb-1">📍 {business.address}</p>
        <p className="text-gray-600 mb-4">📞 {business.phone}</p>
        <p className="text-gray-700 mb-4">Category: {business.category}</p>
        <p className="text-gray-800">{business.description}</p>

        <Link to="/category/all" className="mt-6 inline-block bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600 transition">
          Back to Categories
        </Link>
      </div>
    </div>
  )
}

export default BusinessDetail
