import { useNavigate } from "react-router-dom"

const CategoryGrid = () => {
  const navigate = useNavigate()

  const categories = [
    { name: "Restaurants", count: 45, icon: "🍽️" },
    { name: "Hotels", count: 32, icon: "🏨" },
    { name: "Shopping", count: 67, icon: "🛍️" },
    { name: "Services", count: 89, icon: "🔧" },
    { name: "Healthcare", count: 23, icon: "🏥" },
    { name: "Education", count: 34, icon: "🎓" },
    { name: "Entertainment", count: 56, icon: "🎭" },
    { name: "Automotive", count: 28, icon: "🚗" },
  ]

  const handleCategoryClick = (categoryName) => {
    const urlFriendlyName = categoryName.toLowerCase().replace(/\s+/g, "-")
    navigate(`/category/${urlFriendlyName}`)
  }

  return (
    <section  className="py-20 bg-stone-100 " data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            DIRECTORY <span className="text-orange-500">CATEGORY</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive directory of businesses across various categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className="bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
              <p className="text-orange-500 font-semibold">{category.count} Listings</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
