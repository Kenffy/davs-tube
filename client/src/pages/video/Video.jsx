import Comments from "../../components/comments/Comments";
import Avatar from "../../components/custom/Avatar";
import VideoPlayer from "../../components/player/VideoPlayer";
import VideoCard from "../../components/videos/VideoCard";
import "./video.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";
import * as services from "../../services/services";
import { AppContext } from "../../context/AppContext";
import Upsert from "../upsert/Upsert";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Video() {
  const { state } = useContext(AppContext);
  const [onEdit, setOnEdit] = useState(false);
  const [more, setMore] = useState(false);
  const [subStatus, setSubStatus] = useState(false);
  const [videoDetails, setVideoDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const authUser = state?.channel;

  const profileUrl = `${baseURL}/medias/profiles/${videoDetails?.profile}`;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCurrentVideo();
  }, [id, authUser]);

  useEffect(() => {
    loadvideos();
  }, []);

  const loadCurrentVideo = async () => {
    try {
      const res = await services.getVideo(id);
      if (res) {
        setVideoDetails(res.data);
        if (authUser && res.data.subscribers.includes(authUser._id)) {
          setSubStatus(true);
        } else {
          setSubStatus(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadvideos = async () => {
    try {
      const res = await services.getVideos();
      if (res.status == 200) {
        setVideos(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscribe = async () => {
    if (!videoDetails || !authUser) return;
    try {
      if (!authUser.subscriptions.includes(videoDetails?.channelId)) {
        const res = await services.subscribeChannel(videoDetails.channelId);
        if (res.status == 200) {
          setSubStatus(true);
        }
      } else {
        const res = await services.unsubscribeChannel(videoDetails.channelId);
        if (res.status == 200) {
          setSubStatus(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    if (!videoDetails) return;
    try {
      let res = null;
      if (videoDetails?.likes.includes(authUser?._id)) {
        res = await services.dislikeVideo(videoDetails._id);
      } else {
        res = await services.likeVideo(videoDetails._id);
      }

      if (res?.status == 200) {
        loadCurrentVideo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (!videoDetails) return;
    try {
      if (window.confirm("Are you sure you want to delete this?")) {
        const res = await services.deleteVideo(videoDetails._id);
        if (res.status == 200) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (onEdit && videoDetails)
    return (
      <Upsert
        selectedVideo={videoDetails}
        onClose={setOnEdit}
        setSelectedVideo={setVideoDetails}
      />
    );

  return (
    <div className="video-preview">
      <div className="video-preview-wrapper container">
        <div className="video-preview-left">
          {videoDetails && <VideoPlayer video={videoDetails.videoUrl} />}
          <h2 className="video-title">{videoDetails?.title}</h2>
          <div className="video-preview-infos">
            <div className="channel-infos">
              <div className="left">
                <a
                  href={`/channel/${videoDetails?.channelId}`}
                  className="avatar-wrapper"
                >
                  <Avatar
                    size={35}
                    src={videoDetails?.profile ? profileUrl : ""}
                  />
                  <div className="avatar-infos">
                    <h4 className="name">{videoDetails?.name}</h4>
                    <span className="subscribers">{`${videoDetails?.subscribers.length} subscribers`}</span>
                  </div>
                </a>

                {videoDetails?.channelId == authUser?._id ? (
                  <button>
                    <a href={`/channel/${videoDetails?.channelId}`}>
                      View Channel
                    </a>
                  </button>
                ) : (
                  <button onClick={handleSubscribe}>
                    {subStatus ? "Unsubscribe" : "Subscribe"}
                  </button>
                )}
              </div>
              <div className="right">
                {videoDetails?.channelId == authUser?._id && (
                  <>
                    <div
                      className="action-item"
                      onClick={() => setOnEdit(true)}
                    >
                      <FaEdit />
                    </div>
                    <div className="action-item" onClick={handleDelete}>
                      <FaTrashAlt />
                    </div>
                  </>
                )}
                <div className="like-wrapper">
                  <div className="action-item" onClick={handleLike}>
                    {videoDetails?.likes.includes(authUser?._id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </div>
                  <span>{videoDetails?.likes.length}</span>
                </div>

                <div className="action-item">
                  <FaShare />
                </div>
                <div className="action-item">
                  <HiDotsHorizontal />
                </div>
              </div>
            </div>

            <div
              className={
                more ? "video-preview-desc active" : "video-preview-desc"
              }
            >
              <div className="views">
                {`${videoDetails?.views} views`} .{" "}
                {format(videoDetails?.createdAt)}
              </div>
              <div className="video-desc">{videoDetails?.desc}</div>
              <span
                onClick={() => setMore((prev) => !prev)}
                className="read-more"
              >
                {more ? "show less" : "show more"}
              </span>
            </div>

            <div className="video-comments">
              <Comments />
            </div>
          </div>
        </div>
        <div className="video-preview-right">
          {videos.map((item, index) => (
            <VideoCard key={index} video={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
