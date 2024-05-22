import React, { useEffect, useState } from 'react'
import {Provider, useDispatch} from 'react-redux' 
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom';



// dispatch using for actions in reducer 
// redux ko react ke saath use ke liye dispatch use hota hai

export default function App() {

  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();
  

  useEffect(()=>{
     authService.getCurrentAccount()
     .then((userData)=>{
      if(userData){
        dispatch(login({userData}));
      }else{
        // agar data nhi mila toh hum logout kra dete h jisse state update ho jae
        dispatch(logout());
      }
     })
     .catch((err)=>console.log(err))
     .finally(()=>setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/> 
        </main>
        <Footer className='mt-20'/>
      </div>
    </div> 
  ): null


 
}
