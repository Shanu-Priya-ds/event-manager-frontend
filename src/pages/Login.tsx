import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const auth = useAuth();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await auth.login(formData);
            console.log("Login Success..Redirecting to home page");
            navigate("/home");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
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