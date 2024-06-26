import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js'
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/Home";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

import { useAuthContext } from "./hooks/useAuthContext";
import Search from "./pages/Search";
import SongForm from "./components/SongForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import About from "./pages/About";


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
            path="/chants"
            element={<Search />}
          />
          <Route
            path="/apropos"
            element={<About />}
          />
          {/* <Route
            path="/admin"
            element={user ? <Admin /> : <Navigate to="/login" />}
          /> */}
          <Route
            path="/add"
            element={user ? <SongForm /> : <Navigate to="/login" />}
          />
          
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/chants" />}
          />
          
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/chants" />}
          />
        </Routes>
        <ToastContainer/>
     <Footer />
    </BrowserRouter>
    
  );
}

export default App;
