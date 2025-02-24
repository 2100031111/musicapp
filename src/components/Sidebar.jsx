import React from "react";
import { Link } from "react-router-dom";
import {
  HomeRounded,
  CloseRounded,
  SearchRounded,
  FavoriteRounded,
  UploadRounded,
  LightModeRounded,
  LogoutRounded,
  DarkModeRounded,
  CloudUploadRounded,
  PlaylistPlayRounded,
  PodcastsRounded, 
} from "@mui/icons-material";
import LogoImage from "../Images/Logo.png";
import "./Sidebar.css";

const Sidebar = ({ setMenuOpen, setDarkMode, darkMode }) => {
  const menuItems = [
    { link: "/dashboard", name: "Dashboard", icon: <HomeRounded /> },
    { link: "/search", name: "Search", icon: <SearchRounded /> },
    { link: "/podcast", name: "Podcast", icon: <PodcastsRounded /> },
    { link: "/favorites", name: "Favourites", icon: <FavoriteRounded /> },
    { link: "/upload", name: "Upload", icon: <CloudUploadRounded /> },
    { link: "/logout", name: "Logout", icon: <LogoutRounded /> },

  ];

  const buttons = [
    
    {
      fun: () => setDarkMode(!darkMode),
      name: darkMode ? "Light Mode" : "Dark Mode",
      icon: darkMode ? <LightModeRounded /> : <DarkModeRounded />,
    },
  ];

  return (
    <div className="menu-container">
      <div className="flex">
        <div className="logo">
          <img src={LogoImage} alt="Logo" className="image" />
          PODSTREAM
        </div>
        <div className="close" onClick={() => setMenuOpen(false)}>
          <CloseRounded />
        </div>
      </div>

      {menuItems.map((item, index) => (
        <Link to={item.link} key={index} className="link">
          <div className="elements">
            {item.icon}
            <span className="nav-text">{item.name}</span>
          </div>
        </Link>
      ))}

      <div className="hr" />

      {buttons.map((btn, index) => (
        <div key={index} className="elements" onClick={btn.fun}>
          {btn.icon}
          <span className="nav-text">{btn.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
