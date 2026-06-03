import React, { createContext, useState, type ReactNode } from "react";
import type { AuthContextType, LoginCredentials, LoginResponse, User } from "../types/types";
import { loginService} from "../services/authService";

//interface

//1. create the contxt
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}:{children:ReactNode}){

    const[user, setUser]  = useState<User | null>(null);
    const[token, setToken] = useState<string|null>(null);

    async function login(loginCredential:LoginCredentials){
        const data:LoginResponse = await loginService(loginCredential);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

    }

    function logout(){
        setUser(null);
        setToken(null);
    }
    return(<AuthContext.Provider value={{user, token, login, logout}}>
        {children}
    </AuthContext.Provider>)
} 