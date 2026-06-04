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

export interface EventModel{
    _id:string;
    title:string;
    description:string;
    imageUrl:string;
    venue:string;
    dateTime:string;
    organizerId:string;
    organizerName:string;
    capacity:number;
    attendeeCount:number;
    attendees?:User[];
}

export interface MyRegistrationsRes{
    _id: string;
    userId:string;
    eventId:EventModel;
}