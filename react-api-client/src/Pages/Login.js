import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../components/Providers/AppProvider";

export default function Login() {
    const[store, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState({
        email: '',
        password: '',
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
                    // console.log(response.data);
                    // localStorage.setItem("token", response.data.value);
                    // dispatch({type: "SETTOKEN", payload: response.data.value});
                    dispatch({type: "SETTRAINER", payload: response.data})
                    dispatch({type: "SETUSER", payload: response.data.userIds})
                
                    setError({
                        email: '',
                        password: ''
                    });
                    setData({
                        email: '',
                        password: '',
                    });
                    navigate(`/home`);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                });
                //window.location.reload();
                
        }
        console.log(store.userIds);
        console.log(store.trainer);
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