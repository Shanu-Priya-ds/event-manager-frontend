export interface AuthContextType{
    user:User | null,
    token:string | null,
    login:(loginCredential:LoginCredentials)=>Promise<void>,
    logout:()=>void
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