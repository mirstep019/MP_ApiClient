import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    function handleChange(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        if (!data.email || !data.password) {
            setError({
                email: !data.email ? 'This field is required' : '',
                password: !data.password ? 'This field is required' : ''
            });
            setIsLoading(false);
        } else {
            axios.get('https://localhost:7271/login?email=' + data.email + '&password=' + data.password)
                .then((response) => {
                    console.log(response.data);
                    localStorage.setItem('jwt', response.data.jwt);
                    setError({
                        email: '',
                        password: ''
                    });
                    setData({
                        email: '',
                        password: '',
                    });
                    navigate("/exercises");
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                });
                //window.location.reload();
        }
    }
    return (
        <div className='formule main'>
            <h1>Login</h1>
            <form onSubmit={(e) => handleSubmit(e)} className='form-post'>
                <div className='inputbar'>
                    <label className='form-label'>Email:</label>
                    {error.email && <span style={{color: 'red'}}>{error.email}</span>}
                    <input className='inputbar__input' type="text" name="email" id="email" value={data.email} onChange={(e) => handleChange(e)} />
                </div>
                <div className='inputbar'>
                    <label className='form-label'>Password:</label>
                    {error.password && <span style={{color: 'red'}}>{error.password}</span>}
                    <input className='inputbar__input' type="password" name="password" id='password' value={data.password} onChange={(e) => handleChange(e)} />
                </div>
                <button className='add-btn' type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    )
}
