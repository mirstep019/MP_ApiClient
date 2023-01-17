import './App.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './Pages/Home';
import Trainings from './Pages/Trainings';
import Exercises from './Pages/Exercises';
import Add from './Pages/Add';
import Users from './Pages/Users';

function App() {
  return (
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/exercises' element={<Exercises/>}/>
        <Route path='/trainings' element={<Trainings/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/adding' element={<Add/>}/>
      </Routes>



    </div>
  );
}




export default App;




