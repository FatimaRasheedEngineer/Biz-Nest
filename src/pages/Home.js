
import Hero from "../components/Hero"
import CategoryGrid from "../components/CategoryGrid"
import FeaturedListings from "../components/FeaturedListings"
import StatsSection from "../components/StatsSection"
import CTASection from "../components/CTASection"
import NewsletterSignup from "../components/NewsletterSignup"
import Footer from "../components/Footer"

const Home = () => {
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

  return (
    <div className="min-h-screen">
      <Hero />
      <CategoryGrid categories={categories} />
      <FeaturedListings />
      <StatsSection />
      <CTASection />
      <NewsletterSignup />
      <Footer />
    </div>
  )
}

export default Home
