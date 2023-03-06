import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Providers/AppProvider";

export default function EditUser() {
  const { userId } = useParams();  
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const [store] = useContext(Context);

  

  console.log(userId)
  useEffect(() => {
    axios
      .get(`https://localhost:7271/api/Trainers/${store.trainer.trainerId}/Users/${userId}`)
      .then((response) => {
        console.log(response)
        setUserName(response.data.userName)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId, store.trainer.trainerId]);

  // update the exercise data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form...', { userName });
  
    axios.put(`https://localhost:7271/api/Trainers/${store.trainer.trainerId}/Users/${userId}`, {
      userName: userName,
    })
      .then(() => {
        navigate(`/Trainers/${store.trainer.trainerId}/Users`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (      
    <div className="formule main">
      <NavLink className="back-btn" to={`/Trainers/${store.trainer.trainerId}/Users`}>{"< Back"}</NavLink>
      <h1 className="center">Edit User</h1>
      <form onSubmit={handleSubmit} className="form-post">
        <div className="inputbar">
          <label className="form-label" htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            className="inputbar__input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button type="submit" className="add-btn-long">Save Changes</button>
      </form>
    </div>
  );
}
