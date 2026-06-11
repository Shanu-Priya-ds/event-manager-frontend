import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthCallback(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {setAuthData} = useAuth();

    useEffect(()=>{
        const token = searchParams.get("token");
        const user = searchParams.get("user");
        console.log(user);
        if(token){
            setAuthData(JSON.parse(user?user:""), token);
            navigate("/dashboard", {replace:true});//replace true doesnt add up in the URL history, to avoid back button navigat to callback url
        }else{
            navigate("/login", {replace:true});
        }
    },[])

    return (<div>Logging you in..</div>)
}   

export default AuthCallback;