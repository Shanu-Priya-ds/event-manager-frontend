import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import type { LoginResponse } from "../types/types";

function Register(){

    const[formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    });

    const { execute } = useApi<LoginResponse>({
        url:"/auth/register",
        method: "POST",
        autoFetch: false,
        successMsg:"Registation is complete and loggedin successfully."
    });

    const auth = useAuth();

    const navigate = useNavigate();
    async function handleFormSubmit(e:SyntheticEvent){
        e.preventDefault();
        //validate input

        const response = await execute(formData);
          if (response) {
            auth.setAuthData(response.user, response.token);
            console.log("Registration Success..Redirecting to home page");
            navigate("/home");
        }
       
    }
    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target;
        setFormData(prev=>({...prev, [name]:value}));
    }
    return (<div>
        <h1>Register Events</h1>
        <form onSubmit={handleFormSubmit}>
            <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder="Enter username"/>
            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email"/>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password"/>
            <input type="password" placeholder="Confirm Password"/>
            <button type="submit">Register</button>
        </form>
        </div>)
}
export default Register;