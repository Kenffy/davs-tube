import { NavLink } from "react-router-dom";
import Avatar from "../custom/Avatar";
import {
  FaGear,
  FaFlag,
  FaCircleQuestion,
  FaCircleHalfStroke,
} from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import "./navmenu.css";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

export default function NavMenu({ user, open, onClose }) {
  const { state, toggleTheme } = useContext(AppContext);
  return (
    <div className={open ? "nav-menu active" : "nav-menu"}>
      <div className={`nav-menu-wrapper ${state?.theme}`}>
        {user && (
          <NavLink
            to={`/channel/xyz`}
            onClick={() => onClose(false)}
            className="nav-menu-avatar"
          >
            <Avatar size={40} />
            <div className="nav-menu-infos">
              <h4>John Doe</h4>
              <span>View Channel</span>
            </div>
          </NavLink>
        )}
        <div className="nav-menu-links">
          {user ? (
            <div className="nav-menu-item" onClick={() => {}}>
              <FiLogOut className="sidebar-icon" />
              <span>Logout</span>
            </div>
          ) : (
            <div className={`auth ${state?.theme}`}>
              <p>Sign in to like videos, comment and subscribe.</p>
              <NavLink
                className="login-btn"
                to="/login"
                onClick={() => onClose(false)}
              >
                Sign In
              </NavLink>
            </div>
          )}
          <div
            className="nav-menu-item"
            onClick={() => {
              toggleTheme();
              onClose(false);
            }}
          >
            <FaCircleHalfStroke className="sidebar-icon" />
            <span>Dark Mode</span>
          </div>
          <NavLink to="/settings" onClick={() => onClose(false)}>
            <FaGear className="sidebar-icon" />
            <span>Settings</span>
          </NavLink>
          <NavLink to="/reports" onClick={() => onClose(false)}>
            <FaFlag className="sidebar-icon" />
            <span>Report</span>
          </NavLink>
          <NavLink to="/help" onClick={() => onClose(false)}>
            <FaCircleQuestion className="sidebar-icon" />
            <span>Help</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
