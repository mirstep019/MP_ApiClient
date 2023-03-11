import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Providers/AppProvider";

export default function EditExercise() {
  const { exeId } = useParams(); // get the exercise ID from the URL parameter
  const navigate = useNavigate();
  const [exeName, setExeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [store] = useContext(Context);

  

  useEffect(() => {
    axios
      .get(`https://xn--treninkovdenkapi-ksb8z.azurewebsites.net/api/Trainers/${store.trainer.trainerId}/Exercises/${exeId}`)
      .then((response) => {
        // console.log(response.data)
        setExeName(response.data.exeName)
        setInstructions(response.data.instructions)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [exeId, store.trainer.trainerId]);

  // update the exercise data
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`https://xn--treninkovdenkapi-ksb8z.azurewebsites.net/api/Trainers/${store.trainer.trainerId}/Exercises/${exeId}`, {
        exeName: exeName,
        instructions: instructions,
      })
      .then(() => {
        navigate(`/Trainers/${store.trainer.trainerId}/Exercises`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (      
    <div className="formule main">
      <NavLink className="back-btn" to={`/Trainers/${store.trainer.trainerId}/Exercises`}>{"< Back"}</NavLink>
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
