import  { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthContextType, LoginResponse, User } from "../types/types";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}:{children:ReactNode}){
    const[user, setUser]  = useState<User | null>(null);
    const[token, setToken] = useState<string|null>(null);

    async function login(data:LoginResponse){
        try {
            setUser(data.user);
            setToken(data.token);
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    function logout(){
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    function setAuthData(user: User, token: string) {
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    }

    return(<AuthContext.Provider value={{user, token, login, logout, setAuthData}}>
        {children}
    </AuthContext.Provider>)
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
} 