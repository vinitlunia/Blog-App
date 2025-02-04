import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authProvider"
import Sidebar from "../Deshbord/Sidebar";
import MyProfile from '../Deshbord/MyProfile'
import CreateBloge from '../Deshbord/createBloge'
import UpdateBlog from "../Deshbord/UpdateBlog";
import MyBlogs from "../Deshbord/MyBlogs";
import { useState } from "react";

function Dashbord() {
  const {profile,isAuthenticated} = useAuth();
  console.log(profile);
  console.log(isAuthenticated);

  const [component, setComponent] = useState("My Blogs");

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  
  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBloge />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  )
}

export default Dashbord