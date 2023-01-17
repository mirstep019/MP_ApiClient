import React from 'react'
import TrainingPostMethod from '../components/forms/TrainingPost'
import UserPostMethod from '../components/forms/UserPost'
import ExercisePost from '../components/forms/ExercisePost'
import ExeInTrainPostMethod from '../components/forms/ExeInTrainPost'

function Add() {
  return (
    <div className='main'>
      <UserPostMethod/>
      <TrainingPostMethod/>
      <ExeInTrainPostMethod/>
      <ExercisePost/>
    </div>
  )
}

export default Add
