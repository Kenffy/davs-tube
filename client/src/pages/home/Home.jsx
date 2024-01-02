import VideoList from "../../components/videos/VideoList";
import "./home.css";
import Cover from "../../assets/img/header.png";

export default function Home() {
  return (
    <div className="home">
      <div className="header">
        <img src={Cover} alt="header cover" className="cover-header" />
        <div className="header-wrapper">
          <h2>Your videos, your community, your stage.</h2>
          <p>Where videos bring people together</p>
        </div>
      </div>
      <VideoList />
    </div>
  );
}
