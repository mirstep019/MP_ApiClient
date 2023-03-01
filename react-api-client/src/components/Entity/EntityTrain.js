import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditExercise() {
  const { exeId } = useParams(); // get the exercise ID from the URL parameter
  const navigate = useNavigate();
  const [exeName, setExeName] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    axios
      .get(`https://localhost:7271/api/Exercise/${exeId}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [exeId]);

  // update the exercise data
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`https://localhost:7271/api/Exercise/${exeId}`, {
        exeName: exeName,
        instructions: instructions,
      })
      .then(() => {
        navigate(`/exercises`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Edit Exercise</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="exeName">Exercise Name:</label>
          <input
            type="text"
            id="exeName"
            value={exeName}
            onChange={(e) => setExeName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
