import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import  Auth  from '../feature/Auth/authSlice'

const Store = configureStore( {
  reducer:{
     Signup:Auth
  }
})

export default Store
