import React, { useContext } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Context } from '../Providers/AppProvider';

function UserPostMethod() {

    const [store] = useContext(Context);
    
    const [data, setData] = useState({
      trainerId: store.trainer.trainerId,
      userName: '',
      password: ''
    })
    const [error, setError] = useState({
      userName: '',
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
      if (!data.userName || !data.password) {
          setError({
              userName: !data.userName ? 'This field is required' : '',
              password: !data.password ? 'This field is required' : ''
          });
      } else {
          axios.post('https://localhost:7271/api/User', {trainerId: data.trainerId ,userName: data.userName, password: data.password}).then(response => {
              console.log(response.data);
              setError({
                trainerId: '',
                  userName: '',
                  password: ''
              });
              setData({
                trainerId: store.trainer.trainerId,
                userName: '',
                password: ''
              });
          });
      }
    }
  
  
    return (
    <div className='formule'>
      <h1>New User</h1>
      <form onSubmit={(e) => handleSubmit(e)} className='form-post'>
      <div className='inputbar'>
            <label className='form-label'>Your Id:</label>
            <input className='inputbar__input' type="text" name="trainerId" id="trainerId" value={data.trainerId} disabled />
        </div>
        <div className='inputbar'>
            <label className='form-label'>User Name:</label>
            {error.userName && <span style={{color: 'red'}}>{error.userName}</span>}
            <input className='inputbar__input' type="text" name="UserName" id="userName" value={data.userName} onChange={(e) =>handleChange(e)} />
        </div>
        <div className='inputbar'>
            <label className='form-label'>Password:</label>
            {error.password && <span style={{color: 'red'}}>{error.password}</span>}
            <input className='inputbar__input' type="text" name="Password" id='password' value={data.password} onChange={(e) =>handleChange(e)} />
        </div>
        <button className='add-btn'>Add</button>
      </form>
    </div>
    
  )
}

export default UserPostMethod
