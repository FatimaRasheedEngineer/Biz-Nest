import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleAddBusiness = () => {
    // alert hataya aur direct navigate kiya
    navigate("/add-business"); // ye route tumhare Add Business page ka path hoga
  }

  return (
    <section className="py-20 bg-teal-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to List Your Business?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of businesses already listed in our directory</p>
        <button
          onClick={handleAddBusiness}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors transform hover:scale-105"
        >
          Add Your Business
        </button>
      </div>
    </section>
  )
}

export default CTASection;
