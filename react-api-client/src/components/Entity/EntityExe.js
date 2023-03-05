import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
        // console.log(response.data)
        setExeName(response.data.exeName)
        setInstructions(response.data.instructions)
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
    <div className="formule container">
      <NavLink className="back-btn" to="/exercises">{"< Back"}</NavLink>
      <h1 className="center">Edit Exercise</h1>
      <form onSubmit={handleSubmit} className="form-post">
        <div className="inputbar">
          <label className="form-label" htmlFor="exeName">Exercise Name:</label>
          <input
            type="text"
            id="exeName"
            className="inputbar__input"
            value={exeName}
            onChange={(e) => setExeName(e.target.value)}
          />
        </div>
        <div className="inputbar">
          <label className="form-label" htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            className="inputbar__input"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <button type="submit" className="add-btn-long">Save Changes</button>
      </form>
    </div>
  );
}
