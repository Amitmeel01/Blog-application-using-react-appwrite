import React,{useState,useEffect} from 'react'
import appwriteService from '../../appwrite/database'
import PostCard from'../PostCard'
import Container from '../container/Container'

function AllPosts() {

    const [posts,setPosts] =useState([])

    useEffect(()=>{},[])

    appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8  '>
        <Container>
            <div className='flex flex-wrap -mx-2'>
            {posts.map((item)=>(
                <div key={item.$id} className='p-2 w-full sm:w-1/2 lg:w-1/4 xs:w-1 mt-4 '>
                    
                    <PostCard {...item}/>

                </div>
            ))}

            </div>
            
        </Container>
    </div>
  )
}

export default AllPosts