import Avatar from "../custom/Avatar";
import "./videocard.css";
import Cover from "../../assets/img/bookstore.png";

export default function VideoCard() {
  return (
    <div className="video-card">
      <a className="card-cover" href="/videos/xyz">
        <img src={Cover} alt="card cover" />
      </a>
      <div className="card-details">
        <a href="/videos/xyz" className="card-title">
          Lorem ipsum dolor sit amet Quam sapiente porro dolore.
        </a>

        <div className="card-infos">
          <a className="card-profile" href={`/channel/xyz`}>
            <Avatar size={24} />
          </a>
          <a className="card-channel" href={`/channel/xyz`}>
            John Doe
          </a>
          <span className="card-views">125 views</span>
          <span className="timeline">2 weeks ago</span>
        </div>
      </div>
    </div>
  );
}
