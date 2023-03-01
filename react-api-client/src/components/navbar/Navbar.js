import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Providers/AppProvider';
import { Nav, NavBtnLink, NavBtn, NavMenu, NavLink } from './NavbarElements';
export default function Navbar() {
  // const [token, setToken] = useState(localStorage.getItem("token"));
  const [store, dispatch] = useContext(Context);
  // window.addEventListener("storage",(e) => {
  //   setToken(localStorage.getItem("token"));
  // });

  // useEffect(() => {
  //   const hu = localStorage.getItem("token"); 
  //   hu ? setToken(hu) : setToken(undefined)
  // }, [store.token]);

  const logout = () => {
    dispatch({type: "CLEAR"});
  };

  return (
    <Nav>
      <NavLink to="/">
        {store.trainer.token ? (<h1>Hello {store.trainer.trainerName}! </h1>): (<h1>Training Diary Coach </h1>) }
          {store.trainer.token ? (<p>Your id: {store.trainer.trainerId}</p>): (null)}
      </NavLink>
      <NavMenu>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/exercises" className={({ isActive }) => (isActive ? 'active' : '')}>
          Exercises
        </NavLink>
        <NavLink to="/trainings" className={({ isActive }) => (isActive ? 'active' : '')}>
          My Trainings
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
          My Users
        </NavLink>
        <NavBtn>
          <NavBtnLink to="/adding">+</NavBtnLink>
        </NavBtn>
        {!store.trainer.token ? (
          <>
            <NavBtn>
              <NavBtnLink to="/register">Registration</NavBtnLink>
            </NavBtn>
            <NavBtn>
              <NavBtnLink to="/login">Login</NavBtnLink>
            </NavBtn>
          </>
        ): (
          <>
            <NavBtn onClick={logout}>
              <NavBtnLink to="/">Logout</NavBtnLink>
            </NavBtn>
          </>
        )}
      </NavMenu>
    </Nav>
  );
};
