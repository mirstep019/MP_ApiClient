import React, { useContext } from 'react';
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
        {store.trainer.token ? (<> <h1>Hello {store.trainer.trainerName} &nbsp; </h1></>): (<h1>Training Diary Coach </h1>) }
          {store.trainer.token ? (<p>Your id: {store.trainer.trainerId}</p>): (null)}
      </NavLink>
      <NavMenu>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to={`/Trainers/${store.trainer.trainerId}/Exercises`} className={({ isActive }) => (isActive ? 'active' : '')}>
          Exercises
        </NavLink>
        <NavLink to={`Trainers/${store.trainer.trainerId}/Trainings`} className={({ isActive }) => (isActive ? 'active' : '')}>
          Trainings
        </NavLink>
        <NavLink to={`Trainers/${store.trainer.trainerId}/Users`} className={({ isActive }) => (isActive ? 'active' : '')}>
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
