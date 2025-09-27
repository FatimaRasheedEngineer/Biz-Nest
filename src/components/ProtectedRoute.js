
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const user = JSON.parse(localStorage.getItem("user")); // user object login se

//   if (!user) {
//     // User not logged in
//     return <Navigate to="/login-required" replace />;
//   }

//   if (adminOnly && user.email !== "fatimas0622@gmail.com") {
//     // Non-admin trying to access admin route
//     return <Navigate to="/login-required" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  // try-catch add kiya taake localStorage parse error na de
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  // agar user hi login nahi hai
  if (!user) {
    return <Navigate to="/login-required" replace />;
  }

  // agar adminOnly hai aur email match nahi hui
  if (adminOnly && user?.email !== "fatimas0622@gmail.com") {
    return <Navigate to="/login-required" replace />;
  }

  // otherwise allow
  return children;
};

export default ProtectedRoute;
