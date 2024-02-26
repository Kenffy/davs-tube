import Avatar from "../custom/Avatar";
import "./videocard.css";
import { format } from "timeago.js";
//import Cover from "../../assets/img/bookstore.png";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function VideoCard({ video }) {
  const profileUrl = `${baseURL}/medias/profiles/${video?.profile}`;
  const coverUrl = `${baseURL}/medias/covers/${video?.cover}`;

  return (
    <div className="video-card">
      <a className="card-cover" href={`/videos/${video?._id}`}>
        <img src={coverUrl} alt="card cover" />
      </a>
      <div className="card-details">
        <a href={`/videos/${video?._id}`} className="card-title">
          {video?.title}
        </a>

        <div className="card-infos">
          <a className="card-profile" href={`/channel/${video?.channelId}`}>
            <Avatar size={24} src={video?.profile ? profileUrl : ""} />
          </a>
          <a className="card-channel" href={`/channel/${video?.channelId}`}>
            {video?.name}
          </a>
          <span className="card-views">{`${video?.views} views`}</span>
          <span className="timeline">{format(video?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
