

import { useState } from "react"

function Pages() {
  const [activeTab, setActiveTab] = useState("about")
  const [faqOpen, setFaqOpen] = useState({})
  const [showSuccessMessage, setShowSuccessMessage] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)

  const pages = [
    { id: "about", name: "About Us", icon: "ℹ️" },
    { id: "faq", name: "FAQ", icon: "❓" },
    { id: "terms", name: "Terms of Service", icon: "📋" },
    { id: "privacy", name: "Privacy Policy", icon: "🔒" },
    { id: "careers", name: "Careers", icon: "💼" },
    { id: "support", name: "Support", icon: "🆘" },
  ]

  const faqs = [
    {
      question: "How do I list my business on the directory?",
      answer:
        "You can list your business by clicking the 'Register' button and following our simple registration process. It's free to get started with a basic listing.",
    },
    {
      question: "How long does it take for my listing to be approved?",
      answer:
        "Most listings are reviewed and approved within 24-48 hours. We'll send you an email confirmation once your listing is live.",
    },
    {
      question: "Can I edit my business information after listing?",
      answer:
        "Yes! Once you're registered, you can log in to your account and update your business information at any time through your dashboard.",
    },
    {
      question: "What are the different listing packages available?",
      answer:
        "We offer Basic (Free), Premium ($29/month), and Enterprise ($99/month) packages with different features and visibility options.",
    },
    {
      question: "How do customers find my business?",
      answer:
        "Customers can find your business through our search function, category browsing, location-based searches, and featured listings.",
    },
    {
      question: "Can I get analytics for my listing?",
      answer:
        "Yes, Premium and Enterprise accounts include detailed analytics showing views, clicks, and customer interactions with your listing.",
    },
  ]

  const careers = [
    {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Join our team to build amazing user experiences for our directory platform.",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "New York, NY",
      type: "Full-time",
      description: "Lead our marketing efforts to help local businesses grow and succeed.",
    },
    {
      title: "Customer Success Specialist",
      department: "Support",
      location: "Remote",
      type: "Part-time",
      description: "Help our business customers succeed and grow their online presence.",
    },
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    setShowSuccessMessage("")
    setFormSubmitted(false)
  }

  const toggleFaq = (index) => {
    setFaqOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleCareerApply = (jobTitle) => {
    setShowSuccessMessage(`Application submitted for ${jobTitle} position! We'll contact you soon.`)
    setTimeout(() => setShowSuccessMessage(""), 5000)
  }

  const handleSupportSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setShowSuccessMessage("Support ticket submitted successfully! We'll respond within 24 hours.")
    setTimeout(() => {
      setShowSuccessMessage("")
      setFormSubmitted(false)
    }, 5000)
  }

  const handleTermsAccept = () => {
    setShowSuccessMessage("Terms of Service accepted successfully!")
    setTimeout(() => setShowSuccessMessage(""), 3000)
  }

  const handlePrivacyAcknowledge = () => {
    setShowSuccessMessage("Privacy Policy acknowledged!")
    setTimeout(() => setShowSuccessMessage(""), 3000)
  }

  const handleGeneralApplication = () => {
    setShowSuccessMessage("General application form opened! Please fill out your details.")
    setTimeout(() => setShowSuccessMessage(""), 5000)
  }

  const handleHelpArticle = (topic) => {
    setShowSuccessMessage(`Opening help article: ${topic}`)
    setTimeout(() => setShowSuccessMessage(""), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md">
          <div className="flex items-center justify-between">
            <span className="text-sm">{showSuccessMessage}</span>
            <button onClick={() => setShowSuccessMessage("")} className="ml-4 text-white hover:text-gray-200">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <section className="bg-gradient-to-r from-orange-500 to-teal-600 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Information Pages</h1>
          <p className="text-xl">Everything you need to know about our directory</p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => handleTabClick(page.id)}
                className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                  activeTab === page.id ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-orange-100"
                }`}
              >
                <span>{page.icon}</span>
                <span>{page.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* About Us */}
          {activeTab === "about" && (
            <div className="bg-white rounded-lg shadow-lg p-8" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About Our Directory</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
                  <p className="text-gray-600 mb-6">
                    We're dedicated to connecting businesses with customers through our comprehensive directory
                    platform. Our mission is to support local economies by making it easier for businesses to reach
                    their target audience.
                  </p>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Our Values</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Quality first in everything we do</li>
                    <li>• Supporting local communities</li>
                    <li>• Innovation and continuous improvement</li>
                    <li>• Transparency and trust</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Our Impact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-500">10,000+</div>
                      <div className="text-sm text-gray-600">Happy Customers</div>
                    </div>
                    <div className="text-center p-4 bg-teal-50 rounded-lg">
                      <div className="text-2xl font-bold text-teal-500">5,000+</div>
                      <div className="text-sm text-gray-600">Business Listings</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">50+</div>
                      <div className="text-sm text-gray-600">Awards Won</div>
                    </div>
                    <div className="text-center p-4 bg-teal-50 rounded-lg">
                      <div className="text-2xl font-bold text-teal-600">25+</div>
                      <div className="text-sm text-gray-600">Cities Covered</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeTab === "faq" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-800">{faq.question}</span>
                      <span className="text-2xl text-orange-500">{faqOpen[index] ? "−" : "+"}</span>
                    </button>
                    {faqOpen[index] && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terms of Service */}
          {activeTab === "terms" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Terms of Service</h2>
              <div className="prose max-w-none text-gray-600">
                <h3 className="text-xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h3>
                <p className="mb-6">
                  By accessing and using our directory service, you accept and agree to be bound by the terms and
                  provision of this agreement.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">2. Use License</h3>
                <p className="mb-6">
                  Permission is granted to temporarily use our directory for personal, non-commercial transitory viewing
                  only. This is the grant of a license, not a transfer of title.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">3. Business Listings</h3>
                <p className="mb-6">
                  Business owners are responsible for the accuracy of their listing information. We reserve the right to
                  remove or modify listings that violate our guidelines.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">4. Prohibited Uses</h3>
                <ul className="list-disc pl-6 mb-6">
                  <li>Use for any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>
                    Violate any international, federal, provincial, or state regulations, rules, laws, or local
                    ordinances
                  </li>
                  <li>
                    Infringe upon or violate our intellectual property rights or the intellectual property rights of
                    others
                  </li>
                </ul>

                <button
                  onClick={handleTermsAccept}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
                >
                  I Accept These Terms
                </button>
              </div>
            </div>
          )}

          {/* Privacy Policy */}
          {activeTab === "privacy" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h2>
              <div className="prose max-w-none text-gray-600">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Information We Collect</h3>
                <p className="mb-6">
                  We collect information you provide directly to us, such as when you create an account, list your
                  business, or contact us for support.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">How We Use Your Information</h3>
                <ul className="list-disc pl-6 mb-6">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To process transactions and send related information</li>
                  <li>To send technical notices and support messages</li>
                  <li>To communicate with you about products, services, and events</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Information Sharing</h3>
                <p className="mb-6">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your
                  consent, except as described in this policy.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Data Security</h3>
                <p className="mb-6">
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction.
                </p>

                <button
                  onClick={handlePrivacyAcknowledge}
                  className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
                >
                  I Understand
                </button>
              </div>
            </div>
          )}

          {/* Careers */}
          {activeTab === "careers" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Team</h2>
              <p className="text-gray-600 mb-8">
                We're always looking for talented individuals to help us build the best business directory platform.
                Check out our current openings below.
              </p>

              <div className="space-y-6">
                {careers.map((job, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <span>🏢 {job.department}</span>
                          <span>📍 {job.location}</span>
                          <span>⏰ {job.type}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCareerApply(job.title)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-orange-50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Don't See a Perfect Match?</h3>
                <p className="text-gray-600 mb-4">
                  We're always interested in hearing from talented people. Send us your resume and tell us how you'd
                  like to contribute.
                </p>
                <button
                  onClick={handleGeneralApplication}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Send General Application
                </button>
              </div>
            </div>
          )}

          {/* Support */}
          {activeTab === "support" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Support Center</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Support</h3>
                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <div className="text-green-600 text-2xl mb-2">✓</div>
                      <h4 className="text-lg font-semibold text-green-800 mb-2">Ticket Submitted!</h4>
                      <p className="text-green-700">We'll respond within 24 hours.</p>
                    </div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleSupportSubmit}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                          <option>General Question</option>
                          <option>Technical Issue</option>
                          <option>Billing Question</option>
                          <option>Feature Request</option>
                          <option>Bug Report</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                          rows={4}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Describe your issue or question..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        Submit Support Ticket
                      </button>
                    </form>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Help</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">📧 Email Support</h4>
                      <a href="mailto:support@directory.com" className="text-orange-600 text-sm hover:text-orange-800">
                        support@directory.com
                      </a>
                      <p className="text-gray-500 text-xs">Response within 24 hours</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">📞 Phone Support</h4>
                      <a href="tel:+15551234567" className="text-orange-600 text-sm hover:text-orange-800">
                        (555) 123-4567
                      </a>
                      <p className="text-gray-500 text-xs">Mon-Fri 9AM-6PM EST</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">💬 Live Chat</h4>
                      <p className="text-gray-600 text-sm">Available on our website</p>
                      <p className="text-gray-500 text-xs">Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Common Issues</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleHelpArticle("How to reset password")}
                        className="block w-full text-left text-orange-600 hover:text-orange-800 text-sm p-2 rounded hover:bg-orange-50 transition-colors"
                      >
                        • How to reset my password?
                      </button>
                      <button
                        onClick={() => handleHelpArticle("How to update listing")}
                        className="block w-full text-left text-orange-600 hover:text-orange-800 text-sm p-2 rounded hover:bg-orange-50 transition-colors"
                      >
                        • How to update my business listing?
                      </button>
                      <button
                        onClick={() => handleHelpArticle("Billing questions")}
                        className="block w-full text-left text-orange-600 hover:text-orange-800 text-sm p-2 rounded hover:bg-orange-50 transition-colors"
                      >
                        • Billing and subscription questions
                      </button>
                      <button
                        onClick={() => handleHelpArticle("Account deletion")}
                        className="block w-full text-left text-orange-600 hover:text-orange-800 text-sm p-2 rounded hover:bg-orange-50 transition-colors"
                      >
                        • How to delete my account?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Pages
