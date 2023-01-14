import React from 'react'
import TrainingPostMethod from '../components/forms/TrainingPost'
import UserPostMethod from '../components/forms/UserPost'
import DatePicker from 'react-datepicker'
import ExercisePost from '../components/forms/ExercisePost'

function Add() {
  return (
    <div className='main'>
      <UserPostMethod/>
      <TrainingPostMethod/>
      <ExercisePost/>
    </div>
  )
}

export default Add
