import VideoCard from "../../components/videos/VideoCard";
import "./channel.css";
import { useParams } from "react-router-dom";
import Banner from "../../assets/img/banner.png";
import noprofile from "../../assets/img/default.png";
import { useContext, useEffect, useState } from "react";
import PlaylistCard from "../../components/videos/PlaylistCard";
import EditChannel from "../../components/settings/EditChannel";
import { AppContext } from "../../context/AppContext";
import * as services from "../../services/services";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Channel() {
  const { id } = useParams();
  const [currentChannel, setCurrentChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [subStatus, setSubStatus] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [onEdit, setOnEdit] = useState(false);
  const { state } = useContext(AppContext);

  const profileUrl = `${baseURL}/medias/profiles/${currentChannel?.profile}`;
  const bannerUrl = `${baseURL}/medias/banners/${currentChannel?.banner}`;

  const authUser = state?.user;

  useEffect(() => {
    loadCurrentChannel();
    loadVideoByChannelId();
  }, [id, authUser]);

  const loadCurrentChannel = async () => {
    if (!id) return;
    try {
      const res = await services.getChannel(id);
      if (res.status == 200) {
        setCurrentChannel(res.data);
        if (authUser && res.data.subscribers.includes(authUser.id)) {
          setSubStatus(true);
        } else {
          setSubStatus(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadVideoByChannelId = async () => {
    if (!id) return;
    try {
      const res = await services.getVideosByChannelId(id);
      if (res.status == 200) {
        setVideos(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscribe = async () => {
    if (!currentChannel || !authUser) return;
    try {
      if (!subStatus) {
        // subscribe to channel
        const res = await services.subscribeChannel(currentChannel._id);
        if (res.status == 200) {
          setSubStatus(true);
        }
      } else {
        // unsubscribe to channel
        const res = await services.unsubscribeChannel(currentChannel._id);
        if (res.status == 200) {
          setSubStatus(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="channel">
      <div className="channel-wrapper container">
        <div className="banner">
          <img src={currentChannel?.banner ? bannerUrl : Banner} alt="banner" />
        </div>
        <div className="infos">
          <img
            src={currentChannel?.profile ? profileUrl : noprofile}
            className="avatar"
          />
          <div className="details">
            <h4 className="channel-name">{currentChannel?.name}</h4>
            <span className="stats">{`${currentChannel?.subscribers.length} subscribers . ${currentChannel?.videos.length} videos`}</span>
            <p className="desc">{currentChannel?.desc}</p>
            {authUser && currentChannel?._id === authUser?.id ? (
              <button onClick={() => setOnEdit(true)}>Edit Channel</button>
            ) : (
              <button onClick={handleSubscribe}>
                {subStatus ? "Unsubscribe" : "Subscribe"}
              </button>
            )}
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
              {videos.map((item, index) => (
                <VideoCard video={item} key={index} />
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
      {currentChannel?._id == authUser?.id && (
        <EditChannel
          user={currentChannel}
          setUser={setCurrentChannel}
          open={onEdit}
          onClose={setOnEdit}
        />
      )}
    </div>
  );
}
