import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function TrainingPostMethod() {

    const [data, setData] = useState({
        userId: '',
        trainName: '',
        formattedDate: '',
        isTrainingFinished: false
    });
    const [error, setError] = useState({
        userId: '',
        trainName: '',
        formattedDate: ''
    });

    function handleChange(e) {
        const newdata = {...data}
        if(e.target.id === 'isTrainingFinished'){
            newdata[e.target.id] = e.target.checked;
        } else {
            newdata[e.target.id] = e.target.value
        }
        setData(newdata);
        console.log(newdata);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!data.userId || !data.trainName || !data.formattedDate) {
            setError({
                userId: !data.userId ? 'This field is required' : '',
                trainName: !data.trainName ? 'This field is required' : '',
                formattedDate: !data.formattedDate ? 'This field is required' : ''
            });
        } else {
            axios.post('https://localhost:7271/api/Training', 
                {userId: data.userId,
                trainName: data.trainName, 
                formattedDate: data.formattedDate,
                isTrainingFinished: data.isTrainingFinished}).then(response => {
            console.log(response.data);
                setError({
                    userId: '',
                    trainName: '',
                    formattedDate: ''
                });
                setData({
                    userId: '',
                    trainName: '',
                    formattedDate: '',
                    isTrainingFinished: false
                });
            });
        }
    }

    return (

        <div className='formule'>
            
            <h1>New Training</h1>
            <form onSubmit={(e) => handleSubmit(e)} className='form-post'>
                <div className='inputbar'>
                    <label className='form-label'>User Id:</label>
                    <input className='inputbar__input' type="text" name="UserId" id="userId" value={data.userId} onChange={(e) =>handleChange(e)} />
                </div>
                <div className='inputbar'>
                    <label className='form-label'>Training Name:</label>
                    {error.trainName && <span style={{color: 'red'}}>{error.trainName}</span>}
                    <input className='inputbar__input' type="text" name="trainName" id="trainName" value={data.trainName} onChange={(e) =>handleChange(e)} />
                </div>
                <div className='inputbar'>
                    <label className='form-label'>Date:</label>
                    {error.formattedDate && <span style={{color: 'red'}}>{error.formattedDate}</span>}
                    <DatePicker
                        selected={data.formattedDate}
                        onChange={date => handleChange({ target: { id: 'formattedDate', value: date } })}
                        className='inputbar__input'
                        dateFormat="dd MMMM yyyy"
                        placeholderText='Select the date'
                        id='formattedDate'
                    />
                </div>
                <div className='finished'>
                    <h2>Finished Training</h2>
                    <input
                        type="checkbox"
                        checked={data.isTrainingFinished}
                        onChange={handleChange}
                        id='isTrainingFinished'
                    />
                </div>
                <button className='add-btn'>Add</button>
            </form>
        </div>
    )
    
    
}
export default TrainingPostMethod