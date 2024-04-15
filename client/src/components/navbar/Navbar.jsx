import { useContext, useState } from "react";
import "./navbar.css";
import { AppContext } from "../../context/AppContext";
import { Link, NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiVideoAddFill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import Avatar from "../custom/Avatar";
import Sidebar from "../sidebar/Sidebar";
import NavMenu from "./NavMenu";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Navbar() {
  const { state, toggleMenu } = useContext(AppContext);
  const [onSearch, setOnSearch] = useState(false);
  const [onMenu, setOnMenu] = useState(false);
  const authUser = state?.channel;

  const profileUrl = `${baseURL}/medias/profiles/${authUser?.profile}`;

  const toggleSearch = () => {
    setOnSearch((prev) => !prev);
  };
  return (
    <>
      <div className={`navbar ${state?.theme}`}>
        <div className="nav-wrapper">
          <div className={onSearch ? "nav-left mobile-search" : "nav-left"}>
            <Link to="/" className="logo">
              <span>Davs</span>
              <span className="tube">Tube</span>
            </Link>
          </div>
          <div className={onSearch ? "nav-center active" : "nav-center"}>
            <div className="nav-icon mobile" onClick={() => setOnSearch(false)}>
              <FaArrowLeft />
            </div>
            <form
              className="nav-form"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("searching...");
              }}
            >
              <input
                className={state?.theme}
                type="search"
                placeholder="Search"
              />
              <button type="submit">
                <FiSearch />
              </button>
            </form>
          </div>
          <div className={onSearch ? "nav-right mobile-search" : "nav-right"}>
            <div className="nav-icon mobile" onClick={toggleSearch}>
              <FiSearch />
            </div>
            {authUser && (
              <>
                <NavLink to="/upload" className="nav-icon">
                  <RiVideoAddFill />
                </NavLink>
                <NavLink to="/notifications" className="nav-icon">
                  <FaBell />
                </NavLink>
              </>
            )}
            <div
              onBlur={() => {
                setOnMenu(false);
              }}
              onClick={() => setOnMenu((prev) => !prev)}
              className="nav-icon"
            >
              <div tabIndex={0} className="nav-avatar">
                {authUser ? (
                  <Avatar src={authUser?.profile ? profileUrl : ""} size={35} />
                ) : (
                  <HiDotsHorizontal />
                )}
              </div>
            </div>
            <div className="nav-icon" onClick={toggleMenu}>
              <GiHamburgerMenu />
            </div>
          </div>
          <NavMenu open={onMenu} onClose={setOnMenu} />
        </div>
      </div>
      <Sidebar />
    </>
  );
}
