import { useContext } from "react";
import "./sidebar.css";
import { AppContext } from "../../context/AppContext";
import { FaLayerGroup, FaCompass } from "react-icons/fa";
import {
  FaHouse,
  FaGear,
  FaFlag,
  FaCirclePlay,
  FaCircleQuestion,
  FaCircleHalfStroke,
  FaUsersRectangle,
  FaClockRotateLeft,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const { state, toggleTheme } = useContext(AppContext);
  console.log(state);
  return (
    <div className={state?.onMenu ? "sidebar active" : "sidebar"}>
      <div className="sidebar-wrapper">
        <NavLink to="/" onClick={() => {}}>
          <FaHouse className="sidebar-icon" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/shorts" onClick={() => {}}>
          <FaCompass className="sidebar-icon" />
          <span>Shorts</span>
        </NavLink>
        <NavLink to="/videos/subscriptions" onClick={() => {}}>
          <FaUsersRectangle className="sidebar-icon" />
          <span>Subscriptions</span>
        </NavLink>

        <>
          <hr className="separator" />

          <div className={`auth ${state?.theme}`}>
            <p>Sign in to like videos, comment and subscribe.</p>
            <NavLink to="/login">Sign In</NavLink>
          </div>
        </>

        <hr className="separator" />

        <NavLink to="/videos/history" onClick={() => {}}>
          <FaClockRotateLeft className="sidebar-icon" />
          <span>History</span>
        </NavLink>
        <NavLink to="/videos/playlist" onClick={() => {}}>
          <FaLayerGroup className="sidebar-icon" />
          <span>Playlists</span>
        </NavLink>
        <NavLink to={`/channel/videos/xyz`} onClick={() => {}}>
          <FaCirclePlay className="sidebar-icon" />
          <span>My Videos</span>
        </NavLink>

        <hr className="separator" />

        <NavLink to="/settings" onClick={() => {}}>
          <FaGear className="sidebar-icon" />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/reports" onClick={() => {}}>
          <FaFlag className="sidebar-icon" />
          <span>Report</span>
        </NavLink>
        <NavLink to="/help" onClick={() => {}}>
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
    </div>
  );
}
