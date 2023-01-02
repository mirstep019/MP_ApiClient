import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Nav, Bars, NavBtnLink, NavBtn, NavMenu, NavLink} from './NavbarElements'

const Navbar = () => {

  return (
    <>
      <Nav>
          <NavLink to="/">
           <h1>Training Diary API </h1>
          </NavLink>
          <NavMenu>
              <NavLink to="/" className={({ isActive }) => isActive?'active' : ''}>Home</NavLink>
              <NavLink to="/exercises" className={({ isActive }) => isActive?'active' : ''}>Exercises</NavLink>
              <NavLink to="/trainings" className={({ isActive }) => isActive?'active' : ''}>Trainings</NavLink>
              <NavLink to="/users" className={({ isActive }) => isActive?'active' : ''}>Users</NavLink>
              <NavBtn> 
                <NavBtnLink to="/adding">Add</NavBtnLink>
              </NavBtn>
          </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar
