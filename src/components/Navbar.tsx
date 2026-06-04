import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar(){

    const navigate = useNavigate();
    const {logout, user} = useAuth();

    const redirectToLogin = ()=>{
        navigate("/login");
    }
    const handleLogOut = ()=>{
        logout();
        redirectToLogin();
    }
    return(
        <nav className="bg-gradient-to-r from-grey-600 to-grey-700 text-black p-2 shadow-lg">
            <div className="flex justify-between items-center">
                <h5 className="text-l font-bold">Event Management System</h5>
                <div className="flex gap-6">
                    <button
                        onClick={()=> navigate("/home")}
                        className="hover:bg-gray-300 px-4 py-2 cursor-pointer rounded transition-colors duration-200"
                    >
                        Home
                    </button>
                    <button
                        onClick={()=> navigate("/dashboard")}
                        className="hover:bg-gray-300 px-4 py-2 cursor-pointer cursor-pointer rounded transition-colors duration-200"
                    >
                        My events
                    </button>
                    <button
                        onClick={()=> navigate("/myRegistrations")}
                        className="hover:bg-gray-300 px-2 py-1 rounded cursor-pointer transition-colors duration-100"
                    >
                        My Registrations
                    </button>
                </div>
                {user ?
                    <div className="flex items-center gap-4">
                        <p className="text-xs">Welcome {user.username}</p>
                        <button
                            onClick={handleLogOut}
                            className="bg-gray-500 hover:bg-gray-600 cursor-pointer px-2 py-1 rounded transition-colors duration-200"
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