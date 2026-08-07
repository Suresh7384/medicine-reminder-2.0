import React, { useState } from 'react'
import { loginUser } from '../api/authApi'
import { useNavigate, Link } from 'react-router-dom'
import { registerPushNotifications } from "../services/pushNotificationService";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { data } = await loginUser({ email, password })

           localStorage.setItem("token", data.token);

            await registerPushNotifications(data.token);

            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed')
        }
    }

    return (
        <div className="auth-container">
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>

            <p>
                New user? <Link to="/register">Register</Link>
            </p>
        </div>
    )
}

export default Login