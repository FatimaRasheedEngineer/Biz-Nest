import { Users, Target, Award, Globe } from "lucide-react"

const StatsSection = () => {
  const stats = [
    { icon: Users, number: "10,000+", label: "Happy Customers" },
    { icon: Target, number: "5,000+", label: "Business Listings" },
    { icon: Award, number: "50+", label: "Awards Won" },
    { icon: Globe, number: "25+", label: "Cities Covered" },
  ]

  return (
    <section className="py-20 bg-white" data-aos="zoom-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Numbers that showcase our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center group">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <Icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
