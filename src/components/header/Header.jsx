import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../container/Container'
import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
// yeh authslice ke under hai
   const authStatus=useSelector((state)=>state.auth.status
)

        const navigate=useNavigate()

           // array mai objects
           // pages ko rediirect karne mai
           const navItems=[
            // {
            //     name:'Home',
            //     slug:'/',
            //     active:true

            // },

            {
                name:'Login',
                slug:'/login',
                active:!authStatus

            },

            // {
            //     name:'Home',
            //     slug:'/',
            //     active:true

            // },

            {
                name:'SignUp',
                slug:'/signup',
                active:!authStatus

            },
            {
                name:'All Posts',
                slug:'/all-posts',
                active:authStatus

            },
            {
                name:'Add Post',
                slug:'/add-post',
                active:authStatus

            },


          ]

  return (
    <header
    className='py-3 shadow bg-grey-500'
    >
      <Container>
        <nav className='flex'>
          <div
          className='mr-4 w-20 h-20  py-2'
          >
            <Link to='/'>
              <Logo/>
            
            </Link>
          </div>
             
             <ul className='flex ml-auto py-3 text-lg'>
              {navItems.map((item)=>
              item.active ? (
                <li key={item.name}>
                  <button onClick={()=>navigate(item.slug)}
                  className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>
              ):null
              )}

              {authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )}

             </ul>


        </nav>
      </Container>
    </header>
  )
}

export default Header