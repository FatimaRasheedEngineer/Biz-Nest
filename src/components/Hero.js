
import { useState } from "react"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import main from "../Assests/main.avif"

const Hero = () => {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()

    const formatted =
      selectedCategory === "All Categories"
        ? "all"
        : selectedCategory.replace(/\s+/g, "-").toLowerCase()

    navigate(`/category/${formatted}`)
  }

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${main})`,
      }}
    >
      {/* Overlay content */}
      <div className="container mx-auto px-4 py-32 text-center text-white relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            WE <span className="text-orange-400">HELP</span> YOU TO
          </h1>
          <h2 className="text-2xl md:text-5xl font-bold mb-8">
            AMAZING <span className="text-orange-400">CLASSIFIED</span> COMPANIES{" "}
            <span className="text-orange-400">DIRECTORY</span>
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Find businesses you can trust, verified, reliable, and committed to
            quality. Explore a network built for professionals who value
            excellence and results.
          </p>
        </div>

        {/* Search Section */}
        <div className="animate-fade-in-up animation-delay-300 px-4 mt-10">
          <h3 className="text-2xl font-bold mb-8">
            SEARCH ANY BUSINESS LISTING
          </h3>

          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-3xl shadow-2xl md:flex md:items-center md:p-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-gray-800 w-full md:w-auto px-4 py-3 rounded-full md:rounded-l-full md:rounded-r-none focus:outline-none"
              >
                <option>All Categories</option>
                <option>Restaurants</option>
                <option>Hotels</option>
                <option>Shopping</option>
                <option>Services</option>
                <option>Healthcare</option>
                <option>Education</option>
              </select>

              <input
                type="text"
                placeholder="Enter Keyword"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full px-4 py-3 text-gray-800 rounded-full md:rounded-none focus:outline-none"
              />

              <button
                type="submit"
                className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full md:rounded-r-full md:rounded-l-none transition-colors flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                <span>SEARCH</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Hero

