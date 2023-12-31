import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Video from "./pages/video/Video";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Sidebar from "./components/sidebar/Sidebar";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";

export default function App() {
  const { state } = useContext(AppContext);

  const Layout = () => {
    return (
      <div className="layout">
        <Sidebar />
        <Outlet />
      </div>
    );
  };

  return (
    <div className={`app ${state?.theme}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="video">
              <Route path=":id" element={<Video />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
