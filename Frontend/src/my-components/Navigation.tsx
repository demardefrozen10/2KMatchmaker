import { Button } from "@/components/ui/button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import SignUpForm from "../Pages/SignupForm";
import LoginForm from "../Pages/LoginForm";
import Hero from "../Pages/Hero";
import Dashboard from "../Pages/Dashboard";
import { useState } from "react";
import CreatePost from "@/Pages/CreatePost";
import { Menu } from "lucide-react";
import { useEffect } from "react";
import PostPortal from "../Pages/PostPortal";
import Chat from "@/Pages/Chat";
import RealChat from "@/Pages/RealChat";


function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  useEffect(() => {
    const handleTokenChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("token", handleTokenChange);
    
    return () => {
      window.removeEventListener("token", handleTokenChange);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("token"));
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
    <Router>
      <nav className="flex justify-between p-2 relative">
        <div className="flex gap-2">
          <Button variant="link">2K SquadFinder</Button>
          <div className="hidden md:flex gap-2">
            <Link to="/"><Button variant="ghost">Home</Button></Link>
            {isLoggedIn && <Link to="/postportal"><Button variant="ghost">Squad Browser</Button></Link>}
            {isLoggedIn && <Link to="/chat"><Button variant="ghost">Chat</Button></Link>}
          </div>
        </div>

        <div className="hidden md:flex gap-2 mr-3">
          {!isLoggedIn && <Link to="/signup"><Button variant="outline">Sign up</Button></Link>}
          {!isLoggedIn && <Link to="/login"><Button>Login</Button></Link>}
          {isLoggedIn && <Link to="/dashboard"><Button variant="outline">Dashboard</Button></Link>}
          {isLoggedIn && <Link to="/"><Button onClick={handleLogout}>Logout</Button></Link>}
        </div>

        <Button 
          variant="ghost" 
          className="md:hidden p-2" 
          onClick={toggleMenu}
        >
          <Menu size={28} strokeWidth={2.5} className="text-blue-600" />
        </Button>

        {isMenuOpen && (
          <div className="absolute top-full right-0 w-48 bg-white shadow-md rounded-md z-50 py-2 md:hidden">
            <div className="flex flex-col gap-1">
              <Link to="/" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start">Home</Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start" onClick={toggleMenu}>About Us</Button>
              
              {!isLoggedIn && (
                <Link to="/signup" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">Sign up</Button>
                </Link>
              )}
              
              {!isLoggedIn && (
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">Login</Button>
                </Link>
              )}
              
              {isLoggedIn && (
                <Link to="/dashboard" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                </Link>
              )}
              
              {isLoggedIn && (
                <Link to="/" onClick={() => { handleLogout(); toggleMenu(); }}>
                  <Button variant="ghost" className="w-full justify-start">Logout</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/" element={<Hero/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/createpost" element={<CreatePost/>}/>
        <Route path="/postportal" element={<PostPortal/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default Navigation;