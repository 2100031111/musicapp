import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from './utils/Themes';
import axios from "axios";
import styled from "styled-components";

// Components & Pages
import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Dashboard from "./pages/Dashboard";
import DisplayPodcast from "./pages/Upload";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./pages/Logout";
import Records from "./components/Records";
import Admin from "./components/Admin";
import Gallery from "./pages/Gallery";
import Upload from "./pages/Upload";
import Music from "./pages/Music";
import Podcast from "./pages/Podcast";

// Styled Components
const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bg};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);

      axios.get("http://localhost:3001/admin/check")
        .then(response => setIsAdmin(response.data.isAdmin))
        .catch(() => setIsAdmin(false));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <ThemeProvider theme={darkMode ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/music" element={<Music />} />

          {/* Protected Routes */}
          {isAuthenticated ? (
            <Route path="/*" element={<AuthenticatedApp 
              darkMode={darkMode} setDarkMode={setDarkMode} 
              menuOpen={menuOpen} setMenuOpen={setMenuOpen} 
              isAuthenticated={isAuthenticated} 
              isAdmin={isAdmin} 
              handleLogout={handleLogout} 
              setIsAuthenticated={setIsAuthenticated} 
            />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

// Authenticated User Component (Handles Admin & Normal User UI)
function AuthenticatedApp({ 
  darkMode, setDarkMode, 
  menuOpen, setMenuOpen, 
  isAuthenticated, isAdmin, 
  handleLogout, setIsAuthenticated
}) {
  const location = useLocation(); 

  return (
    <>
      {location.pathname === "/records" ? (
        <Records />
      ) : (
        <Container>
          {menuOpen && !isAdmin && <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} setDarkMode={setDarkMode} darkMode={darkMode} />}
          <Frame>
            {!isAdmin && <NavBar setMenuOpen={setMenuOpen} menuOpen={menuOpen} onLogout={handleLogout} />}
            <Routes>
              {isAdmin ? (
                <>
                  <Route path="/admin-dashboard" element={<Admin />} />
                  <Route path="*" element={<Navigate to="/admin-dashboard" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/favorites" element={<Favorites />} />   
                  <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} /> 
                  <Route path="/records" element={<Records />} /> 
                  <Route path="/upload" element={<Upload />} /> 
                  <Route path="/gallery" element={<Gallery />} /> 
                  <Route path="/podcast" element={<Podcast />} /> 
                  

                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
            </Routes>
          </Frame>
        </Container>
      )}
    </>
  );
}

export default App;
