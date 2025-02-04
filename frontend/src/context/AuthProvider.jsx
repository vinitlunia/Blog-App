/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
// import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add authentication state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
       
          let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage (Go to login.jsx)
          console.log(token);
          if (token) {
            const { data } = await axios.get(
              "http://localhost:4001/api/users/my-profile",
              { withCredentials: true ,
                headers: {"Content-type":"application/json"}
              }
            );

         
          console.log(data);
          setIsAuthenticated(true)
          setProfile(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/blogs/all-blogs",
          { withCredentials: true }
        );
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs, isAuthenticated,profile,setIsAuthenticated,setProfile}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
