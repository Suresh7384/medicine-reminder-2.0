import React, { useState } from 'react'
import { registerUser } from '../api/authApi'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await registerUser({ name, email, password, phone })
            alert('Registered successfully')
            navigate('/dashboard')
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed')
        }
    }

    return (
        <div className="auth-container">
            <h2>Register</h2>

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

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

                <input
                    type="text"
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>

            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    )
}

export default Register