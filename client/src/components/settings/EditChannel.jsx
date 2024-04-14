import { useContext, useState } from "react";
import "./editchannel.css";
import { AppContext } from "../../context/AppContext";
import DefaultBanner from "../../assets/img/banner.png";
import noprofile from "../../assets/img/default.png";
import { FaCamera } from "react-icons/fa6";
import * as services from "../../services/services";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function EditChannel({ open, onClose, user, setUser }) {
  const { state } = useContext(AppContext);
  const [banner, setBanner] = useState(null);
  const [profile, setProfile] = useState(null);
  const [channel, setChannel] = useState(user ? user.name : "");
  const [desc, setDesc] = useState(user ? user.desc : "");

  const profileUrl = user?.profile
    ? `${baseURL}/medias/profiles/${user?.profile}`
    : null;
  const bannerUrl = user?.banner
    ? `${baseURL}/medias/banners/${user?.banner}`
    : null;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const profileName = await uploadProfile();
      const bannerName = await uploadBanner();

      const data = {
        profile: profileName ? profileName : user?.profile,
        banner: bannerName ? bannerName : user?.banner,
        name: channel,
        desc,
      };
      const res = await services.updateChannel(user._id, data);
      if (res.status == 200) {
        setUser(res.data);
        clearInputs();
        onClose(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBanner = (e) => {
    setBanner(e.target.files[0]);
  };
  const handleProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  const uploadProfile = async () => {
    if (!profile) return undefined;

    try {
      const formData = new FormData();
      const filename = new Date().getTime() + "-" + profile.name;
      formData.append("filename", filename);
      formData.append("file", profile);

      const res = await services.uploadProfile(formData);
      if (res.status == 200) {
        return filename;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadBanner = async () => {
    if (!banner) return undefined;

    try {
      const formData = new FormData();
      const filename = new Date().getTime() + "-" + banner.name;
      formData.append("filename", filename);
      formData.append("file", banner);

      const res = await services.uploadBanner(formData);
      if (res.status == 200) {
        return filename;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={open ? "edit-channel active" : "edit-channel"}>
      <div className={`wrapper ${state?.theme}`}>
        <div className="banner">
          {banner ? (
            <img src={URL.createObjectURL(banner)} alt="banner" />
          ) : (
            <img src={bannerUrl ? bannerUrl : DefaultBanner} alt="banner" />
          )}

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
            {profile ? (
              <img src={URL.createObjectURL(profile)} className="avatar" />
            ) : (
              <img
                src={profileUrl ? profileUrl : noprofile}
                className="avatar"
              />
            )}
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
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
