import { useContext, useState } from "react";
import "./editchannel.css";
import { AppContext } from "../../context/AppContext";
import DefaultBanner from "../../assets/img/banner.png";
import noprofile from "../../assets/img/default.png";
import { FaCamera } from "react-icons/fa6";

export default function EditChannel({ open, onClose }) {
  const { state } = useContext(AppContext);
  const [banner, setBanner] = useState(null);
  const [profile, setProfile] = useState(null);
  const [channel, setChannel] = useState("");
  const [desc, setDesc] = useState("");

  const clearInputs = () => {
    setBanner(null);
    setProfile(null);
    setChannel("");
    setDesc("");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      banner,
      profile,
      channel,
      desc,
    };
    console.log("Saving...", data);
    clearInputs();
    onClose(false);
  };

  const handleBanner = (e) => {
    setBanner(e.target.files[0]);
  };
  const handleProfile = (e) => {
    setProfile(e.target.files[0]);
  };
  return (
    <div className={open ? "edit-channel active" : "edit-channel"}>
      <div className={`wrapper ${state?.theme}`}>
        <div className="banner">
          <img
            src={banner ? URL.createObjectURL(banner) : DefaultBanner}
            alt="banner"
          />

          <label htmlFor="upload-cover">
            <input
              id="upload-cover"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleBanner}
              style={{ display: "none" }}
            />
            <div className="upload-banner">
              <FaCamera className="camera-icon" />
            </div>
          </label>
        </div>
        <div className="infos">
          <div className="profile-wrapper">
            <img
              src={profile ? URL.createObjectURL(profile) : noprofile}
              className="avatar"
            />
            <label htmlFor="upload-profile">
              <input
                id="upload-profile"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleProfile}
                style={{ display: "none" }}
              />
              <div className="upload-profile">
                <FaCamera className="camera-icon" />
              </div>
            </label>
          </div>

          <form className="details" onSubmit={handleSubmit}>
            <input
              required
              type="text"
              placeholder="Channel Name"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            />

            <textarea
              placeholder="Channel Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="desc"
            />
            <div className="actions">
              <button className="cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
