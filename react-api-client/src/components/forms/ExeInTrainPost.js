import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExeInTrainPostMethod() {
  const [trainData, setTrainData] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState('');
  const [exeData, setExeData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');

  useEffect(() => {
    axios.get('https://localhost:7271/api/Training')
      .then(response => {
        setTrainData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://localhost:7271/api/Exercise')
      .then(response => {
        setExeData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedTraining || !selectedExercise) {
      alert("Please select a training and an exercise");
      return;}
      axios.post('https://localhost:7271/api/NewExerciseInTraining?trainingId=' + selectedTraining + '&exerciseId=' + selectedExercise)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Select Training:</label>
        <select value={selectedTraining} onChange={e => setSelectedTraining(e.target.value)}>
          {trainData.map(item => (
            <option key={item.trainId} value={item.trainId}>{item.trainName}</option>
          ))}
        </select>
        <label>Select Exercise:</label>
        <select value={selectedExercise} onChange={e => setSelectedExercise(e.target.value)}>
          {exeData.map(item => (
            <option key={item.exeId} value={item.exeId}>{item.exeName}</option>
          ))}
        </select>
        <button type="submit">Assign Exercise</button>
      </form>
    </div>
  )
}

export default ExeInTrainPostMethod

