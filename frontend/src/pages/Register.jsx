import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

function Register() {
  const { setIsAuthenticated,setProfile } = useAuth()
  const navigateTo = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPriview, setphotoPriview] = useState("");

 const changePhotoHandle = (e) =>{
  const file = e.target.files[0];
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload=()=>{
    setphotoPriview(reader.result)
    setPhoto(file)
  }
 }

 const handleRegister =async(e) =>{
  e.preventDefault()
  const formData = new FormData()
  formData.append('name',name)
  formData.append('email',email)
  formData.append('phone',phone)
  formData.append('password',password)
  formData.append('role',role)
  formData.append('education',education)
  formData.append('photo',photo)
  try {
    const {data} = await axios.post('http://localhost:4001/api/users/register',formData,{
      headers:{
        "Content-Type":"multipart/form-data",
      }
    })
    console.log(data);
    localStorage.setItem("jwt", data.token); // storing token in localStorage so that if user refreshed the page
    toast.success(data.message || 'User registerded Successfully')
    setIsAuthenticated(true)
    setName("")
    setProfile(data)
    setEmail("")
    setPhone("")
    setPassword("")
    setRole("")
    setEducation("")
    setPhoto("")
    setphotoPriview("")
    navigateTo("/login")
    
  } catch (error) {
    console.log(error);
      toast.error(
        error.response.data.message || "Please fill the required fields"
      
      );
    
  }

 }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleRegister}>
            <div className="font-semibold items-center text-xl text-center">
              Cilli<span className="text-blue-500">Blog</span>
            </div>
            <h1 className="font-semibold mb-6 text-xl">Regisgter</h1>
            <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full mb-4 p-2 border rounded-md">
              <option  value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="mb-4">
              <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Your Name" className=" w-full  p-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Your Email address" className=" w-full  p-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <input type="number" onChange={(e)=>setPhone(e.target.value)} value={phone} placeholder="Your Phone Number" className=" w-full  p-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Your Password" className=" w-full  p-2 border rounded-md" />
            </div>
            <select value={education} onChange={(e)=>setEducation(e.target.value)} className="w-full mb-4 p-2 border rounded-md">
              <option value="" >Select Your Education</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
              <option value="BSC">BSC</option>
              <option value="MSC">MSC</option>
            </select>
            <div className="flex items-center mb-4">
              <div className="photo w-20 h-20 mr-4">
                <img src={photoPriview?`${photoPriview}`:"photo"} alt="Photo" />
              </div>
              <input type="file" onChange={changePhotoHandle} className="w-full p-2 border rounded-md" />
            </div>
            <p className="text-center mb-4">
              Already registerd?{" "}
              <Link className="text-blue-600" to={"/login"}>Login Now</Link>
            </p>
            <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register 