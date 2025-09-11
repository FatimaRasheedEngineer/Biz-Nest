import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"

function Categories() {
  const { name } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    {
      name: "Restaurants", count: 45, icon: "🍽️",
      businesses: [
        { name: "Sunset Restaurant", rating: 4.8, address: "123 Main St", phone: "(555) 123-4567" },
        { name: "Pizza Palace", rating: 4.5, address: "456 Oak Ave", phone: "(555) 234-5678" },
        { name: "Burger House", rating: 4.7, address: "789 Pine St", phone: "(555) 345-6789" },
      ],
    },
    {
      name: "Hotels", count: 32, icon: "🏨",
      businesses: [
        { name: "Grand Hotel", rating: 4.6, address: "321 Hotel Blvd", phone: "(555) 456-7890" },
        { name: "Comfort Inn", rating: 4.3, address: "654 Sleep St", phone: "(555) 567-8901" },
      ],
    },
    {
      name: "Shopping", count: 67, icon: "🛍️",
      businesses: [
        { name: "Fashion Store", rating: 4.4, address: "987 Style Ave", phone: "(555) 678-9012" },
        { name: "Electronics Hub", rating: 4.8, address: "147 Tech St", phone: "(555) 789-0123" },
        { name: "Book Corner", rating: 4.6, address: "258 Read Rd", phone: "(555) 890-1234" },
      ],
    },
    {
      name: "Services", count: 89, icon: "🔧",
      businesses: [
        { name: "Tech Solutions", rating: 4.9, address: "369 Service St", phone: "(555) 901-2345" },
        { name: "Home Repair", rating: 4.5, address: "741 Fix Ave", phone: "(555) 012-3456" },
      ],
    },
    {
      name: "Healthcare", count: 23, icon: "🏥",
      businesses: [
        { name: "City Hospital", rating: 4.7, address: "852 Health Blvd", phone: "(555) 123-4567" },
        { name: "Dental Care", rating: 4.8, address: "963 Smile St", phone: "(555) 234-5678" },
      ],
    },
    {
      name: "Education", count: 34, icon: "🎓",
      businesses: [
        { name: "Learning Center", rating: 4.6, address: "159 Study Ave", phone: "(555) 345-6789" },
        { name: "Music School", rating: 4.9, address: "357 Melody St", phone: "(555) 456-7890" },
      ],
    },
  ]

  useEffect(() => {
    if (location.pathname.startsWith("/category/") && name) {
      const formatted = name.replace(/-/g, " ").toLowerCase()
      const matched = categories.find(cat => cat.name.toLowerCase() === formatted)
      setSelectedCategory(matched ? matched.name : "All")
    } else {
      setSelectedCategory("All")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, location.pathname])

  const filteredCategories = categories.filter(
    (cat) => selectedCategory === "All" || cat.name === selectedCategory
  )

  const filteredBusinesses = (businesses) =>
    businesses.filter((b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="min-h-screen bg-gray-50" > 
      <section className="bg-gradient-to-r from-orange-500 to-teal-600 py-16 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Business Categories</h1>
        <p className="text-xl">Explore businesses by category</p>
      </section>

      <section className="py-8 bg-white shadow-sm" > 
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === "All" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === cat.name ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
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

      <section className="py-12" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4">
          {filteredCategories.map((cat) => (
            <div key={cat.name} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="text-4xl">{cat.icon}</span>
                {cat.name} <span className="text-orange-500">({cat.count})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
                {filteredBusinesses(cat.businesses).map((b, i) => (
                  <div
                    key={i}
                    className="p-6 bg-white rounded-xl shadow hover:shadow-lg border hover:border-orange-300 transition cursor-pointer"
                  >
                    <h3 className="text-xl font-bold text-gray-800">{b.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">⭐ {b.rating}</p>
                    <p className="text-gray-600">📍 {b.address}</p>
                    <p className="text-gray-600">📞 {b.phone}</p>
                    <button
                      onClick={() => navigate(`/business/${b.name.toLowerCase().replace(/\s+/g, "-")}`)}
                      className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Categories
