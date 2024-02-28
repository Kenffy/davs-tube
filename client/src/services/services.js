import axios from "axios";

//const baseURL = import.meta.env.VITE_API_BASE_URL;
const baseURL = import.meta.env.VITE_API_PUBLIC_BASE_URL;

const request = axios.create({ baseURL, withCredentials: true });

export const login = (creds) =>
  request.post(`/auth/login`, {
    email: creds.email,
    password: creds.password,
  });

export const register = (creds) =>
  request.post(`/auth/register`, {
    name: creds.name,
    email: creds.email,
    password: creds.password,
  });

export const getVideos = () => request.get("/videos");
export const getVideo = (id) => request.get(`/videos/${id}`);
export const createVideo = (data) => request.post("/videos", data);
export const updateVideo = (id, data) => request.put(`/videos/${id}`, data);
export const deleteVideo = (id, data) => request.delete(`/videos/${id}`, data);
export const uploadCover = (cover) => request.post("/uploads/covers", cover);
export const uploadVideo = (video) => request.post("/uploads/videos", video);
