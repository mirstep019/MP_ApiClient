import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../Providers/AppProvider';

function ExeInTrainPostMethod() {
  const [trainData, setTrainData] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState('');
  const [exeData, setExeData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');

  const [store] = useContext(Context);

  useEffect(() => {
    axios.get(`https://xn--treninkovdenkapi-ksb8z.azurewebsites.net/api/Trainers/${store.trainer.trainerId}/Users/Trainings`)
      .then(response => {
        setTrainData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [store.trainer.trainerId]);

  useEffect(() => {
    axios.get(`https://xn--treninkovdenkapi-ksb8z.azurewebsites.net/api/Trainers/${store.trainer.trainerId}/Exercises`)
      .then(response => {
        setExeData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [store.trainer.trainerId]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedTraining || !selectedExercise) {
      alert("Please select a training and an exercise");
      return;}
      axios.post('https://xn--treninkovdenkapi-ksb8z.azurewebsites.net/api/NewExerciseInTraining?trainingId=' + selectedTraining + '&exerciseId=' + selectedExercise)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  return (
    <div>
      <form className='form-post' onSubmit={handleSubmit}>
        <div className='inputbar'>
          <label>Select Training:</label>
          <select className='inputbar__select' value={selectedTraining} onChange={e => setSelectedTraining(e.target.value)}>
          {trainData.map(item => (
            <option className='inputbar__select' key={item.trainId} value={item.trainId}>Id: {item.trainId}, {item.trainName}, UserId: {item.userId}</option>
          ))}
          </select>
        </div>
        <div className='inputbar'>
          <label>Select Exercise:</label>
          <select className='inputbar__select' value={selectedExercise} onChange={e => setSelectedExercise(e.target.value)}>
          {exeData.map(item => (
            <option className='inputbar__select' key={item.exeId} value={item.exeId}>{item.exeName}</option>
          ))}
          </select>
        </div>
        <button className='add-btn-long' type="submit">Add Exercise to the Training</button>
      </form>
    </div>
  )
}

export default ExeInTrainPostMethod

