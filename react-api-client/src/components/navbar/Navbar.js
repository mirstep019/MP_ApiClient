import React, { useContext } from 'react';
import { Context } from '../Providers/AppProvider';
import { Nav, NavBtnLink, NavBtn, NavMenu, NavLink, Bars } from './NavbarElements';
import { useState } from 'react';

const Navbar = () => {
  const [store, dispatch] = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    dispatch({ type: 'CLEAR' });
  };

  return (
    <Nav>
      <Bars onClick={toggleMenu} />
      <NavLink to="/home">
        {store.trainer.token ? (
          <>
            <h1>{store.trainer.trainerName} &nbsp;</h1>
          </>
        ) : (
          <svg width="55" height="55" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="155" height="155" rx="33" fill="white" stroke="#5C16C4" stroke-width="10"/>
            <path d="M44.7955 52.1364V35.9091H121.25V52.1364H92.75V129H73.2955V52.1364H44.7955Z" fill="#5C16C4"/>
            <path d="M36 68.5284L36 35.5284L129.091 35.5284V68.8011C129.091 78.1648 127.227 86.2254 123.5 92.983C119.803 99.7405 114.485 104.938 107.545 108.574C100.606 112.241 92.303 114.074 82.6364 114.074C72.9394 114.074 64.6061 112.241 57.6364 108.574C50.6667 104.938 45.3182 99.7102 41.5909 92.892C37.8636 86.1042 36 77.983 36 68.5284ZM52.8636 55.2102L52.8636 67.7102C52.8636 73.5284 53.8939 78.4223 55.9545 82.392C58.0455 86.392 61.2727 89.392 65.6364 91.392C70.0303 93.4223 75.697 94.4375 82.6364 94.4375C89.5152 94.4375 95.1364 93.4223 99.5 91.392C103.864 89.392 107.076 86.4072 109.136 82.4375C111.197 78.4678 112.227 73.5739 112.227 67.7557V55.2102L52.8636 55.2102Z" fill="#5C16C4"/>
          </svg>
        )}
        {store.trainer.token ? <p>Your id: {store.trainer.trainerId}</p> : null}
      </NavLink>
      <NavMenu isMenuOpen={isMenuOpen}>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to={`/Trainers/${store.trainer.trainerId}/Exercises`}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Exercises
        </NavLink>
        <NavLink
          to={`Trainers/${store.trainer.trainerId}/Trainings`}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Trainings
        </NavLink>
        <NavLink
          to={`Trainers/${store.trainer.trainerId}/Users`}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Users
        </NavLink>
        <NavBtn>
          <NavBtnLink to="/Add">+</NavBtnLink>
        </NavBtn>
        {!store.trainer.token ? (
          <>
            <NavBtn>
              <NavBtnLink to="/Register">Registration</NavBtnLink>
            </NavBtn>
            <NavBtn>
              <NavBtnLink to="/Login">Login</NavBtnLink>
            </NavBtn>
          </>
        ) : (
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

export default Navbar;