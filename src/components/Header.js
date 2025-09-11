import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react" // ✅ FIXED missing icons

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-slate-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span
              className="text-4xl font-bold italic"
              style={{ color: "#f97316", fontFamily: "'Playfair Display', serif" }}
            >
              Biz
            </span>
            <span
              className="text-4xl font-bold italic"
              style={{ color: "#14b8a6", fontFamily: "'Playfair Display', serif" }}
            >
              Nest
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-orange-400 hover:text-orange-300 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-orange-400 transition-colors">About</Link>
            <Link to="/categories" className="hover:text-orange-400 transition-colors">Categories</Link>
            <Link to="/blog" className="hover:text-orange-400 transition-colors">Blogs</Link>
            <Link to="/pages" className="hover:text-orange-400 transition-colors">Pages</Link>
            <Link to="/contact" className="hover:text-orange-400 transition-colors">Contact</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login" className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full transition-colors">
              Login
            </Link>
            <Link to="/register" className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-full transition-colors">
              Register
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-orange-400">Home</Link>
              <Link to="/about" className="hover:text-orange-400">About</Link>
              <Link to="/categories" className="hover:text-orange-400">Categories</Link>
              <Link to="/blog" className="hover:text-orange-400">Blog</Link>
              <Link to="/pages" className="hover:text-orange-400">Pages</Link>
              <Link to="/contact" className="hover:text-orange-400">Contact</Link>
              <div className="flex space-x-4 pt-4">
                <Link to="/login" className="bg-orange-500 px-4 py-2 rounded">Login</Link>
                <Link to="/register" className="bg-orange-600 px-4 py-2 rounded">Register</Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
