import VideoCard from "./VideoCard";
import "./videolist.css";
import * as services from "../../services/services";
import { useEffect, useState } from "react";

export default function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideoAsync();
  }, []);

  const loadVideoAsync = async () => {
    try {
      const res = await services.getVideos();
      if (res) {
        setVideos(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(videos);

  return (
    <div className="video-list">
      {[...Array(30)].map((item, index) => (
        <VideoCard key={index} />
      ))}
    </div>
  );
}
