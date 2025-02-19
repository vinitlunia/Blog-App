import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated, profile } = useAuth();
  // console.log("BBlog", blogs);
  console.log("Navbaar", profile?.user);
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/users/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.removeItem("jwt"); // deleting token in localStorage so that if user logged out it will goes to login page
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || "Failed to logout");
    }
  };

  return (
    <>
      <nav className="shadow-lg px-4 py-3 ">
        <div className="flex items-center justify-between container mx-auto">
          <div className="font-semibold text-xl">
            Blog<span className="text-green-500">Haven</span>
          </div>
          {/* Desktop size */}
          <div className="mx-3">
            <ul className=" hidden md:flex  space-x-6 font-semibold">
              <Link to="/" className="hover:text-green-500 ">
                HOME
              </Link>
              <Link to="/blogs" className="hover:text-green-500">
                BLOGS
              </Link>
              <Link to="/creaters" className="hover:text-green-500">
                CREATERS
              </Link>
              <Link to="/about" className="hover:text-green-500">
                ABOUT
              </Link>
              <Link to="/contact" className="hover:text-green-500">
                CONTACT
              </Link>
            </ul>
            <div className="md:hidden " onClick={() => setShow(!show)}>
              {" "}
              {show ? <IoCloseSharp size={24} /> : <IoMenu size={24} />}{" "}
            </div>
          </div>
          <div className="hidden md:flex space-x-4">
            {isAuthenticated && profile?.user?.role === "admin" ? (
              <Link
                to="dashbord"
                className="bg-green-600 text-white font-semibold hover:bg-green-800 duration-300 px-4 py-2 rounded"
              >
                DESHBORD
              </Link>
            ) : ("")}

            {!isAuthenticated ? (
              <Link
                to="login"
                className="bg-green-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGIN
              </Link>
            ) : (
              <div>
                <button onClick={handleLogout} className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded">LOGOUT</button>
              </div>
            )}


          </div>
        </div>
        {/* mobile navbar */}
        {show && (
          <div className="bg-white">
            <ul className="flex space-y-3 h-screen flex-col justify-center items-center text-xl  md:hidden">
              <Link
                to="/"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-green-500"
              >
                HOME
              </Link>
              <Link
                to="/blogs"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-green-500"
              >
                BLOGS
              </Link>
              <Link
                to="/creaters"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-green-500"
              >
                CREATERS
              </Link>
              <Link
                to="/about"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-green-500"
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-green-500"
              >
                CONTACT
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
