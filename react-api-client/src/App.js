import './App.css';
import React, { useContext } from 'react';
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
import EditUser from './components/Entity/EntityUser';
import { Context } from './components/Providers/AppProvider';




function App() {
  const [store] = useContext(Context);


  return (
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<PrivateRoutes/>}>
          <Route path="/" element={<Home/>} />
          <Route path={`/Trainers/${store.trainer.trainerId}/Exercises`} element={<Exercises/>} />
          <Route path={`/Trainers/${store.trainer.trainerId}/Trainings`} element={<Trainings/>} />
          <Route path={`/Trainers/${store.trainer.trainerId}/Users`} element={<Users/>} />
          <Route path="/Add" element={<Add/>} /> 
          <Route path={`/Trainers/${store.trainer.trainerId}/Exercises/:exeId`} element={<EditExercise/>}/>
          <Route path={`/Trainers/${store.trainer.trainerId}/Users/:userId/Trainings/:trainId`} element={<EditTraining/>} />
          <Route path={`/Trainers/${store.trainer.trainerId}/Users/:userId`} element={<EditUser/>} />
        </Route>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        
      </Routes>
    </div>
  );
}





export default App;




