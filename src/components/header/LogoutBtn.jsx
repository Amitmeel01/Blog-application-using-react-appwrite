import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'


export default function  () {
  const navigate=useNavigate()
    const dispatch=useDispatch()
    const logOutHandler=()=>{
        authService.logout()
        .then(()=>{
            // action hai yeh 
            dispatch(logout())
            navigate('/')

        })
        .catch()
    }
  return (
    <button
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logOutHandler}
    >Log Out</button>
  )
}
