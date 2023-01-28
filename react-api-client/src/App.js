import './App.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './Pages/Home';
import Trainings from './Pages/Trainings';
import Exercises from './Pages/Exercises';
import Add from './Pages/Add';
import Users from './Pages/Users';
import Register from './Pages/Registration';
import Login from './Pages/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route 
          path='/'
          element={
          <PrivateRoute>
            <Home /> 
          </PrivateRoute>
          }
        />
        <Route 
          path='/exercises' 
          element={
          <PrivateRoute>
            <Exercises /> 
          </PrivateRoute>
          }
        />
        <Route 
          path='/trainings' 
          element={
          <PrivateRoute>
            <Trainings /> 
          </PrivateRoute>
          }
        />
        <Route 
          path='/users' 
          element={
          <PrivateRoute>
            <Users /> 
          </PrivateRoute>
          }
        />
        <Route 
          path='/adding' 
          element={
          <PrivateRoute>
            <Add /> 
          </PrivateRoute>
          }
        />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
  
}




export default App;




