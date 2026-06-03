import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

function Register(){

    const[formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    });

    const navigate = useNavigate();
    function handleFormSubmit(e:SyntheticEvent){
        e.preventDefault();
        
        navigate("/home");
    }
    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target;
        setFormData(prev=>({...prev, [name]:value}));
    }
    return (<div>
        <h1>Register Events</h1>
        <form onSubmit={handleFormSubmit}>
            <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder="Enter username"/>
            <input type="text" name="password" value={formData.email} placeholder="Enter Email"/>
            <input type="password" name="email" value={formData.password} placeholder="Enter Password"/>
            <input type="password" placeholder="Confirm Password"/>
            <button type="submit">Register</button>
        </form>
        </div>)
}
export default Register;