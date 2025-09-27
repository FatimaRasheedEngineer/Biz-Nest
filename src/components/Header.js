
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Safe localStorage parsing
  const getStoredUser = () => {
    try {
      const data = localStorage.getItem("user");
      if (!data || data === "undefined") return null;
      return JSON.parse(data);
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      return null;
    }
  };

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // go back to home
  };

  return (
    <header className="bg-slate-800 text-white dark:bg-gray-900 dark:text-white transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-4xl font-bold italic" style={{ color: "#f97316", fontFamily: "'Playfair Display', serif" }}>Biz</span>
            <span className="text-4xl font-bold italic" style={{ color: "#14b8a6", fontFamily: "'Playfair Display', serif" }}>Nest</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-orange-400 hover:text-orange-300 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-orange-400 transition-colors">About</Link>
            <Link to="/categories" className="hover:text-orange-400 transition-colors">Categories</Link>
            <Link to="/blog" className="hover:text-orange-400 transition-colors">Blogs</Link>
            <Link to="/pages" className="hover:text-orange-400 transition-colors">Pages</Link>
            <Link to="/contact" className="hover:text-orange-400 transition-colors">Contact</Link>

            {user && (
              <>
                <Link to="/dashboard" className="hover:text-orange-400 transition-colors">My Nest</Link>
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* Right Side - Auth Links for Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {!user && (
              <>
                <Link to="/login" className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full transition-colors">Login</Link>
                <Link to="/register" className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-full transition-colors">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-2xl">
            {isMenuOpen ? "✕" : "☰"}
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

              {user && (
                <>
                  <Link to="/dashboard" className="hover:text-orange-400">My Nest</Link>
                  <button
                    onClick={handleLogout}
                    className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}

              {!user && (
                <div className="flex space-x-4 pt-4">
                  <Link to="/login" className="bg-orange-500 px-4 py-2 rounded">Login</Link>
                  <Link to="/register" className="bg-orange-600 px-4 py-2 rounded">Register</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
