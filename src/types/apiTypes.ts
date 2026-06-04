export interface ApiState<T>{
    data: T | T[] | null;
    loading: boolean;
    error: string | null
}

export interface ApitInputProps{
    url:string;
    method?:"GET" | "POST" | "PUT" | "DELETE";
    autoFetch:boolean;
    successMsg:string;
}