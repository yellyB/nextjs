import axios from "axios";

export const uploadFileAPI = (file: FormData) =>
  axios.post("/api/files/upload", file);
