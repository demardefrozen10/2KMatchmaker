import { Button } from "@/components/ui/button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import SignUpForm from "../Pages/SignupForm";
import LoginForm from "../Pages/LoginForm";
import Hero from "../Pages/Hero";
import Dashboard from "../Pages/Dashboard";
import useFetch from "../Hooks/useFetch";
import { useEffect, useState } from "react";
import CreatePost from "@/Pages/CreatePost";

const authenticateUser = async (token: string) => {
  if (!token) return false;

  const { post } = useFetch("https://localhost:7170/api/user/");

  try {
    const data = await post("validateToken", { token })
    return data.result.isValid;
  } catch (error) {
    console.error("Token validation error:", error);
    return false; 
  }
};

function Navigation() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await authenticateUser(token || ""); // ✅ Ensure token is string
      setIsLoggedIn(valid);
    };

    checkAuth();
  }, [token]); // ✅ Re-run when token changes

  return (
    <>
    <Router>
   <nav className="flex justify-between p-2">
  <div className="flex gap-2">
    <Button variant="link">2K SquadFinder</Button>
    <Link to="/"><Button variant="ghost">Home</Button></Link>
    <Button variant="ghost">About Us</Button>
  </div>
  <div className="flex gap-2 mr-3">
    {!isLoggedIn && <Link to="/signup"><Button variant="outline">Sign up</Button></Link> }
    {!isLoggedIn && <Link to="/login"><Button>Login</Button></Link> }
    {isLoggedIn && <Link to="/dashboard"><Button variant="outline">Dashboard</Button></Link> }
    {isLoggedIn && <Link to="/createpost"><Button>Create A Post</Button></Link> }

  </div>
</nav>
<Routes>
              <Route path="/login" element={<LoginForm/>}/>
              <Route path="/signup" element={<SignUpForm/>}/>
              <Route path="/" element={<Hero/>}/>
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/createpost" element={<CreatePost/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default Navigation;