import React, { createElement } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import LogIn from './components/pages/LogIn.jsx'
import Signup from './components/pages/Signup.jsx'
import AllPosts from './components/pages/AllPosts.jsx'
import AddPost from './components/pages/AddPost.jsx'
import EditPost from './components/pages/EditPost.jsx'
import Post from './components/pages/Post.jsx'


const router=createBrowserRouter(
   createRoutesFromElements(
      <Route  path='/' element={<App/>} >
            <Route path='' element={<Home/>}/>
            <Route path='/login' element={(
               <AuthLayout authentication={false}>
                  <LogIn/>
               </AuthLayout>
            )}/>

           <Route path='/signup' element={(
               <AuthLayout authentication={false}>
                  <Signup/>
               </AuthLayout>
            )}/>

<Route path='/all-posts' element={(
               <AuthLayout authentication={""}>
                  <AllPosts/>
               </AuthLayout>
            )}/>


<Route path='/add-post' element={(
               <AuthLayout authentication={""}>
                  <AddPost/>
               </AuthLayout>
            )}/>

<Route path='/edit-post/:slug' element={(
               <AuthLayout authentication={""}>
                  <EditPost/>
               </AuthLayout>
            )}/>

            <Route path='post/:slug' element={<Post/>}/>

      </Route>
  
   )
)

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
    <RouterProvider router={router}/>
   </Provider>
 
)
