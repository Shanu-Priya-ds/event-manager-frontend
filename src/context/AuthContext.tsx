import  { createContext, useContext, useEffect, useState, useRef, type ReactNode } from "react";
import type { AuthContextType, User } from "../types/types";
import useApi from "../hooks/useApi";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}:{children:ReactNode}){
    const userInLocalStorage = localStorage.getItem("user");
    const parsedUser = userInLocalStorage ? (() => {
        try {
            return JSON.parse(userInLocalStorage);
        } catch {
            localStorage.removeItem("user");
            return null;
        }
    })() : null;
    const[user, setUser]  = useState<User | null>(parsedUser);
    const[token, setToken] = useState<string|null>(localStorage.getItem("token"));
    const isInitialLoad = useRef(true);

    const {error} = useApi({
        url: "/auth/validate-token",
        method:"GET",
        autoFetch: isInitialLoad.current && !!token,
        successMsg:"Valid token"
    });

    useEffect(()=>{
        if(token && error) logout();
    },[token, error]);

    useEffect(() => {
        isInitialLoad.current = false;
    }, []);
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

 
    
    return(<AuthContext.Provider value={{user, token, logout, setAuthData}}>
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