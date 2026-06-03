import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
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

    const { loading, error, execute } = useApi<LoginResponse>({
        url: "/auth/login",
        method: "POST",
        autoFetch: false
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

    return (<>
        <h1>Login Page</h1>
        {error && <p style={{color: "red"}}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input name="email" value={formData.email} onChange={handleFormChange} type="text" placeholder="enter email" />
            <input type="password" value={formData.password} onChange={handleFormChange} name="password" placeholder="enter password" />
            <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
    </>)
}

export default Login;