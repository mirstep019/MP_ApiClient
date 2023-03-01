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
import EditExercise from './components/Entity/EntityExe';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
function App() {
  return (
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<PrivateRoutes/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/exercises" element={<Exercises/>} />
          <Route path="/trainings" element={<Trainings/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/adding" element={<Add/>} />
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/exercise/:exeId' element={<EditExercise/>}/>
      </Routes>
    </div>
  );
}





export default App;




