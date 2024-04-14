import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
//const baseURL = import.meta.env.VITE_API_PUBLIC_BASE_URL;

const request = axios.create({ baseURL, withCredentials: true });

// auth services
export const login = (creds) => request.post(`/auth/login`, creds);
export const register = (creds) => request.post(`/auth/register`, creds);

// channel services
export const getChannel = (channelId) => request.get(`/channels/${channelId}`);
export const updateChannel = (channelId, data) =>
  request.put(`/channels/${channelId}`, data);
export const subscribeChannel = (channelId) =>
  request.put(`/channels/subscribe/${channelId}`, { channelId });
export const unsubscribeChannel = (channelId) =>
  request.put(`/channels/unsubscribe/${channelId}`, { channelId });

// video services
export const getVideos = () => request.get("/videos");
export const getVideosByChannelId = (channelId) =>
  request.get(`/videos/channel/${channelId}`);
export const getVideo = (videoId) => request.get(`/videos/${videoId}`);
export const createVideo = (data) => request.post("/videos", data);
export const updateVideo = (videoId, data) =>
  request.put(`/videos/${videoId}`, data);
export const deleteVideo = (videoId, data) =>
  request.delete(`/videos/${videoId}`, data);
export const likeVideo = (videoId) =>
  request.put(`/videos/like/${videoId}`, { videoId });
export const dislikeVideo = (videoId) =>
  request.put(`/videos/dislike/${videoId}`, { videoId });

export const uploadCover = (cover) => request.post("/uploads/covers", cover);
export const uploadProfile = (profile) =>
  request.post("/uploads/profiles", profile);
export const uploadBanner = (banner) =>
  request.post("/uploads/banners", banner);
export const uploadVideo = (video) => request.post("/uploads/videos", video);
