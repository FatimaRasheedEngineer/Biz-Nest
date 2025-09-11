import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Restaurants in the City",
      excerpt:
        "Discover the best dining experiences our city has to offer, from fine dining to casual eats.",
      category: "Food & Dining",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "🍽️",
      tags: ["restaurants", "food", "dining"],
    },
    {
      id: 2,
      title: "How to Choose the Right Hotel for Your Stay",
      excerpt:
        "Essential tips for finding the perfect accommodation that fits your budget and needs.",
      category: "Travel & Hotels",
      author: "Mike Davis",
      date: "March 12, 2024",
      readTime: "7 min read",
      image: "🏨",
      tags: ["hotels", "travel", "accommodation"],
    },
    {
      id: 3,
      title: "Supporting Local Businesses: Why It Matters",
      excerpt:
        "Learn about the impact of supporting local businesses on your community's economy.",
      category: "Business Tips",
      author: "Emily Chen",
      date: "March 10, 2024",
      readTime: "6 min read",
      image: "🏪",
      tags: ["local business", "community", "economy"],
    },
    {
      id: 4,
      title: "Digital Marketing for Small Businesses",
      excerpt:
        "Effective strategies to grow your business online and reach more customers.",
      category: "Marketing",
      author: "John Smith",
      date: "March 8, 2024",
      readTime: "8 min read",
      image: "📱",
      tags: ["marketing", "digital", "small business"],
    },
    {
      id: 5,
      title: "Healthcare Services: What to Look For",
      excerpt:
        "A comprehensive guide to finding quality healthcare providers in your area.",
      category: "Healthcare",
      author: "Dr. Lisa Wang",
      date: "March 5, 2024",
      readTime: "10 min read",
      image: "🏥",
      tags: ["healthcare", "medical", "services"],
    },
    {
      id: 6,
      title: "Educational Resources for Lifelong Learning",
      excerpt:
        "Explore the best educational institutions and programs available locally.",
      category: "Education",
      author: "Prof. Robert Brown",
      date: "March 3, 2024",
      readTime: "6 min read",
      image: "🎓",
      tags: ["education", "learning", "schools"],
    },
  ];

  const categories = [
    "All",
    "Food & Dining",
    "Travel & Hotels",
    "Business Tips",
    "Marketing",
    "Healthcare",
    "Education",
  ];

  const filteredPosts = blogPosts.filter(
    (post) => selectedCategory === "All" || post.category === selectedCategory
  );

  const featuredPost = filteredPosts[0] || blogPosts[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-500 to-teal-600 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl">
            Insights, tips, and stories from the business world
          </p>
        </div>
      </section>

      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-orange-400 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Post
          </h2>
          <div
            onClick={() => navigate(`/blog/${featuredPost.id}`)}
            className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-orange-200 to-teal-200 flex items-center justify-center p-12">
                <span className="text-8xl">{featuredPost.image}</span>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {featuredPost.date}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/author/${encodeURIComponent(featuredPost.author)}`
                      );
                    }}
                    className="text-purple-600 hover:text-purple-800 font-semibold"
                  >
                    By {featuredPost.author}
                  </button>
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {selectedCategory === "All"
              ? "Latest Posts"
              : selectedCategory + " Posts"}
          </h2>
          <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <div
                key={post.id}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer "
              >
                <div className="h-48 bg-gradient-to-br from-orange-200 to-teal-200 flex items-center justify-center">
                  <span className="text-6xl">{post.image}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/author/${encodeURIComponent(post.author)}`);
                      }}
                      className="text-sm text-purple-600 hover:text-purple-800"
                    >
                      {post.author}
                    </button>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-500 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {subscribed ? (
            <h2 className="text-2xl font-bold">Thank you for subscribing!</h2>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl mb-8">
                Subscribe to our newsletter for the latest business insights and
                tips
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  onClick={() => setSubscribed(true)}
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blog;
