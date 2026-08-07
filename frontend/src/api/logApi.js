import axios from "axios";

const API_URL = "http://localhost:5000/api/logs";

const getToken = () => localStorage.getItem("token");

export const getMedicineLogs = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};