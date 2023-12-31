import { useContext } from "react";
import "./navbar.css";
import { AppContext } from "../../context/AppContext";
import { Link, NavLink } from "react-router-dom";
import { FaYoutube, FaBell } from "react-icons/fa";
import { IoMenuSharp, IoSearchOutline } from "react-icons/io5";
import { RiVideoAddFill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import Avatar from "../custom/Avatar";

export default function Navbar() {
  const { state, toggleMenu } = useContext(AppContext);
  return (
    <div className={`navbar ${state?.theme}`}>
      <div className="nav-wrapper container">
        <div className="nav-left">
          <Link to="/" className="logo">
            <span>Davs</span>
            <b>Tube</b>
          </Link>
        </div>
        <div className="nav-center">
          <div className="nav-icon" onClick={() => {}}>
            <FaArrowLeft />
          </div>
          <form>
            <input className={state?.theme} type="text" placeholder="Search" />
            <button>
              <IoSearchOutline />
            </button>
          </form>
        </div>

        <div className="nav-right">
          <div className="nav-icon" onClick={toggleMenu}>
            <FiSearch />
          </div>
          <NavLink to="/upload" className="nav-icon">
            <RiVideoAddFill />
          </NavLink>
          <NavLink to="/notifications" className="nav-icon">
            <FaBell />
          </NavLink>
          <NavLink to="/profile" className="nav-icon">
            <Avatar size={35} />
          </NavLink>
          <div className="nav-icon" onClick={toggleMenu}>
            <IoMenuSharp />
          </div>
        </div>
      </div>
    </div>
  );
}
