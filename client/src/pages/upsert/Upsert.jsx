import { useContext, useState } from "react";
import DragDropFiles from "../../components/custom/DragDropFiles";
import "./upsert.css";
import { FaImage } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import * as services from "../../services/services";

export default function Upsert() {
  const { state } = useContext(AppContext);
  const [cover, setCover] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleCover = (e) => {
    e.preventDefault();
    setCover(e.target.files[0]);
  };

  const clearInputs = () => {
    setCover(null);
    setVideo(null);
    setTitle("");
    setDesc("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const coverName = await handleUploadCover();
      const videoName = await handleUploadVideo();

      if (!coverName && !videoName) return;

      const data = {
        videoUrl: videoName,
        cover: coverName,
        title,
        desc,
      };
      const res = await services.createVideo(data);
      if (res) {
        clearInputs();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUploadCover = async () => {
    if (!cover) return undefined;

    try {
      const formData = new FormData();
      const filename = new Date().getTime() + "-" + cover.name;
      formData.append("filename", filename);
      formData.append("file", cover);

      const res = await services.uploadCover(formData);
      if (res.status == 200) {
        return filename;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadVideo = async () => {
    if (!video) return undefined;

    try {
      const formData = new FormData();
      const filename = new Date().getTime() + "-" + video.name;
      formData.append("filename", filename);
      formData.append("file", video);

      const res = await services.uploadVideo(formData);
      if (res.status == 200) {
        return filename;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`upsert ${state?.theme}`}>
      <div className="wrapper container">
        <h2 className="heading">Upload new video</h2>
        <div className="inputs-wrapper">
          <div className="left">
            <DragDropFiles file={video} setFile={setVideo} />
          </div>
          <div className="right">
            <form className="upsert-form" onSubmit={handleSubmit}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
                required
              />
              <label htmlFor="upload-cover">
                <input
                  id="upload-cover"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleCover}
                  style={{ display: "none" }}
                />
                <div className="upload-btn">
                  <div className="input-cover">
                    <FaImage className="cover-icon" />{" "}
                    <span>{cover ? `${cover?.name}` : "Select Cover"}</span>
                  </div>
                </div>
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description"
              />
              <button type="submit">
                {loading ? "Please wait..." : "Upload"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
