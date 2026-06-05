import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useApi from "../hooks/useApi";
import type { LoginResponse } from "../types/types";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const auth = useAuth();

    const { loading, execute } = useApi<LoginResponse>({
        url: "/auth/login",
        method: "POST",
        autoFetch: false,
        successMsg: "You are logged In now."
    });

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        const response = await execute(formData);
        if (response) {
            auth.setAuthData(response.user, response.token);
            console.log("Login Success..Redirecting to home page");
            navigate("/home");
        }
    }

    function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex-col p-6 rounded-xl">
                <div className="text-center mb-2">
                    <h1 className="text-xl font-semibold">Event Manager</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
                </div>

                <form className="bg-white border border-gray-200 rounded-xl p-6" onSubmit={handleSubmit}>
                    <div className="mb-4 ">
                        <label className="block text-sm font-medium mb-1.5">Email address</label>
                        <input name="email" className="rounded-l border border-gray-200 px-1"
                            value={formData.email} onChange={handleFormChange} type="text" placeholder="enter email" />

                    </div>
                    <div className="mb-5">
                        <div className="flex justify-between mb-1.5"><label className="text-sm font-medium">Password</label>
                            <a href="#" className="text-xs text-blue-600">Forgot password?</a>
                        </div>
                        <input type="password" value={formData.password}
                            onChange={handleFormChange} name="password"
                            className="rounded-l border border-gray-200 px-1" placeholder="enter password" />
                    </div>
                    <button type="submit" className="bg-gray-400 cursor-pointer w-full text-white px-1 py-1 rounded" disabled={loading}>{loading ? "Logging in..." : "Sign in"}</button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-medium">Sign up</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;