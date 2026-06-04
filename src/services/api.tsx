import axios from "axios";

const axiosInstance = axios.create({baseURL:"http://localhost:3080/api"});

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