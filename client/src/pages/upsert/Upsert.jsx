import { useContext, useState } from "react";
import DragDropFiles from "../../components/custom/DragDropFiles";
import "./upsert.css";
import { FaImage } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";

export default function Upsert() {
  const { state } = useContext(AppContext);
  const [cover, setCover] = useState(null);
  const [video, setVideo] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      video,
      cover,
      title,
      desc,
    };
    console.log("Saving...", data);
    clearInputs();
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
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
