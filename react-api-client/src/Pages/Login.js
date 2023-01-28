import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Login() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [data, setData] = useState({
      email: '',
      password: '',
    });
  
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
          email: !data.email ? "This field is required" : "",
          password: !data.password ? "This field is required" : "",
        });
        setIsLoading(false);
      } 
      else 
      {
        axios.get('https://localhost:7271/login?email='+ data.email + '&password='+ data.password)
          .then((response) => {
            console.log(response.data);
            setError({
                email: '',
                password: '',
            });
            setData({
                email: '',
                password: '',
            });
            navigate("/");
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      }
    }
    return (
        <div className='formule main'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className='form-post'>
            <div className='inputbar'>
              <label className='form-label'>Email:</label>
              <input className='inputbar__input' type="email" name="email" id="email" value={data.email} onChange={(e) => handleChange(e)}/>
            </div>
            <div className='inputbar'>
              <label className='form-label'>Password:</label>
              <input className='inputbar__input' type="password" name="password" id='password'value={data.password} onChange={(e) => handleChange(e)} />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button type="submit" className='add-btn' disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      );
}
