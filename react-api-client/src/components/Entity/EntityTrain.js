import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



export default function EditTraining() {
    const { trainId } = useParams(); // get the training ID from the URL parameter
    const navigate = useNavigate();
    const [trainName, setTrainName] = useState('');
    const [formattedDate, setFormattedDate] = useState(new Date("dd MMMM YYYY")); // initialize formattedDate to null
    const [isTrainingFinished, setIsTrainingFinished] = useState(false); // initialize isTrainingFinished to false
    const [userId, setUserId] = useState('');
  
    useEffect(() => {
      axios
        .get(`https://localhost:7271/api/Training/${trainId}`)
        .then((response) => {
          setTrainName(response.data.trainName);
          setFormattedDate(response.data.formattedDate); // convert the formatted date string to a Date object
          setIsTrainingFinished(response.data.isTrainingFinished);
          setUserId(response.data.userId); // set the user ID from the response data
        })
        .catch((error) => {
          console.log(error);
        });
    }, [trainId]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios
        .put(`https://localhost:7271/api/Training/${trainId}`, {
          userId: userId, // pass the userId state variable to the API call
          trainName: trainName,
          formattedDate: formattedDate, // convert the Date object to an ISO string
          isTrainingFinished: isTrainingFinished
        })
        .then(() => {
          navigate(`/trainings`);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    function handleChange(date) {
        setFormattedDate(date);
    }
    console.log(formattedDate)
  
    return (
      <div className="container">
        <NavLink className="back-btn" to="/trainings">{"< Back"}</NavLink>
        <h1 className="center">Edit Training</h1>
        <form onSubmit={handleSubmit} className="form-post">
          <div className='inputbar'>
            <label className='form-label'>User Id:</label>
            <input className='inputbar__input' type="text" name="userId" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
          </div>
          <div className='inputbar'>
            <label className='form-label'>Training Name:</label>
            <input className='inputbar__input' type="text" name="trainName" id="trainName" value={trainName} onChange={(e) => setTrainName(e.target.value)} />
          </div>
          <div className='inputbar'>
            <label className='form-label'>Date:</label>
            <DatePicker
                value={formattedDate}
                onChange={handleChange}
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
              checked={isTrainingFinished}
              onChange={(e) => setIsTrainingFinished(e.target.checked)} // update the isTrainingFinished state variable when the user checks/unchecks the checkbox
              id='isTrainingFinished'
            />
          </div>
          <button type="submit" className="add-btn-long">Save Changes</button>
        </form>
      </div>
    );
}
