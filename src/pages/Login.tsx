import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useApi from "../hooks/useApi";
import type { LoginResponse } from "../types/types";
import { Calendar } from "lucide-react";
import siGoogleImg from "../assets/web_dark_rd_SI@1x.png";

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

    // const {execute: redirectToGoogleAuth} = useApi({
    //     url:"/auth/google",
    //     method: "GET",
    //     autoFetch: false,
    //     successMsg: "You are logged In now."
    // }) Axios and fetch are HTTP clients — they do not know how to handle a browser redirect to an external site like Google. Only the browser itself can do that.

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

    function handleGoogleLogin(){
       // redirectToGoogleAuth();
        window.location.href = 'http://localhost:3080/api/auth/google';
    }
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative w-14 h-14 mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <Calendar size={28} className="text-white" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Manager</h1>
                    <p className="text-lg text-gray-600">Welcome back</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <form  onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Email address</label>
                        <input
                            name="email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 transition-colors duration-200"
                            value={formData.email}
                            onChange={handleFormChange}
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold text-gray-900">Password</label>
                            <a href="#" className="text-sm text-gray-800 hover:text-gray-600 font-medium transition-colors duration-200">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleFormChange}
                            name="password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 transition-colors duration-200"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
                <div className="flex flex-col items-center justify-center">
                    <p>or</p>
                    <button type="button" onClick={handleGoogleLogin}>
                        <img src={siGoogleImg}/>
                    </button>
                </div>
                </div>

                <p className="text-center text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-gray-800 font-semibold hover:text-gray-600 transition-colors duration-200">Create one</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;