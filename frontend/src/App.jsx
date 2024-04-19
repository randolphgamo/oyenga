import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js'
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/Home";

import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

import { useAuthContext } from "./hooks/useAuthContext";
import Search from "./pages/Search";

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
     
        <Routes>
        <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/search"
            element={<Search />}
          />
          <Route
            path="/admin"
            element={user ? <Admin /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/admin" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/admin" />}
          />
        </Routes>
     <Footer />
    </BrowserRouter>
  );
}

export default App;
