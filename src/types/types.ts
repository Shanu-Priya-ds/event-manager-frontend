export interface AuthContextType{
    user:User | null,
    token:string | null,
   // login:(data:LoginResponse)=>Promise<void>,
    logout:()=>void,
    setAuthData:(user:User, token:string)=>void
}
export interface User{
     userId: string,
     username: string,
     email: string
}

export interface LoginCredentials{
    email:string,
    password: string
}

export interface LoginResponse{
    user:User,
    token: string
}