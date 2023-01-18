import React, { useState } from 'react';
import axios from 'axios';

function ExercisePost() {
    const [data, setData] = useState({
        exeName: '',
        instructions: ''
    });
    const [error, setError] = useState({
        exeName: '',
        instructions: ''
    });

    function handleChange(e) {
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!data.exeName || !data.instructions) {
            setError({
                exeName: !data.exeName ? 'This field is required' : '',
                instructions: !data.instructions ? 'This field is required' : ''
            });
        } else {
            axios.post('https://localhost:7271/api/Exercise', {exeName: data.exeName, instructions: data.instructions}).then(response => {
                console.log(response.data);
                setError({
                    exeName: '',
                    instructions: ''
                });
                setData({
                    exeName: '',
                    instructions: ''
                });
            });
        }
    }
    return (
        <div className='form-container'>
            <h1>New Exercise</h1>
            <form onSubmit={handleSubmit} className='form-post'>
                <div className='inputbar'>
                    <label className='form-label'>Exercise Name:</label>
                    {error.exeName && <span style={{color: 'red'}}>{error.exeName}</span>}
                    <input className='inputbar__input' type="text" name="exeName" id="exeName" value={data.exeName} onChange={handleChange} />
                </div>
                <div className='inputbar'>
                    <label className='form-label'>Instructions:</label>
                    {error.instructions && <span style={{color: 'red'}}>{error.instructions}</span>}
                    <textarea className='inputbar__input' name="instructions" id="instructions" value={data.instructions} onChange={handleChange} />
                </div>
                <button className='add-btn'>Add</button>
            </form>
        </div>
    );
}
export default ExercisePost    