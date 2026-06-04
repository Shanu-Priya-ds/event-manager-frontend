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
    return((<nav>
        <h1>Event Managamnet System</h1>
        <div>
            <button onClick={()=> navigate("/home")}>Home</button>
            <button onClick={()=> navigate("/dashboard")}>My events</button>
            <button onClick={()=> navigate("/myRegistrations")}>My Registrations</button>
        </div>
        {user ? <div><p>Welcome {user.userId}</p> <button onClick={handleLogOut}>Logout</button></div> : <button onClick={redirectToLogin}>Login</button>}
    </nav>));
}

export default Navbar;