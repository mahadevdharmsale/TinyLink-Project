import axios from "axios";

const API = axios.create({
  baseURL: "https://tinylink-project-qtuk.onrender.com",
});

export const getLinks = () => API.get("/api/links").then((res) => res.data);
export const createLink = (data) => API.post("/api/links", data).then((res) => res.data);
export const deleteLink = (code) => API.delete(`/api/links/${code}`).then((res) => res.data);
export const getLinkStats = (code) => API.get(`/api/links/${code}`).then((res) => res.data);
