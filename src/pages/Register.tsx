import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import type { LoginResponse } from "../types/types";
import { Calendar } from "lucide-react";
import suGoogleImg from "../assets/web_dark_rd_SU@1x.png"

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

   function handleGoogleLogin(){
        window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL;
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
                    <p className="text-lg text-gray-600">Create your account</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm" >
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                            placeholder="Choose a username"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 transition-colors duration-200"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Email address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 transition-colors duration-200"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 transition-colors duration-200"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm password</label>
                        <input
                            type="password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 transition-colors duration-200"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
                        type="submit"
                    >
                        Create account
                    </button>
                </form>
                <div className="flex flex-col items-center justify-center">
                    <p>or</p>
                    <button type="button" onClick={handleGoogleLogin}>
                        <img src={suGoogleImg}/>
                    </button>
                </div>
                </div>
                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-gray-800 font-semibold hover:text-gray-600 transition-colors duration-200">Sign in</Link>
                </p>
            </div>
        </div>
    )
}
export default Register;