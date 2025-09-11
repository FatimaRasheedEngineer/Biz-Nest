import { useParams } from "react-router-dom"

const dummyListings = {
  1: {
    name: "Sunset Restaurant",
    category: "Restaurant",
    rating: 4.8,
    address: "123 Main St, City",
    phone: "(555) 123-4567",
    email: "info@sunset.com",
  },
  2: {
    name: "Grand Hotel",
    category: "Hotel",
    rating: 4.6,
    address: "456 Oak Ave, City",
    phone: "(555) 987-6543",
    email: "reservations@grand.com",
  },
  3: {
    name: "Tech Solutions",
    category: "Services",
    rating: 4.9,
    address: "789 Pine St, City",
    phone: "(555) 456-7890",
    email: "contact@techsolutions.com",
  },
}

const Listingdetails = () => {
  const { id } = useParams()
  const listing = dummyListings[id]

  if (!listing) {
    return <div className="p-6">Listing not found.</div>
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">{listing.name}</h1>
      <p><strong>Category:</strong> {listing.category}</p>
      <p><strong>Rating:</strong> {listing.rating}</p>
      <p><strong>Address:</strong> {listing.address}</p>
      <p><strong>Phone:</strong> {listing.phone}</p>
      <p><strong>Email:</strong> {listing.email}</p>
    </div>
  )
}

export default Listingdetails
