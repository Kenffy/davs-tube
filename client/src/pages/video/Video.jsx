import Comments from "../../components/comments/Comments";
import Avatar from "../../components/custom/Avatar";
import VideoPlayer from "../../components/player/VideoPlayer";
import VideoCard from "../../components/videos/VideoCard";
import "./video.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";
import * as services from "../../services/services";

export default function Video() {
  const [liked, setLiked] = useState(false);
  const [more, setMore] = useState(false);
  const [videoDetails, setVideoDetails] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadVideoAsync();
  }, [id]);

  const loadVideoAsync = async () => {
    try {
      const res_video = await services.getVideo(id);
      const res_videos = await services.getVideos();
      if (res_video) {
        setVideoDetails(res_video.data);
      }

      if (res_videos) {
        setVideos(res_videos.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                  <Avatar size={35} />
                  <div className="avatar-infos">
                    <h4 className="name">{videoDetails?.name}</h4>
                    <span className="subscribers">{`${videoDetails?.subscribers.length} subscribers`}</span>
                  </div>
                </a>

                <button>Subscribe</button>
              </div>
              <div className="right">
                <div className="action-item">
                  <FaEdit />
                </div>
                <div className="action-item">
                  <FaTrashAlt />
                </div>
                <div className="like-wrapper">
                  <div
                    className="action-item"
                    onClick={() => setLiked((prev) => !prev)}
                  >
                    {liked ? <FaHeart /> : <FaRegHeart />}
                  </div>
                  <span>25</span>
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
