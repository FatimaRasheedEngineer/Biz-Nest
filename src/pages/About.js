import { Users, Target, Award, Globe } from "lucide-react"
import Mission from "../Assests/Mission.jpg"
import person1 from "../Assests/person1.jpg"
import person2 from "../Assests/person2.jpg"
import person3 from "../Assests/person3.jpg"

const About = () => {
  const stats = [
    { icon: Users, number: "10,000+", label: "Happy Customers" },
    { icon: Target, number: "5,000+", label: "Business Listings" },
    { icon: Award, number: "50+", label: "Awards Won" },
    { icon: Globe, number: "25+", label: "Cities Covered" },
  ]

  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: person1,
      bio: "Leading the company with 15+ years of experience in business development.",
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: person2,
      bio: "Technology expert with passion for creating innovative solutions.",
    },
    {
      name: "Mike Davis",
      role: "Head of Marketing",
      image: person3,
      bio: "Marketing strategist helping businesses grow their online presence.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-orange-400 py-20 text-white">
        <div className="container mx-auto px-4 text-center" >
          <h1 className="text-5xl font-bold mb-6">About Our Directory</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're dedicated to connecting businesses with customers through our comprehensive directory platform.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right"> 
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-6">
                To create the most comprehensive and user-friendly business directory that helps local businesses thrive
                and customers find exactly what they're looking for.
              </p>
              <p className="text-gray-600 text-lg">
                We believe in supporting local economies by making it easier for businesses to reach their target
                audience and for customers to discover amazing services in their area.
              </p>
            </div>
            <div data-aos="fade-left">
              <img src={Mission} alt="Our Mission" className="rounded-lg shadow-lg h-48" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white" >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Numbers that showcase our commitment to excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" >
                    <Icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-stone-100" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The passionate people behind our success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden text-center" >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover"  />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-orange-500 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white" data-aos="zoom-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quality First</h3>
              <p className="text-gray-600">
                We maintain the highest standards in everything we do, ensuring quality experiences for all users.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Community Focus</h3>
              <p className="text-gray-600">
                We're committed to building strong local communities by supporting local businesses.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to provide better tools and experiences for our users.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
