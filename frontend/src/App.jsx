import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";

function App() {
  const { user } = useAuthContext();


  //this code fragment was added after reading a comment at https://www.youtube.com/watch?v=to-V-LcsXUU
  //without this code, the page always redirects to login 
  //even if user is logged in. Perhaps I should ask gemini for some help
  // const [loggedIn, setLoggedIn] = useState(null);

  // useEffect(() => {
  //   const loggedUser = localStorage.getItem("user");
  //   setLoggedIn(Boolean(loggedUser));
  // }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
