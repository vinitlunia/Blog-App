import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Blogs from "./pages/Blogs"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Register from "./pages/Register"
// import Footer from "./components/Footer"
import { useAuth } from "./context/AuthProvider"
import Dashbord from "./pages/Dashbord.jsx"
import Creaters from "./pages/Creaters.jsx"
import  { Toaster } from 'react-hot-toast';
import Footer from "./components/Footer.jsx"
import UpdateBlog from "./Deshbord/UpdateBlog.jsx"
import Detail from "./pages/Detail.jsx"
import NotFound from "./pages/NotFound.jsx"


function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashbord","/login","/register"].includes(location.pathname) 
  const {blogs,isAuthenticated } = useAuth();
  console.log("blogs ",blogs);
  let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage to maininting the routes protect (Go to login.jsx)
  console.log(blogs);
  console.log(isAuthenticated); 
  
  return (
    <div>
   {!hideNavbarFooter && <Navbar/>}
   

    <Routes>
      <Route exact path="/"  element={token ? <Home /> : <Navigate to={"/login"} />}/>
      <Route exact path="/blogs" element={<Blogs/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/contact" element={<Contact/>}/>
      <Route exact path="/creaters" element={<Creaters/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/dashbord" element={<Dashbord/>}/>
      <Route exact path="/blog/:id" element={<Detail />} />
      <Route exact path="/blog/update/:id" element={<UpdateBlog/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Toaster />
    {!hideNavbarFooter &&<Footer/>}
    </div>
  )
}

export default App