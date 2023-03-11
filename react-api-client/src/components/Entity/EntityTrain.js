import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Context } from "../Providers/AppProvider";

export default function EditTraining() {

  const { trainId, userId } = useParams();
  
  const navigate = useNavigate();
  const [store] = useContext(Context);

  const [data, setData] = useState({
    userId: '',
    trainName: '',
    isTrainingFinished: false
  });

  useEffect(() => {
    //console.log(store.userIds)
    axios
      .get(`https://xn--treninkovdenkapi-ksb8z.azurewebsites.net/api/Trainers/${store.trainer.trainerId}/Users/${userId}/Trainings/${trainId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [store.trainer.trainerId, trainId, userId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`https://xn--treninkovdenkapi-ksb8z.azurewebsites.net/api/Trainers/${store.trainer.trainerId}/Users/${userId}/Trainings/${trainId}`, data)
      .then(() => {
        navigate(`/Trainers/${store.trainer.trainerId}/Trainings`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="formule main">
      <NavLink className="back-btn" to={`/Trainers/${store.trainer.trainerId}/Trainings`}>{"< Back"}</NavLink>
      <h1 className="center">Edit Training</h1>
      <form onSubmit={handleSubmit} className="form-post">
        <div className='inputbar'>
          <label className='form-label'>User Id:</label>
          <input className='inputbar__input' type="text" name="userId" id="userId" value={data.userId} onChange={(e) => setData({...data, userId: e.target.value})} readOnly />
        </div>
        <div className='inputbar'>
          <label className='form-label'>Training Name:</label>
          <input className='inputbar__input' type="text" name="trainName" id="trainName" value={data.trainName} onChange={(e) => setData({...data, trainName: e.target.value})} />
        </div>
        <div className='inputbar'>
          <label className='form-label'>Date:</label>
          <DatePicker
            //value={data.formattedDate}
            disabled={true}
            className='inputbar__input'
            id='formattedDate'
          />
        </div>
        <div className='finished'>
          <h2>Finished Training</h2>
          <input
            type="checkbox"
            checked={data.isTrainingFinished}
            onChange={(e) => setData({...data, isTrainingFinished: e.target.checked})}
            id='isTrainingFinished'
          />
        </div>
        <button type="submit" className="add-btn-long">Save Changes</button>
      </form>
    </div>
  );
}
