import { Link } from "react-router-dom"
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white" >
      <div className="container mx-auto px-4 py-12"data-aos="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
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
            <p className="text-gray-300 mb-6">
              Your trusted business directory connecting customers with the best local businesses.
            </p>
            <div className="flex space-x-4">
              <a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-orange-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-orange-400 transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Popular Categories</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">Restaurants</a></li>
              <li><a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">Hotels</a></li>
              <li><a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">Shopping</a></li>
              <li><a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">Services</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-1" />
                <div>
                  <p className="text-gray-300">123 Business Street</p>
                  <p className="text-gray-300">Suite 100, City, State 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400" />
                <p className="text-gray-300">(555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <p className="text-gray-300">info@directory.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">© {currentYear} BizNest. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/" className="text-gray-300 hover:text-orange-400 text-sm transition-colors">Privacy Policy</a>
              <a href="/" className="text-gray-300 hover:text-orange-400 text-sm transition-colors">Terms of Service</a>
              <a href="." className="text-gray-300 hover:text-orange-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
