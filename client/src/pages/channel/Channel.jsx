import VideoCard from "../../components/videos/VideoCard";
import "./channel.css";
import Banner from "../../assets/img/banner.png";
import noprofile from "../../assets/img/default.png";
import { useState } from "react";
import PlaylistCard from "../../components/videos/PlaylistCard";

export default function Channel() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="channel">
      <div className="channel-wrapper container">
        <div className="banner">
          <img src={Banner} alt="banner" />
        </div>
        <div className="infos">
          <img src={noprofile} className="avatar" />
          <div className="details">
            <h4 className="channel-name">John Doe</h4>
            <span className="stats">6524 subscribres . 148 videos</span>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              recusandae.
            </p>
            <button>Subscribe</button>
          </div>
        </div>
        <div className="tab-wrapper">
          <div
            className={tabIndex == 0 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(0)}
          >
            <span>Videos</span>
          </div>
          <div
            className={tabIndex == 1 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(1)}
          >
            <span>Playlists</span>
          </div>
          <div
            className={tabIndex == 2 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(2)}
          >
            <span>Settings</span>
          </div>
        </div>
        <div className="tab-content">
          {tabIndex == 0 && (
            <div className="video-list">
              {[...Array(15)].map((item, index) => (
                <VideoCard key={index} />
              ))}
            </div>
          )}
          {tabIndex == 1 && (
            <div className="video-list">
              {[...Array(8)].map((item, index) => (
                <PlaylistCard key={index} />
              ))}
            </div>
          )}
          {tabIndex == 2 && <div className="channel-settings">Settings</div>}
        </div>
      </div>
    </div>
  );
}
