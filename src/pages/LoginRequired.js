import { useNavigate } from "react-router-dom";

const LoginRequired = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-100 text-center p-6">
      <h1 className="text-3xl font-bold mb-4">“Your business deserves to shine ✨”</h1>
      <p className="text-gray-600 mb-6">You should login first to add your business.</p>
      <button
        onClick={() => navigate("/login")}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Go to Login
      </button>
    </div>
  );
};

export default LoginRequired;
