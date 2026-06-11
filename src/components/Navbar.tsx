import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Calendar } from "lucide-react";

function Navbar(){

    const { pathname } = useLocation();

    const pagesToHide =["/login","/register","/","/auth/callback"];
    //hide navbar for login, register, and welcome
    if(pagesToHide.includes(pathname)) return null;

    const navigate = useNavigate();
    const {logout, user} = useAuth();


    const redirectToLogin = ()=>{
        navigate("/login");
    }
    const handleLogOut = ()=>{
        logout();
        //redirect to welcome page, navigate("/") doesnt work, so used window object to do page refresh
        window.location.href = "/";
    }
    return(
        <nav className="bg-gradient-to-r from-grey-600 to-grey-700 text-black p-3 shadow-lg drop-shadow-md">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <Calendar size={22} className="text-white" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-lg font-bold">Event Manager</h5>
                        <p className="text-xs text-gray-700 -mt-1">Manage with ease</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={()=> navigate("/home")}
                        className="hover:bg-gray-300 text-xs p-1 cursor-pointer rounded transition-colors duration-200">
                        Home
                    </button>
                    <button  onClick={()=> navigate("/dashboard")}
                        className="hover:bg-gray-300 text-xs p-1 cursor-pointer
                         cursor-pointer rounded transition-colors duration-200">
                        My events
                    </button>
                    <button
                        onClick={()=> navigate("/myRegistrations")}
                        className="hover:bg-gray-300 text-xs p-1 rounded 
                        cursor-pointer transition-colors duration-100">
                        My Registrations
                    </button>
                </div>
                {user ?
                    <div className="flex items-center gap-4">
                        <p className="text-xs font-semibold">Welcome {user.username}</p>
                        <button
                            onClick={handleLogOut}
                            className="bg-gray-300 text-xs hover:bg-gray-600 cursor-pointer  px-1 py-0.5 rounded transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                    :
                    <button
                        onClick={redirectToLogin}
                        className="bg-gray-300 hover:bg-gray-600 px-2 py-1 cursor-pointer rounded transition-colors duration-200"
                    >
                        Login
                    </button>
                }
            </div>
        </nav>
    );
}

export default Navbar;