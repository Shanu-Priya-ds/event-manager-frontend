import type { LoginCredentials, LoginResponse } from "../types/types";
import axiosInstance from "./api"


export async function loginService(loginCredentials:LoginCredentials):Promise<LoginResponse>{
    try{
        const data = await axiosInstance.post("/api/login",loginCredentials);
        return data.data;
    }catch(error){
        console.error(error);
        throw error;
    }
}

export function logout(){

}


export function registerUser(){

}