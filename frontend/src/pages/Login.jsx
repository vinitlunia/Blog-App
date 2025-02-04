import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

function Login() {
  const { setIsAuthenticated, setProfile } = useAuth()
  
  const navigateTo = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");




  const handleLogin = async (e) => {
    e.preventDefault()

  

    try {
      const { data } = await axios.post('http://localhost:4001/api/users/login', { email, password, role }
        , {

          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        })
      console.log(data);
      localStorage.setItem("jwt", data.token) // storing token in localStorage so that if user refreshed the page 
      toast.success(data.message || 'User Login Successfully', { duration: 3000, });
      setProfile(data)
      setIsAuthenticated(true);
      setEmail("")
      setPassword("")
      setRole("")
      navigateTo("/")

    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || "Please fill the required fields",
        {
          duration: 3000,
        }
      );

    }

  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleLogin}>
            <div className="font-semibold items-center  text-2xl text-center">
              Blog<span className=" text-green-500">Haven</span>
            </div>
            <h3 className="font-semibold mb-6 text-md">Regisgter</h3>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full mb-4 p-2 border rounded-md">
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="mb-4">
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Your Email address" className=" w-full  p-2 border rounded-md" />
            </div>
 
            <div className="mb-4">
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Your Password" className=" w-full  p-2 border rounded-md" />
            </div>
  
            <p className="text-center mb-4">
              New User?{" "}
              <Link className="text-green-600" to={"/register"}>Register Now</Link>
            </p>
            <button type="submit" className="w-full p-2 bg-green-500 hover:bg-green-800 duration-300 rounded-md text-white">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login