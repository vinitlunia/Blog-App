import axios from "axios";
import { useEffect, useState } from "react"
function Creater() {
  const [admin, setAdmin] = useState([]);
  useEffect(()=>{
    const fetchAdmins = async() =>{
      try {
        
        const {data} = await axios.get("http://localhost:4001/api/users/admins",{
          withCredentials: true,
        })
        console.log("adminsss",data);
        setAdmin(data)
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchAdmins()
  },[])
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Popular Creators</h1>
      <div className="grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-full my-5">
        {admin && admin.length > 0 ? (
          admin.slice(0,4).map((element)=>{
            return(
              <div key={element._id}>
                <div>
                  <img src={element.photo?.url} alt="admin" className="md:w-56 md:h-56 object-cover border border-black rounded-full items-center"/>
                  <div className="text-center md:ml-[-130px]">
                    <p>{element.name}</p>
                    <p className="text-gray-600 text-xs">{element.role}</p>

                  </div>
                </div>
                </div>
            )
          })
        ):(
          <div></div>
        )

        }
      </div>

    </div>
  )
}

export default Creater