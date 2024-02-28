//import Sample from "../../assets/videos/sample.mp4";
import "./videoplayer.css";

//const baseURL = import.meta.env.VITE_API_BASE_URL;
const baseURL = import.meta.env.VITE_API_PUBLIC_BASE_URL;

export default function VideoPlayer({ video }) {
  return (
    <div className="video-player">
      <video src={`${baseURL}/medias/videos/${video}`} controls />
    </div>
  );
}
