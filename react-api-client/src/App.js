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
import EditTraining from './components/Entity/EntityTrain';


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
          <Route path='/exercise/:exeId' element={<EditExercise/>}/>
          <Route path='/training/:trainId' element={<EditTraining/>} />
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        
      </Routes>
    </div>
  );
}





export default App;




