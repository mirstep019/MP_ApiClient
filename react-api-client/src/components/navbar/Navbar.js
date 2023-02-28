import React from 'react'
import { Nav, NavBtnLink, NavBtn, NavMenu, NavLink} from './NavbarElements'
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
  }

  return (
    <>
      <Nav>
          <NavLink to="/">
           <h1>Training Diary Coach</h1>
          </NavLink>
          <NavMenu>
              <NavLink to="/" className={({ isActive }) => isActive?'active' : ''}>Home</NavLink>
              <NavLink to="/exercises" className={({ isActive }) => isActive?'active' : ''}>Exercises</NavLink>
              <NavLink to="/trainings" className={({ isActive }) => isActive?'active' : ''}>My Trainings</NavLink>
              <NavLink to="/users" className={({ isActive }) => isActive?'active' : ''}>My Users</NavLink>
              <NavBtn> 
                <NavBtnLink to="/adding">+</NavBtnLink>
              </NavBtn>
              {!isAuthenticated && <NavBtn> 
                <NavBtnLink to="/register">Registration</NavBtnLink>
              </NavBtn>}
              {!isAuthenticated && <NavBtn> 
                <NavBtnLink to="/login">Login</NavBtnLink>
              </NavBtn>}
              {isAuthenticated && <NavBtn onClick={handleLogout}> 
                <NavBtnLink to="/">Logout</NavBtnLink>
              </NavBtn>}
          </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar;
