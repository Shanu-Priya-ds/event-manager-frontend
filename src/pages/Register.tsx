import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import type { LoginResponse } from "../types/types";

function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const { execute } = useApi<LoginResponse>({
        url: "/auth/register",
        method: "POST",
        autoFetch: false,
        successMsg: "Registation is complete and loggedin successfully."
    });

    const auth = useAuth();

    const navigate = useNavigate();
    async function handleFormSubmit(e: SyntheticEvent) {
        e.preventDefault();
        //TODO: validate input

        const response = await execute(formData);
        if (response) {
            auth.setAuthData(response.user, response.token);
            console.log("Registration Success..Redirecting to home page");
            navigate("/home");
        }

    }
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    return (<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="flex-col p-6 rounded-xl">
            <div className="text-center mb-2">
                <h1 className="text-xl font-semibold">Event Manager</h1>
                <p className="text-sm text-gray-500 mt-1">Creat your account</p>
            </div>
            <form className="bg-white border border-gray-200 rounded-xl p-6"
            onSubmit={handleFormSubmit}>
                <div className="flex flex-col gap-1 pb-2">
                    <label>Username</label>
                    <input type="text" name="username" onChange={handleChange}
                        value={formData.username} placeholder="Enter username" 
                        className="rounded-sm bg-gray-100 px-2" required />
                </div>
                <div className="flex flex-col gap-1 pb-2">
                    <label>Email</label>
                    <input type="text" name="email" value={formData.email}
                        onChange={handleChange} placeholder="Enter Email" 
                        className="rounded-sm bg-gray-100 px-2" required />
                </div>
                <div className="flex flex-col gap-1 pb-2">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password}
                        onChange={handleChange} placeholder="Enter Password"
                        className="rounded-sm bg-gray-100 px-2" required />
                </div>
                <div className="flex flex-col gap-1 pb-2">
                    <label>Confirm Password</label>
                    <input type="password" className="rounded-sm bg-gray-100 px-2" placeholder="Confirm Password" required />
                </div>
                <button className="bg-gray-300 py-0.5 px-2 mt-2 rounded-md w-full"
                    type="submit">Register</button>
            </form>
        </div>
    </div>)
}
export default Register;