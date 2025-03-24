import useFetch from "../Hooks/useFetch";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import CardPost from "@/my-components/CardPost";
  

const authenticateUser = async (token: string) => {
    const { post } = useFetch("https://localhost:7170/api/user/");
    try {
      const data = await post("validateToken", { token }); // ✅ Await API call
      return data.result
    } catch (error) {
      return null; 
    }
  };

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token) {
          authenticateUser(token).then((result) => {
            if (result) {
              setUser(result);
            }
          });
        }
        else {
            navigate("/");
        }
      }, []);



    return <>
    <div className="flex flex-col items-center justify-center gap-10">
      {user ? <p className="font-medium mx-auto">Welcome back, {user.username}</p> : <p>Loading...</p>}
      <CardPost/>
      </div>


    </>
}
  