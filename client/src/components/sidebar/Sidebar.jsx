import { useContext } from "react";
import "./sidebar.css";
import { AppContext } from "../../context/AppContext";
import { FaLayerGroup } from "react-icons/fa";
import {
  FaHouse,
  FaGear,
  FaFlag,
  FaCirclePlay,
  FaCircleQuestion,
  FaCircleHalfStroke,
  FaClockRotateLeft,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const { state, toggleTheme, toggleMenu } = useContext(AppContext);
  const authUser = false;

  return (
    <div className={state?.onMenu ? "sidebar active" : "sidebar"}>
      <div className={`sidebar-wrapper ${state?.theme}`}>
        <NavLink to="/" onClick={toggleMenu}>
          <FaHouse className="sidebar-icon" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/videos/history" onClick={toggleMenu}>
          <FaClockRotateLeft className="sidebar-icon" />
          <span>History</span>
        </NavLink>
        <NavLink to="/videos/playlist" onClick={toggleMenu}>
          <FaLayerGroup className="sidebar-icon" />
          <span>Playlists</span>
        </NavLink>
        <NavLink to={`/channel/videos/xyz`} onClick={toggleMenu}>
          <FaCirclePlay className="sidebar-icon" />
          <span>My Videos</span>
        </NavLink>

        {!authUser && (
          <>
            <hr className="separator" />

            <div className={`auth ${state?.theme}`}>
              <p>Sign in to like videos, comment and subscribe.</p>
              <NavLink className="login-btn" to="/login" onClick={toggleMenu}>
                Sign In
              </NavLink>
            </div>
          </>
        )}

        <hr className="separator" />

        <NavLink to="/settings" onClick={toggleMenu}>
          <FaGear className="sidebar-icon" />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/reports" onClick={toggleMenu}>
          <FaFlag className="sidebar-icon" />
          <span>Report</span>
        </NavLink>
        <NavLink to="/help" onClick={toggleMenu}>
          <FaCircleQuestion className="sidebar-icon" />
          <span>Help</span>
        </NavLink>
        <div className="toggle-theme" onClick={toggleTheme}>
          <FaCircleHalfStroke className="sidebar-icon" />
          <span>Dark Mode</span>
        </div>

        <hr className="separator" />

        <div className="terms">
          <div className="terms-wrapper">
            <span>Terms of Services</span>
            <span>Privacy Policy and Safety</span>
          </div>
          <span className="terms-rights">
            CodeWithDavs DavsTube © 2023 copyright All rights reserved
          </span>
        </div>
      </div>
      <div className="close-sidebar" onClick={toggleMenu}></div>
    </div>
  );
}
