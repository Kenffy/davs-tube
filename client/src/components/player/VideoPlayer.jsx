import Sample from "../../assets/videos/sample.mp4";
import "./videoplayer.css";

export default function VideoPlayer() {
  return (
    <div className="video-player">
      <video src={Sample} controls />
    </div>
  );
}
