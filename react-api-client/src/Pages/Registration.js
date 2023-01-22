import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Register()  {
    const [registerData, setRegisterData] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function HandleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('https://localhost:7271/api/Trainer/Register', registerData);
            console.log(response)
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    }

    return (
        <form onSubmit={HandleSubmit}>
            <h1>Register</h1>
            {error && <p className="error">{error}</p>}
            <label>
                Name:
                <input type="text" name="name" onChange={handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" onChange={handleChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" onChange={handleChange} />
            </label>
            <br />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Register'}
            </button>
        </form>
    );
}

