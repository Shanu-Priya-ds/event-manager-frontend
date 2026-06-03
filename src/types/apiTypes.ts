export interface ApiState<T>{
    data: T | null;
    loading: boolean;
    error: string | null
}

export interface ApitInputProps<T>{
    url:string;
    method?:"GET" | "POST" | "PUT" | "DELETE";
    postData: T | null;
   autoFetch:boolean;
}