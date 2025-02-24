import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
   
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    
    
    navigate("/login");
  }, [navigate, setIsAuthenticated]);

  return null;
}

export default Logout;
