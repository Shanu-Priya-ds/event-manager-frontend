import type { LoginCredentials, LoginResponse } from "../types/types";
import axiosInstance from "./api"


export async function loginService(loginCredentials:LoginCredentials):Promise<LoginResponse>{
    try{
        const data = await axiosInstance.post("/auth/login",loginCredentials);
        return data.data;
    }catch(error:any){//TODO: Need proper error handling for other type of errors.
        const errorMsg = error.response?.data?.error || "Invalid user";
        console.error(error);
        throw new Error(errorMsg);
    }
}