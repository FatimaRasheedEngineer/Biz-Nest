// import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useEffect } from "react";

// import Header from "./components/Header";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Categories from "./pages/Categories";
// import Blog from "./pages/Blog";
// import Listingdetails from "./pages/Listingdetails";
// import Pages from "./pages/Pages";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import BusinessDetail from "./pages/BusinessDetail";
// import "./App.css";


// function App() {
//     useEffect(() => {
//     AOS.init({
//       duration: 1000, // animation duration (in ms)
//       once: true,     // whether animation should happen only once
//     });
//   }, []);
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/categories" element={<Categories />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/pages" element={<Pages />} />
//           <Route path="/listing/:id" element={<Listingdetails />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/category/:name" element={<Categories />} />
//           <Route path="/business/:name" element={<BusinessDetail />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Blog from "./pages/Blog";
import Listingdetails from "./pages/Listingdetails";
import Pages from "./pages/Pages";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessDetail from "./pages/BusinessDetail";
import AddBusiness from "./pages/AddBusiness";   // ✅ New Page
import Dashboard from "./pages/Dashboard";       // ✅ New Page
import "./App.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (in ms)
      once: true,     // whether animation should happen only once
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/listing/:id" element={<Listingdetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category/:name" element={<Categories />} />
          <Route path="/business/:name" element={<BusinessDetail />} />

          {/* ✅ New Routes */}
          <Route path="/add-business" element={<AddBusiness />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

