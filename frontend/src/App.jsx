// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Login";
// import Signup from "./Signup";          // ✅ Import back
// import MaterialMaster from "./MaterialForm";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = (email, password) => {
//     if (email && password) setIsAuthenticated(true);
//   };

//   const handleSignup = (email, password) => {
//     if (email && password) setIsAuthenticated(true);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={isAuthenticated ? <Navigate to="/material-master" /> : <Navigate to="/login" />}
//         />
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//         <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
//         <Route
//           path="/material-master"
//           element={isAuthenticated ? <MaterialMaster /> : <Navigate to="/login" />}
//         />
//         <Route path="*" element={<div>Page not found</div>} />   {/* ✅ fallback */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import MaterialForm from "./MaterialForm";

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // ✅ after login, set state + go to /materials
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/materials");
  };

  return (
    <Routes>
      {/* Login page */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      {/* Protected route */}
      <Route
        path="/materials"
        element={
          isAuthenticated ? <MaterialForm /> : <Navigate to="/login" />
        }
      />

      {/* Default route */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/materials" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

