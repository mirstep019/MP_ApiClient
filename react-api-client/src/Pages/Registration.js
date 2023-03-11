import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Register()  {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        trainerName: '',
        email: '',
        password: ''
      })
      const [error, setError] = useState({
        trainerName: '',
        email: '',
        password: ''
      })
    
      function handleChange(e) {
          const newdata = {...data}
          newdata[e.target.id] = e.target.value
          setData(newdata);
          console.log(newdata);
      }
      
      function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        if (!data.trainerName || !data.email || !data.password) {
            setError({
                trainerName: !data.trainerName ? 'This field is required': '',
                email: !data.email ? 'This field is required' : '',
                password: !data.password ? 'This field is required' : ''
            });
            setIsLoading(false);
        } else {
            axios.post('https://xn--treninkovdenkapi-ksb8z.azurewebsites.net/api/Trainer', {trainerName: data.trainerName , email: data.email, password: data.password}).then(response => {
                console.log(response.data);
                setError({
                    trainerName: '',
                    email: '',
                    password: ''
                });
                setData({
                    trainerName: '',
                    email: '',
                    password: ''
                });
                navigate("/")
                setIsLoading(false);
            }).catch(error => {
                console.log(error);
                setIsLoading(false);
            });
        }
      }
    
    
      return (
      <div className='formule main'>
        <h1>Registration</h1>
        <form onSubmit={(e) => handleSubmit(e)} className='form-post'>
        <div className='inputbar'>
              <label className='form-label'>Trainer Name:</label>
              {error.trainerName && <span style={{color: 'red'}}>{error.trainerName}</span>}
              <input className='inputbar__input' type="text" name="trainerName" id="trainerName" value={data.trainerName} onChange={(e) =>handleChange(e)} />
          </div>
          <div className='inputbar'>
              <label className='form-label'>Email:</label>
              {error.email && <span style={{color: 'red'}}>{error.email}</span>}
              <input className='inputbar__input' type="text" name="email" id="email" value={data.email} onChange={(e) =>handleChange(e)} />
          </div>
          <div className='inputbar'>
              <label className='form-label'>Password:</label>
              {error.password && <span style={{color: 'red'}}>{error.password}</span>}
              <input className='inputbar__input' type="password" name="password" id='password' value={data.password} onChange={(e) =>handleChange(e)} />
          </div>
          <button className='add-btn' type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
    )
}

