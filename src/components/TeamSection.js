const TeamSection = () => {
  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Leading the company with 15+ years of experience in business development.",
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Technology expert with passion for creating innovative solutions.",
    },
    {
      name: "Mike Davis",
      role: "Head of Marketing",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Marketing strategist helping businesses grow their online presence.",
    },
  ]

  return (
    <section className="py-20 bg-stone-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The passionate people behind our success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden text-center hover:shadow-xl transition-shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
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
  )
}

export default TeamSection
