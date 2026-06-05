import axios from "axios";

const axiosInstance = axios.create({baseURL:import.meta.env.VITE_API_BASE_URL});

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token)
        config.headers.Authorization = `Bearer ${token}`;

    return config
});

axiosInstance.interceptors.response.use(
    (response)=>response,
    (error)=>{
        console.error("API Error:", error.response);
        return Promise.reject(error)
    }
);

export default axiosInstance;