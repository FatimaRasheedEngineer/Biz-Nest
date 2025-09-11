import { useState } from "react"
import { Mail } from "lucide-react"

const NewsletterSignup = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate async signup
    setTimeout(() => {
      setIsSubmitting(false)
      setMessage("Thank you for subscribing to our newsletter!")
      setEmail("")

      setTimeout(() => setMessage(""), 5000)
    }, 1000)
  }

  return (
    <section className="py-20 bg-gradient-to-r from-orange-400 to-teal-600 text-white" >
      <div className="container mx-auto px-4 text-center" data-aos="fade-up">
        <div className="max-w-2xl mx-auto">
          <Mail className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">
            Subscribe to our newsletter and get the latest updates on new businesses and special offers.
          </p>

          {message && (
            <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSignup
