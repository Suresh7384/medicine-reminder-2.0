import axios from "axios";

const API = "http://localhost:5000/api/push";

const getToken = () => localStorage.getItem("token");

export const saveSubscription = (subscription) => {
    return axios.post(
        `${API}/subscribe`,
        { subscription },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );
};