
import { useState } from "react"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Hero = () => {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()

    const formatted = selectedCategory === "All Categories"
      ? "all"
      : selectedCategory.replace(/\s+/g, "-").toLowerCase()

    navigate(`/category/${formatted}`)
  }

  return (
    <section
      className="relative bg-cover bg-gradient-to-r from-orange-400 to-teal-500 bg-center py-32"
    
    >
      <div className="container mx-auto px-4 text-center text-white"  data-aos="fade-up">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            WE <span className="text-orange-400">HELP</span> YOU TO
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            AMAZING <span className="text-orange-400">CLASSIFIED</span> COMPANIES{" "}
            <span className="text-orange-400">DIRECTORY</span>
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
       Find businesses you can trust,verified, reliable, and committed to quality. Explore a network built for professionals who value excellence and results.
          </p>
        </div>

        {/* Search Section */}
       <div className="animate-fade-in-up animation-delay-300 px-4">
  <h3 className="text-2xl font-bold mb-8 text-center">SEARCH ANY BUSINESS LISTING</h3>

  <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
    <div className="bg-white p-4 rounded-3xl shadow-2xl space-y-3 md:space-y-0 md:flex md:items-center md:rounded-full md:p-2">

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
