import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>
            <h2>Medicine Reminder</h2>

            <nav>
                <Link to="/dashboard">Dashboard</Link>

                <button onClick={logout}>
                    Logout
                </button>
            </nav>
        </div>
    )
}

export default Navbar