import "./dragdrop.css";
import { MdCloudDownload } from "react-icons/md";
import { BsFillCameraVideoFill } from "react-icons/bs";

export default function DragDropFiles({ file, setFile, selectedVideo }) {
  const handleFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (selectedVideo) return;
    if (e.dataTransfer && e.dataTransfer.items[0].type == "video/mp4") {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="drag-drop" onDragOver={handleDrag} onDrop={handleDrop}>
      <MdCloudDownload className="icon" />
      <h4>Drag and drop your video</h4>
      {file ||
        (selectedVideo && (
          <span className="filename">
            {file ? file.name : selectedVideo ? selectedVideo.videoUrl : ""}
          </span>
        ))}
      <label htmlFor="upload-video">
        <input
          disabled={selectedVideo}
          id="upload-video"
          type="file"
          accept="video/mp4"
          onChange={handleFile}
          style={{ display: "none" }}
        />
        <div className="upload-btn">
          <BsFillCameraVideoFill className="upload-icon" />
          <span>Select Video</span>
        </div>
      </label>
    </div>
  );
}
