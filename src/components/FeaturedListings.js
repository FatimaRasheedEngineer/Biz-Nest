
import { Star, MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import hotel1 from "../Assests/hotel1.jpg"
import hotel2 from "../Assests/hotel2.jpg"
import tech from "../Assests/tech.jpg"

const FeaturedListings = () => {
  const navigate = useNavigate()

  const featuredListings = [
    {
      id: 1,
      name: "Sunset Restaurant",
      category: "Restaurant",
      rating: 4.8,
      address: "123 Main St, City",
      phone: "(555) 123-4567",
      email: "info@sunset.com",
      image: hotel1,
    },
    {
      id: 2,
      name: "Grand Hotel",
      category: "Hotel",
      rating: 4.6,
      address: "456 Oak Ave, City",
      phone: "(555) 987-6543",
      email: "reservations@grand.com",
      image: hotel2,
    },
    {
      id: 3,
      name: "Tech Solutions",
      category: "Services",
      rating: 4.9,
      address: "789 Pine St, City",
      phone: "(555) 456-7890",
      email: "contact@techsolutions.com",
      image: tech
    },
  ]

  const handleViewDetails = (id) => {
    navigate(`/listing/${id}`)
  }

  return (
    <section className="py-20 bg-white" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            FEATURED <span className="text-orange-500">LISTINGS</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover the best businesses in your area</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{listing.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{listing.rating}</span>
                  </div>
                </div>
                <p className="text-orange-500 font-semibold mb-4">{listing.category}</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{listing.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{listing.email}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleViewDetails(listing.id)}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedListings
